import React from 'react';

const StudentCenterLanding = () => {
  return (
    <div className="max-h-screen bg-gradient-to-br from-indigo-100 to-white flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">
          🌟 Welcome to the Student Empowerment Hub
        </h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Where Every Dream Finds Direction
        </h2>
        <p className="text-lg text-gray-700 mb-4">
          At our Motivational Student Center, we believe every student holds the power to shape their future. Whether you're discovering your strengths, overcoming challenges, or chasing bold ambitions — this is your space to grow, thrive, and lead.
        </p>
        <ul className="text-left text-gray-700 list-disc list-inside mb-6">
          <li>💬 Daily inspiration and goal-setting tools</li>
          <li>🤝 Peer mentoring and leadership workshops</li>
          <li>📚 Academic support with heart and hustle</li>
          <li>🧘 Safe spaces to talk, reflect, and recharge</li>
        </ul>
        <p className="text-lg text-gray-700">
          Motivation isn’t just a feeling — it’s a skill. And here, we help you build it. With guidance, community, and real-world strategies, we turn potential into progress.
        </p>
      </div>
    </div>
  );
};

export default StudentCenterLanding;