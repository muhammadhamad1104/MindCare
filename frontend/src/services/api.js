import axios from 'axios';
import MockAdapter from 'axios-mock-adapter'; // Import axios-mock-adapter
import { getAuthToken } from '../utils/helpers'; // CORRECTED PATH

/**
 * Determines the base URL for the API based on the environment.
 * Uses environment variables for production and test, defaults to localhost for development.
 * @returns {string} The base URL for the API.
 */
const getBaseUrl = () => {
  // Access environment variables using import.meta.env for Vite
  const env = import.meta.env.VITE_APP_ENV || 'development';

  if (env === 'production' && import.meta.env.VITE_APP_API_BASE_URL_PROD) {
    return import.meta.env.VITE_APP_API_BASE_URL_PROD;
  }

  if (env === 'test' && import.meta.env.VITE_APP_API_BASE_URL_TEST) {
    return import.meta.env.VITE_APP_API_BASE_URL_TEST;
  }

  // Default to development localhost URL with '/api' suffix
  return import.meta.env.VITE_APP_API_BASE_URL_DEV || 'http://localhost:3000/api';
};

// Create an Axios instance
const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 15000, // Increased timeout for potential slower networks
  headers: {
    'Content-Type': 'application/json',
  },
});

// Initialize MockAdapter for development environment
let mock;
if (import.meta.env.VITE_APP_ENV === 'development' || import.meta.env.VITE_APP_ENV === 'test') {
  mock = new MockAdapter(api, { delayResponse: 500 }); // Simulate network delay
}

// --- Request Interceptor ---
// Adds Authorization token to outgoing requests (except for /auth endpoints)
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken(); // Retrieve authentication token
    // Only add token if it exists and the URL is not an authentication endpoint
    if (token && !config.url.includes('/auth')) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response Interceptor ---
// Handles successful responses and logs errors
api.interceptors.response.use(
  (response) => {
    // Log successful API calls in debug mode
    if (import.meta.env.VITE_APP_DEBUG === 'true') {
      console.debug('API Success:', response.config.url, response.data);
    }
    return response;
  },
  (error) => {
    // Log API errors in debug mode
    if (import.meta.env.VITE_APP_DEBUG === 'true') {
      console.error('API Error:', error.config?.url, error.response?.status, error.message, error.response?.data);
    }

    // Redirect to login page on 401 Unauthorized errors
    if (error.response?.status === 401) {
      // Ensure this redirect doesn't happen during mocked requests unless intended
      // In a real app, you might also clear the token here.
      if (typeof window !== 'undefined') { // Check if running in a browser environment
        window.location.href = '/login?session=expired';
      }
    }
    return Promise.reject(error);
  }
);

