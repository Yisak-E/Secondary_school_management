
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from './fireConfig'; // Import your Firestore instance

import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Navigation from './components/Shared/Navigation';
import StudentGrades from './components/StudentPortal/StudentGrades';
import StudentSchedule from './components/StudentPortal/StudentSchedule';
import TeacherGrades from './components/TeacherPortal/TeacherGrades';
import DirectorReports from './components/DirectorPortal/DirectorReports';
import StudentBooks from "./components/StudentPortal/StudentBooks.jsx";
import Landing from './components/Landing';

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false); // State to track if auth check is complete

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in, now fetch their role from Firestore
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Combine auth data with Firestore data (like role)
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            ...userDoc.data(), // This will add the 'role' field
          });
        } else {
          // Handle case where user exists in Auth but not in Firestore
          console.error("User document not found in Firestore!");
          setUser(null); // Or handle as an error state
        }
      } else {
        // User is signed out
        setUser(null);
      }
      setAuthChecked(true); // Mark auth check as complete
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("User signed out successfully");
        navigate('/'); // Redirect to landing page after logout
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  // Render a loading state or nothing until the initial auth check is done
  if (!authChecked) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && <Navigation user={user} onLogout={handleLogout} />}

      <main className={user ? "pt-16" : ""}>
        <Routes>
          <Route path='/' element={<Landing />} />

          <Route path="/login" element={
            user ? <Navigate to="/dashboard" /> : <Login />
          } />

          <Route path="/dashboard" element={
            user ? <Dashboard user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/student/grades" element={
            user?.role === 'student' ? <StudentGrades user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/student/books" element={
            user?.role === 'student' ? <StudentBooks user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/student/schedule" element={
            user?.role === 'student' ? <StudentSchedule user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/teacher/grades" element={
            user?.role === 'teacher' ? <TeacherGrades user={user} /> : <Navigate to="/login" />
          } />

          <Route path="/director/reports" element={
            user?.role === 'director' ? <DirectorReports user={user} /> : <Navigate to="/login" />
          } />

          {/* This catch-all at the end is better for handling 404s */}
          <Route path="*" element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
                <button
                  onClick={() => navigate(user ? '/dashboard' : '/')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Go to Home
                </button>
              </div>
            </div>
          } />
        </Routes>
      </main>
    </div>
  )
}

export default App;
