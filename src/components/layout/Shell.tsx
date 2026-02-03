import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

const Shell = () => {
  const initialize = useAuthStore((state) => state.initialize);
  
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-4rem)] md:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Shell;
