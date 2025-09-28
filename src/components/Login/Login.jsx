// components/Login/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../fireConfig.js";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The onAuthStateChanged listener in App.jsx will handle the redirect.
      // We can navigate here as a fallback or for immediate feedback.
      navigate('/dashboard');
    } catch (error) {
      console.error("Login Error:", error);
      setError("Failed to sign in. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 p-0 m-0">
      <div className={' img-bg-cover lg:w-3/5 h-screen flex flex-col items-center justify-center text-white p-4'}>
        <h3 className={'text-center text-black font-serif text-4xl  font-bold drop-shadow-lg'}>
          Welcome to Ejere School Management
        </h3>
      </div>
      <div className="right-0 lg:w-2/5 bg-gray-50 flex flex-col justify-center p-8">

        <div>
          <h3 className={'text-center text-2xl text-gray-700 font-bold mb-2'}>Ejere Secondary School</h3>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                autoComplete={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
