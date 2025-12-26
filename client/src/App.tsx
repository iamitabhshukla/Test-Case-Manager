import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';

// Lazy Load Pages
const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const ProjectList = React.lazy(() => import('./pages/ProjectList'));
const TestCaseList = React.lazy(() => import('./pages/TestCaseList'));
const ExecutionList = React.lazy(() => import('./pages/ExecutionList'));

// Loading Fallback
const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-10">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-900"></div>
  </div>
);

// Simple Protected Route Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, token } = useAuth();

  // Also check if token is in local storage to prevent flicker on refresh
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<ProjectList />} />
          <Route path="test-cases" element={<TestCaseList />} />
          <Route path="evaluations" element={<ExecutionList />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
