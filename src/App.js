import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import WeeklyReport from './pages/WeeklyReport';
import Settings from './pages/Settings';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const { isDark } = useTheme();
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-secondary-dark">
        <Toaster 
          position="top-right" 
          toastOptions={{
            style: {
              background: isDark ? '#1f2937' : '#fff',
              color: isDark ? '#f3f4f6' : '#111827',
              border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
            },
          }}
        />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Protected routes with layout */}
          <Route path="/*" element={
            <ProtectedRoute>
              <div className="flex min-h-screen bg-gray-50 dark:bg-secondary-dark">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                  <Navbar />
                  <main className="flex-1 p-6 md:ml-64 bg-gray-50 dark:bg-secondary-dark">
                    <div className="max-w-7xl mx-auto">
                      <Routes>
                        <Route path="" element={<Dashboard />} />
                        <Route path="weekly-report" element={<WeeklyReport />} />
                        <Route path="settings" element={<Settings />} />
                      </Routes>
                    </div>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