// --- Mock Data Setup (for development and testing) ---
// This section will only run if mock is initialized (i.e., in development or test environment)
if (mock) {
  // Helper for generating unique IDs
  let nextPsychologistId = 101;
  let nextBookingId = 1001;
  let nextInquiryId = 2001;
  let nextAnalyticsEventId = 3001;

  // --- Mock Data ---
  // IMPORTANT: For `mockPsychologists` to be mutable for deletion/updates,
  // it needs to be declared with `let` if you modify it directly via filter or assignment.
  // Otherwise, use methods that return a new array (e.g., map, concat) if it's `const`.
  let mockPsychologists = [ // Changed to `let` for mutability
    {
      id: 1,
      name: 'Dr. Jane Doe',
      profileSlug: 'dr-jane-doe',
      headshot: 'https://placehold.co/150x150/e0e0e0/000000?text=Jane',
      coverImage: 'https://placehold.co/800x200/d0d0d0/333333?text=Cover+Image',
      credentials: 'Ph.D., Licensed Psychologist',
      yearsOfExperience: 15,
      specializations: ['Anxiety', 'Depression', 'CBT'],
      languages: ['English', 'Spanish'],
      location: 'New York, NY',
      timeZone: 'EST',
      about: 'Dr. Doe specializes in cognitive-behavioral therapy for adults dealing with anxiety and depression. She provides a supportive and collaborative environment to help clients achieve their goals.',
      servicesOffered: ['Individual Therapy', 'Couples Counseling', 'Stress Management'],
      rate: '$150/session',
      availabilityNote: 'Accepting new clients. Flexible evening appointments available.',
      contactEmail: 'jane.doe@example.com',
      website: 'https://janedoe.com',
      status: 'Published',
      featured: true,
      views30Days: 520,
      bookings30Days: 12,
      lastUpdated: '2024-07-20T10:00:00Z',
    },
    {
      id: 2,
      name: 'Dr. John Smith',
      profileSlug: 'dr-john-smith',
      headshot: 'https://placehold.co/150x150/d0d0d0/000000?text=John',
      coverImage: 'https://placehold.co/800x200/c0c0c0/444444?text=Cover+Image',
      credentials: 'M.A., LMFT',
      yearsOfExperience: 8,
      specializations: ['Couples Therapy', 'Family Counseling', 'Trauma'],
      languages: ['English'],
      location: 'Los Angeles, CA',
      timeZone: 'PST',
      about: 'John is a compassionate therapist focusing on helping couples and families navigate complex relationship dynamics. He uses an integrative approach tailored to each client\'s unique needs.',
      servicesOffered: ['Couples Therapy', 'Family Therapy', 'Trauma-informed Care'],
      rate: '$120/session',
      availabilityNote: 'Limited availability, please inquire.',
      contactEmail: 'john.smith@example.com',
      status: 'Published',
      featured: false,
      views30Days: 310,
      bookings30Days: 8,
      lastUpdated: '2024-07-18T14:30:00Z',
    },
    {
      id: 3,
      name: 'Dr. Emily White',
      profileSlug: 'dr-emily-white',
      headshot: 'https://placehold.co/150x150/c0e0c0/000000?text=Emily',
      credentials: 'Psy.D., Licensed Clinical Psychologist',
      yearsOfExperience: 20,
      specializations: ['Child Psychology', 'ADHD', 'Parenting'],
      languages: ['English'],
      location: 'Chicago, IL',
      timeZone: 'CST',
      about: 'Dr. White works with children and adolescents, providing support for ADHD, behavioral issues, and family transitions.',
      servicesOffered: ['Child Therapy', 'Parent Coaching', 'Diagnostic Assessment'],
      rate: '$180/session',
      availabilityNote: 'Accepting new clients (ages 6-18).',
      contactEmail: 'emily.white@example.com',
      status: 'Review', // Example of a non-published profile
      featured: false,
      views30Days: 0,
      bookings30Days: 0,
      lastUpdated: '2024-07-22T09:00:00Z',
    },
    // Add more mock psychologists as needed (up to 100 for directory testing)
    ...Array.from({ length: 97 }).map((_, i) => ({
        id: i + 4,
        name: `Dr. Psychologist ${i + 4}`,
        profileSlug: `dr-psychologist-${i + 4}`,
        headshot: `https://placehold.co/150x150/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=P${i+4}`,
        credentials: 'M.S., LPC',
        yearsOfExperience: Math.floor(Math.random() * 15) + 3,
        specializations: ['Stress', 'Life Transitions', 'Grief', 'Relationships'][Math.floor(Math.random() * 4)],
        languages: ['English'],
        location: ['Houston, TX', 'Miami, FL', 'Seattle, WA', 'Denver, CO'][Math.floor(Math.random() * 4)],
        timeZone: ['CST', 'EST', 'PST', 'MST'][Math.floor(Math.random() * 4)],
        about: `Providing compassionate care to individuals navigating various life challenges. Dr. Psychologist ${i+4} focuses on personal growth and resilience.`,
        servicesOffered: ['Individual Coaching', 'Mindfulness Sessions'],
        rate: `$${(Math.floor(Math.random() * 80) + 80)}/session`,
        availabilityNote: `Available soon.`,
        contactEmail: `psychologist${i+4}@example.com`,
        status: 'Published',
        featured: Math.random() > 0.8,
        views30Days: Math.floor(Math.random() * 300),
        bookings30Days: Math.floor(Math.random() * 10),
        lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    })),
  ];

  const mockBookings = []; // To store submitted mock bookings
  const mockInquiries = []; // To store submitted mock inquiries
  const mockAnalyticsEvents = []; // To store submitted analytics events


  // --- Auth Endpoints ---

  // POST /auth/login
  mock.onPost('/auth/login').reply(config => {
    const { email, password } = JSON.parse(config.data);
    // Simulate different roles for login
    if (email === 'admin@example.com' && password === 'adminpass') {
      return [200, { token: 'admin-token', user: { id: 'admin1', role: 'admin', email: 'admin@example.com' } }];
    } else if (email === 'psychologist@example.com' && password === 'psychopass') {
      // Assuming a psychologist is linked to one of the mockPsychologists by ID
      const psy = mockPsychologists.find(p => p.contactEmail === 'psychologist@example.com');
      return [200, { token: 'psy-token', user: { id: psy ? psy.id : 'psy1', role: 'psychologist', email: 'psychologist@example.com', profileId: psy?.id } }];
    } else if (email === 'demo@example.com' && password === 'demo') {
        return [200, { token: 'demo-token', user: { id: 'demo-user', role: 'visitor', email: 'demo@example.com' } }];
    }
    return [401, { message: 'Invalid credentials' }];
  });

  // POST /auth/logout
  mock.onPost('/auth/logout').reply(200, { message: 'Logged out successfully' });

  // POST /auth/forgot-password
  mock.onPost('/auth/forgot-password').reply(200, { message: 'Password reset link sent' });

  // --- Public Psychologists Endpoints ---

  // GET /psychologists (Directory with filters, sort, pagination)
  mock.onGet('/psychologists').reply(config => {
    const { specialization, language, location, experienceMin, experienceMax, priceMin, priceMax, availabilityNote, sort, page = 1, limit = 10 } = config.params;

    let filtered = mockPsychologists.filter(p => p.status === 'Published');

    if (specialization) {
      filtered = filtered.filter(p => p.specializations && p.specializations.includes(specialization));
    }
    if (language) {
      filtered = filtered.filter(p => p.languages && p.languages.includes(language));
    }
    if (location) {
      filtered = filtered.filter(p => p.location && p.location.includes(location));
    }
    if (experienceMin) {
      filtered = filtered.filter(p => p.yearsOfExperience >= parseInt(experienceMin));
    }
    if (experienceMax) {
      filtered = filtered.filter(p => p.yearsOfExperience <= parseInt(experienceMax));
    }
    // Price range and availabilityNote would require more complex parsing of the 'rate' and 'availabilityNote' strings
    // For simplicity, these mock filters are illustrative and might need refinement for actual text parsing.
    if (availabilityNote) {
        filtered = filtered.filter(p => p.availabilityNote && p.availabilityNote.toLowerCase().includes(availabilityNote.toLowerCase()));
    }

    // Sorting
    if (sort === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'experience-desc') {
        filtered.sort((a, b) => b.yearsOfExperience - a.yearsOfExperience);
    } else if (sort === 'featured') {
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); // Featured first
    } else { // Default to relevance (or whatever your default logic is)
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.name.localeCompare(b.name));
    }


    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginated = filtered.slice(startIndex, endIndex);

    return [
      200,
      {
        psychologists: paginated,
        total: filtered.length,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(filtered.length / limit),
      },
    ];
  });

  // GET /psychologists/featured
  mock.onGet('/psychologists/featured').reply(200, {
    psychologists: mockPsychologists.filter(p => p.featured && p.status === 'Published').slice(0, 8),
  });

  // GET /psychologists/:slug
  mock.onGet(/\/psychologists\/(.+)/).reply(config => {
    const slug = config.url.split('/').pop();
    const psychologist = mockPsychologists.find(p => p.profileSlug === slug && p.status === 'Published');
    if (psychologist) {
      // Simulate incrementing view count for analytics
      psychologist.views30Days = (psychologist.views30Days || 0) + 1;
      return [200, psychologist];
    }
    return [404, { message: 'Psychologist not found' }];
  });

  // --- Booking Endpoints ---

  // POST /bookings
  mock.onPost('/bookings').reply(config => {
    const data = JSON.parse(config.data);
    const newBooking = {
      id: nextBookingId++,
      psychologistId: data.psychologistId,
      timestamp: new Date().toISOString(),
      visitorName: data.visitorName,
      visitorEmail: data.visitorEmail,
      visitorPhone: data.visitorPhone || null,
      message: data.message,
      preferredTimes: data.preferredTimes || '',
      sourcePage: data.sourcePage || '',
      utm: data.utm || '',
      deliveryStatus: 'sent', // Simulate success
      emailProviderMessageId: `mock-msg-${Date.now()}`,
      ...data
    };
    mockBookings.push(newBooking);

    // Simulate incrementing booking count for analytics
    const psy = mockPsychologists.find(p => p.id === newBooking.psychologistId);
    if (psy) {
        psy.bookings30Days = (psy.bookings30Days || 0) + 1;
    }

    // Simulate failure sometimes
    // if (Math.random() < 0.2) { // 20% chance of failure
    //     newBooking.deliveryStatus = 'failed';
    //     newBooking.emailProviderMessageId = 'mock-failure';
    //     return [500, { message: 'Failed to send booking request. Please try again later.' }];
    // }

    return [200, { message: 'Booking request sent successfully!', bookingId: newBooking.id }];
  });

  // --- Contact/Inquiry Endpoints ---

  // POST /inquiries
  mock.onPost('/inquiries').reply(config => {
    const data = JSON.parse(config.data);
    const newInquiry = {
      id: nextInquiryId++,
      timestamp: new Date().toISOString(),
      type: data.type || 'general', // 'general' or 'psychologist-signup'
      ...data,
      deliveryStatus: 'sent',
      messageId: `inquiry-msg-${Date.now()}`
    };
    mockInquiries.push(newInquiry);
    return [200, { message: 'Inquiry submitted successfully!' }];
  });

  // --- Analytics Endpoints ---
  // POST /analytics/events
  mock.onPost('/analytics/events').reply(config => {
    const eventData = JSON.parse(config.data);
    const newEvent = {
        id: nextAnalyticsEventId++,
        timestamp: new Date().toISOString(),
        ...eventData
    };
    mockAnalyticsEvents.push(newEvent);
    if (import.meta.env.VITE_APP_DEBUG === 'true') {
        console.log('[Mock API] Analytics event received:', newEvent);
    }
    return [200, { message: 'Analytics event recorded successfully!', eventId: newEvent.id }];
  });


  // --- Admin Panel Endpoints (Requires admin-token) ---

  // GET /admin/psychologists
  mock.onGet('/admin/psychologists').reply(config => {
    // In a real scenario, you'd check the auth token here.
    // For mock, we'll just return the data.
    const { page = 1, limit = 10, status, search } = config.params;
    let filtered = [...mockPsychologists];

    if (status) {
        filtered = filtered.filter(p => p.status === status);
    }
    if (search) {
        const lowerSearch = search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(lowerSearch) || 
                                        p.specializations.some(s => s.toLowerCase().includes(lowerSearch)) ||
                                        p.location.toLowerCase().includes(lowerSearch));
    }

    const startIndex = (page - 1) * limit;
    const paginated = filtered.slice(startIndex, startIndex + limit);

    return [200, {
      psychologists: paginated,
      total: filtered.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(filtered.length / limit),
    }];
  });

  // POST /admin/psychologists (Create)
  mock.onPost('/admin/psychologists').reply(config => {
    const newPsy = {
      id: nextPsychologistId++,
      profileSlug: `dr-${JSON.parse(config.data).name.toLowerCase().replace(/\s/g, '-')}-${Date.now()}`,
      headshot: 'https://placehold.co/150x150/f0f0f0/000000?text=New',
      credentials: '',
      yearsOfExperience: 0,
      specializations: [],
      languages: [],
      location: '',
      timeZone: '',
      about: '',
      servicesOffered: [],
      rate: '',
      availabilityNote: '',
      website: '',
      status: 'Draft',
      featured: false,
      views30Days: 0,
      bookings30Days: 0,
      lastUpdated: new Date().toISOString(),
      ...JSON.parse(config.data), // Merge provided data
    };
    mockPsychologists.push(newPsy);
    return [201, newPsy];
  });

  // GET /admin/psychologists/:id
  mock.onGet(/\/admin\/psychologists\/(\d+)/).reply(config => {
    const id = parseInt(config.url.split('/').pop());
    const psychologist = mockPsychologists.find(p => p.id === id);
    if (psychologist) {
      return [200, psychologist];
    }
    return [404, { message: 'Psychologist not found' }];
  });

  // PUT /admin/psychologists/:id (Edit)
  mock.onPut(/\/admin\/psychologists\/(\d+)/).reply(config => {
    const id = parseInt(config.url.split('/').pop());
    const index = mockPsychologists.findIndex(p => p.id === id);
    if (index !== -1) {
      const updatedPsy = {
        ...mockPsychologists[index],
        ...JSON.parse(config.data),
        lastUpdated: new Date().toISOString(),
      };
      mockPsychologists[index] = updatedPsy;
      return [200, updatedPsy];
    }
    return [404, { message: 'Psychologist not found' }];
  });

  // DELETE /admin/psychologists/:id
  mock.onDelete(/\/admin\/psychologists\/(\d+)/).reply(config => {
    const id = parseInt(config.url.split('/').pop());
    const initialLength = mockPsychologists.length;
    mockPsychologists = mockPsychologists.filter(p => p.id !== id);
    if (mockPsychologists.length < initialLength) {
      return [204]; // No Content on successful deletion
    }
    return [404, { message: 'Psychologist not found' }];
  });


  // GET /admin/analytics
  mock.onGet('/admin/analytics').reply(config => {
    const { startDate, endDate, psychologistId, eventType } = config.params;
    // For simplicity, mock overall stats. A real implementation would filter and aggregate events.
    const totalPublished = mockPsychologists.filter(p => p.status === 'Published').length;
    const totalViews = mockPsychologists.reduce((sum, p) => sum + (p.views30Days || 0), 0);
    const totalBookings = mockPsychologists.reduce((sum, p) => sum + (p.bookings30Days || 0), 0);
    const top5Viewed = [...mockPsychologists].sort((a,b) => b.views30Days - a.views30Days).slice(0, 5).map(p => ({id: p.id, name: p.name, views: p.views30Days}));

    const mockAnalytics = {
      totalPublishedPsychologists: totalPublished,
      totalProfileViewsLast30Days: totalViews,
      bookingRequestsSentLast30Days: totalBookings,
      top5MostViewedProfiles: top5Viewed,
      emailDeliverySuccessRateLast30Days: '98.5%', // Mock value
      // Example of chart data structure
      viewsOverTime: Array.from({ length: 7 }).map((_, i) => ({
        date: new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        views: Math.floor(Math.random() * 200) + 50,
      })),
      bookingsOverTime: Array.from({ length: 7 }).map((_, i) => ({
        date: new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        bookings: Math.floor(Math.random() * 10) + 1,
      })),
      topSpecializationsViewed: [
        { name: 'Anxiety', views: 500 },
        { name: 'Couples', views: 350 },
        { name: 'Depression', views: 280 },
      ],
    };
    return [200, mockAnalytics];
  });

  // GET /admin/bookings (Booking logs)
  mock.onGet('/admin/bookings').reply(200, {
    bookings: mockBookings.map(b => ({
      id: b.id,
      timestamp: b.timestamp,
      psychologistName: mockPsychologists.find(p => p.id === b.psychologistId)?.name || 'N/A',
      visitorName: b.visitorName,
      visitorEmail: b.visitorEmail,
      deliveryStatus: b.deliveryStatus,
      emailProviderMessageId: b.emailProviderMessageId,
      messagePreview: b.message.substring(0, 50) + '...'
    })),
    total: mockBookings.length,
  });

  // GET /admin/inquiries (Contact submissions)
  mock.onGet('/admin/inquiries').reply(200, {
    inquiries: mockInquiries,
    total: mockInquiries.length,
  });

  // POST /admin/bookings/:id/resend (Resend failed email)
  mock.onPost(/\/admin\/bookings\/(\d+)\/resend/).reply(config => {
    const id = parseInt(config.url.split('/')[3]);
    const booking = mockBookings.find(b => b.id === id);
    if (booking) {
        booking.deliveryStatus = 'sent'; // Simulate resend success
        booking.emailProviderMessageId = `mock-resend-msg-${Date.now()}`;
        return [200, { message: 'Booking email resent successfully!' }];
    }
    return [404, { message: 'Booking not found' }];
  });

  // GET /admin/content (Static page content)
  mock.onGet('/admin/content').reply(200, {
    home: { heroHeadline: 'Find the right psychologist, fast.', heroSubtext: 'Connect with licensed professionals.', howItWorksSteps: ['Browse', 'View details', 'Send request'], calloutText: 'Are you a psychologist? List your practice!' },
    howItWorks: { intro: 'Our platform simplifies finding mental health support.', clientSteps: ['Browse profiles', 'Compare options', 'Request booking'], psySection: 'We advertise your practice for a fixed monthly fee.' },
    about: { mission: 'Our mission to bridge the gap...', teamBlurb: 'We are a dedicated team...' },
    footer: { links: ['Services', 'About', 'Contact'], policies: ['Privacy Policy', 'Terms of Service'] }
  });

  // PUT /admin/content (Update static page content)
  mock.onPut('/admin/content').reply(config => {
    const updatedContent = JSON.parse(config.data);
    // In a real app, you'd save this. For mock, we just acknowledge.
    console.log('Admin content updated (mock):', updatedContent);
    return [200, { message: 'Content updated successfully!', updatedContent }];
  });

  // --- Psychologist Portal Endpoints (Requires psy-token) ---

  // GET /portal/dashboard (Psychologist's quick stats)
  mock.onGet('/portal/dashboard').reply(config => {
    // In a real app, you'd get the psychologist's ID from the token.
    // For mock, let's assume psychologist with ID 1 is logged in.
    const psychologistId = mockPsychologists.find(p => p.contactEmail === 'psychologist@example.com')?.id || 1; // Default to first mock psychologist
    const psy = mockPsychologists.find(p => p.id === psychologistId);

    if (psy) {
      return [200, {
        profileViews: psy.views30Days,
        uniqueVisitors: Math.floor(psy.views30Days * 0.75), // Mock
        avgTimeOnPage: '2:30', // Mock
        bookSubmissions: psy.bookings30Days,
        lastBookings: mockBookings.filter(b => b.psychologistId === psy.id).sort((a,b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0,5).map(b => ({
            id: b.id,
            timestamp: b.timestamp,
            visitorName: b.visitorName,
            messagePreview: b.message.substring(0, 50) + '...'
        })),
      }];
    }
    return [404, { message: 'Psychologist data not found for portal' }];
  });

  // GET /portal/profile
  mock.onGet('/portal/profile').reply(config => {
    // In a real app, the token would identify the psychologist
    // For mock, use a specific psychologist ID, e.g., ID 1 or the one associated with 'psychologist@example.com'
    const psychologistId = mockPsychologists.find(p => p.contactEmail === 'psychologist@example.com')?.id || 1;
    const profile = mockPsychologists.find(p => p.id === psychologistId);
    if (profile) {
      return [200, profile];
    }
    return [404, { message: 'Profile not found' }];
  });

  // PUT /portal/profile
  mock.onPut('/portal/profile').reply(config => {
    const psychologistId = mockPsychologists.find(p => p.contactEmail === 'psychologist@example.com')?.id || 1;
    const index = mockPsychologists.findIndex(p => p.id === psychologistId);
    if (index !== -1) {
      const updatedProfile = {
        ...mockPsychologists[index],
        ...JSON.parse(config.data),
        lastUpdated: new Date().toISOString(),
      };
      mockPsychologists[index] = updatedProfile;
      return [200, updatedProfile];
    }
    return [404, { message: 'Profile not found' }];
  });

  // GET /portal/analytics
  mock.onGet('/portal/analytics').reply(config => {
    const psychologistId = mockPsychologists.find(p => p.contactEmail === 'psychologist@example.com')?.id || 1;
    const psy = mockPsychologists.find(p => p.id === psychologistId);

    if (psy) {
      return [200, {
        profileViewsOverTime: Array.from({ length: 7 }).map((_, i) => ({
          date: new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          views: Math.floor(Math.random() * 100) + 10,
        })),
        bookSubmissionsOverTime: Array.from({ length: 7 }).map((_, i) => ({
          date: new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          submissions: Math.floor(Math.random() * 5) + 1,
        })),
        topReferrers: [
          { source: 'Google Search', count: 50 },
          { source: 'PsychologyToday.com', count: 30 },
        ],
        clicksOnLinks: {
            website: Math.floor(Math.random() * 20) + 5,
            phone: Math.floor(Math.random() * 10) + 2,
        }
      }];
    }
    return [404, { message: 'Analytics not found for psychologist' }];
  });

  // POST /portal/settings/change-password
  mock.onPost('/portal/settings/change-password').reply(200, { message: 'Password changed successfully' });

  // PUT /portal/settings/toggle-accepting-clients
  mock.onPut('/portal/settings/toggle-accepting-clients').reply(config => {
    const { acceptingClients } = JSON.parse(config.data);
    const psychologistId = mockPsychologists.find(p => p.contactEmail === 'psychologist@example.com')?.id || 1;
    const psy = mockPsychologists.find(p => p.id === psychologistId);
    if (psy) {
      psy.availabilityNote = acceptingClients ? 'Accepting new clients.' : 'Currently not accepting new clients.';
      return [200, { message: 'Status updated', acceptingClients }];
    }
    return [404, { message: 'Psychologist not found' }];
  });
}

export default api;
