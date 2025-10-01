import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './fireConfig';

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from './components/Shared/Navigation';
import StudentGrades from './components/StudentPortal/StudentGrades';
import StudentSchedule from './components/StudentPortal/StudentSchedule';
import TeacherGrades from './components/TeacherPortal/TeacherGrades';
import TeacherAttendance from './components/TeacherPortal/TeacherAttendance';
import StudentBooks from "./components/StudentPortal/StudentBooks.jsx";
import Landing from './components/Landing';

// Import Director Portal Components
import DirectorPortal from './features/director/DirectorPortal';
import StudentManagement from './features/director/components/StudentManagement';
import ReportGenerator from './features/director/components/ReportGenerator';
import SystemSettings from './features/director/components/SystemSettings';
import TeacherSchedule from "./components/TeacherPortal/TeacherSchedule.jsx";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          const userDocRef = doc(db, 'users', firebaseUser.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              ...userDoc.data(),
            });
          } else {
            console.error("User document not found in Firestore!");
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setAuthChecked(true);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigate('/');
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navigation user={user} onLogout={handleLogout} />}

      <main className={user ? "pt-16" : ""}>
        <Routes>
          {/* Public Routes */}
          <Route path='/' element={<Landing />} />

          <Route path="/login" element={
            user ? <Navigate to="/dashboard" /> : <Login />
          } />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" />
          } />

          {/* Student Routes */}
          <Route path="/student/grades" element={
            user?.role === 'student' ? <StudentGrades user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/student/books" element={
            user?.role === 'student' ? <StudentBooks user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/student/schedule" element={
            user?.role === 'student' ? <StudentSchedule user={user} /> : <Navigate to="/login" />
          } />

          {/* Teacher Routes */}
          <Route path="/teacher/grades" element={
            user?.role === 'teacher' ? <TeacherGrades user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/teacher/attendance" element={
            user?.role === 'teacher' ? <TeacherAttendance user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/teacher/schedule" element={
            user?.role === 'teacher' ? <TeacherSchedule user={user} /> : <Navigate to="/login" />
          } />

          {/* Director Routes with nested layout */}
          <Route path="/director" element={
            user?.role === 'director' ? <DirectorPortal user={user} /> : <Navigate to="/login" />
          }>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Director Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-2">School Overview</h3>
                    <p className="text-gray-600">Total Students: 1,245</p>
                    <p className="text-gray-600">Total Teachers: 48</p>
                    <p className="text-gray-600">Attendance Rate: 94%</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-2">Recent Activities</h3>
                    <p className="text-gray-600">New enrollments: 12</p>
                    <p className="text-gray-600">Staff updates: 3</p>
                    <p className="text-gray-600">System alerts: 0</p>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                    <button
                      onClick={() => navigate('/director/students')}
                      className="block w-full text-left text-blue-600 hover:text-blue-800 mb-2"
                    >
                      Manage Students
                    </button>
                    <button
                      onClick={() => navigate('/director/reports')}
                      className="block w-full text-left text-blue-600 hover:text-blue-800 mb-2"
                    >
                      Generate Reports
                    </button>
                    <button
                      onClick={() => navigate('/director/settings')}
                      className="block w-full text-left text-blue-600 hover:text-blue-800"
                    >
                      System Settings
                    </button>
                  </div>
                </div>
              </div>
            } />
            <Route path="students" element={<StudentManagement />} />
            <Route path="reports" element={<ReportGenerator />} />
            <Route path="settings" element={<SystemSettings />} />
          </Route>

          {/* Legacy Director Routes for backward compatibility */}
          <Route path="/director/reports" element={
            user?.role === 'director' ? <Navigate to="/director/reports" replace /> : <Navigate to="/login" />
          } />

          <Route path="/director/students" element={
            user?.role === 'director' ? <Navigate to="/director/students" replace /> : <Navigate to="/login" />
          } />

          <Route path="/director/settings" element={
            user?.role === 'director' ? <Navigate to="/director/settings" replace /> : <Navigate to="/login" />
          } />

          {/* 404 Page */}
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
                <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
                <button
                  onClick={() => navigate(user ? '/dashboard' : '/')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Go to {user ? 'Dashboard' : 'Home'}
                </button>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;