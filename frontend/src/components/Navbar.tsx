import React from "react";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-njit-red-dark border-b border-gray-800">
      <h1 className="text-4xl font-brick">NJITSBC</h1>
      <div className="space-x-4">
        <a href="#join" className="hover:text-gray-300 transition">
          Join
        </a>
      </div>
    </nav>
  );
}
