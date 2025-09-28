// components/Login/Login.jsx

import { useState } from 'react'

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student',

  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const mockUser = {
      id: '1',
      name: 'Sample User',
      email: formData.email,
      role: formData.role,
      school: 'Ejere High School'
    }

    onLogin(mockUser)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 p-0 m-0">
       <div className={'img-bg-cover  lg:w-37/50  h-screen'}>
          <h3 className={' text-center text-3xl mt-10 shadow-xl font-bold'}>welcome to Ejere School management</h3>
          <div className={'bg-blue-950 rounded-full w-40 h-40 mx-50 my-50 shadow-3xl'}></div>
       </div>
        <div className="right-0 lg:w-13/50 bg-gray-50">

        <div>
          <h3 className={'text-center text-2xl text-gray-500 font-serif font-bold italic mt-16'}>Ejere secondary School</h3>
          <p className="mt-2 text-center text-sm text-gray-600 lg:text-lg ">
            Sign in to your account
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md  shadow-sm -space-y-px ">
            <div className="flex items-center justify-between w-7/8 mx-auto bg-white mt-3">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm bg-gray-50"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className={'flex items-center justify-between w-7/8 mx-auto mb-5'}>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            <div className="flex items-center justify-between w-7/8 mx-auto bg-gray-50">
            <select
              id="role"
              name="role"
              className="my-auto mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="director">Director</option>
            </select>
          </div>
          </div>

          <div className={'w-7/8 mx-auto mb-5'}>
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
  )
}

export default Login