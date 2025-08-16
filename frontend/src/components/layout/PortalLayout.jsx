import React from 'react';
import Sidebar from '../common/Sidebar';
import Header from './Header';

const PortalLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar isPsychologist={true} />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;