import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
            <h1>
                Hire Tracker
            </h1>

            <span className="text-sm text-blue-100">React + Spring Boot</span>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
