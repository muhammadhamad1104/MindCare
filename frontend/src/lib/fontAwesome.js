// src/utils/fontAwesome.js
import { library, config } from '@fortawesome/fontawesome-svg-core';

// Solid Icons
import { 
  faSearch, 
  faUser, 
  faEnvelope, 
  faMapMarkerAlt,
  faPhone, 
  faCalendarAlt, 
  faChevronRight,
  faChevronLeft, 
  faChevronDown, 
  faHeart, 
  faFileAlt,
  faClock,
  faUserMd,
  faHandshake,
  faChartLine,
  faLightbulb,
  faUsers,
  faCheckCircle,
  faExclamationTriangle,
  faEdit,
  faToggleOn,
  faToggleOff,
  faPlus,
  faSpinner,
  faQuestionCircle,
  faComment,
  faIdCard,
  faTimesCircle,
  faNewspaper
} from '@fortawesome/free-solid-svg-icons';


// Brand Icons
import { 
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin 
} from '@fortawesome/free-brands-svg-icons';

// Add all icons to library
library.add(
  // Solid Icons
  faSearch, 
  faUser, 
  faEnvelope, 
  faMapMarkerAlt,
  faPhone, 
  faCalendarAlt, 
  faChevronRight,
  faChevronLeft, 
  faChevronDown, 
  faHeart, 
  faFileAlt,
  faClock,
  faUserMd,
  faHandshake,
  faChartLine,
  faLightbulb,
  faUsers,
  faCheckCircle,
  faExclamationTriangle,
  faEdit,
  faToggleOn,
  faToggleOff,
  faPlus,
  faSpinner,
  faQuestionCircle,
  faComment,
  faIdCard,
  faTimesCircle,
  
  // Regular Icons
  faNewspaper,
  
  // Brand Icons
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin
);

// Export individual icons for direct usage in components
export {
  // Solid Icons
  faSearch, 
  faUser, 
  faEnvelope, 
  faMapMarkerAlt,
  faPhone, 
  faCalendarAlt, 
  faChevronRight,
  faChevronLeft, 
  faChevronDown, 
  faHeart, 
  faFileAlt,
  faClock,
  faUserMd,
  faHandshake,
  faChartLine,
  faLightbulb,
  faUsers,
  faCheckCircle,
  faExclamationTriangle,
  faEdit,
  faToggleOn,
  faToggleOff,
  faPlus,
  faSpinner,
  faQuestionCircle,
  faComment,
  faIdCard,
  faTimesCircle,
  
  // Regular Icons (export as faBlog for consistent usage)
  faNewspaper as faBlog,
  
  // Brand Icons
  faFacebook, 
  faTwitter, 
  faInstagram, 
  faLinkedin
};

// Prevent Font Awesome from adding its CSS since we're using React components
config.autoAddCss = false;