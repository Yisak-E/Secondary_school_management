// components/StudentPortal/StudentSchedule.jsx
import { useState, useEffect } from 'react';

export default function StudentSchedule({ user }) {
  const [schedule, setSchedule] = useState([]);
  const [selectedDay, setSelectedDay] = useState('monday');
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  const mockSchedule = {
    monday: [
      { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '09:00 - 10:00', subject: 'English', teacher: 'Ms. Johnson', room: 'Room 102' },
      { time: '10:15 - 11:15', subject: 'Science', teacher: 'Dr. Brown', room: 'Lab 1' },
      { time: '11:15 - 12:15', subject: 'History', teacher: 'Mrs. Davis', room: 'Room 103' },
    ],
    tuesday: [
      { time: '08:00 - 09:00', subject: 'Geography', teacher: 'Mr. Wilson', room: 'Room 104' },
      { time: '09:00 - 10:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '10:15 - 11:15', subject: 'Physical Education', teacher: 'Coach Miller', room: 'Gym' },
      { time: '11:15 - 12:15', subject: 'English', teacher: 'Ms. Johnson', room: 'Room 102' },
    ],
    wednesday: [
      { time: '08:00 - 09:00', subject: 'Science', teacher: 'Dr. Brown', room: 'Lab 1' },
      { time: '09:00 - 10:00', subject: 'Art', teacher: 'Ms. Taylor', room: 'Art Room' },
      { time: '10:15 - 11:15', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '11:15 - 12:15', subject: 'Music', teacher: 'Mr. Anderson', room: 'Music Room' },
    ],
    thursday: [
      { time: '08:00 - 09:00', subject: 'History', teacher: 'Mrs. Davis', room: 'Room 103' },
      { time: '09:00 - 10:00', subject: 'English', teacher: 'Ms. Johnson', room: 'Room 102' },
      { time: '10:15 - 11:15', subject: 'Geography', teacher: 'Mr. Wilson', room: 'Room 104' },
      { time: '11:15 - 12:15', subject: 'Science', teacher: 'Dr. Brown', room: 'Lab 1' },
    ],
    friday: [
      { time: '08:00 - 09:00', subject: 'Mathematics', teacher: 'Mr. Smith', room: 'Room 101' },
      { time: '09:00 - 10:00', subject: 'Assembly', teacher: '', room: 'Auditorium' },
      { time: '10:15 - 11:15', subject: 'English', teacher: 'Ms. Johnson', room: 'Room 102' },
      { time: '11:15 - 12:15', subject: 'Club Activities', teacher: '', room: 'Various' },
    ],
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSchedule(mockSchedule[selectedDay]);
      setLoading(false);
    }, 800);
  }, [selectedDay]);

  const days = [
    { id: 'monday', name: 'Monday' },
    { id: 'tuesday', name: 'Tuesday' },
    { id: 'wednesday', name: 'Wednesday' },
    { id: 'thursday', name: 'Thursday' },
    { id: 'friday', name: 'Friday' },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Class Schedule</h1>
          <p className="text-gray-600">View your weekly class timetable</p>
        </div>

        {/* Day Selector */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => setSelectedDay(day.id)}
                className={`flex-1 min-w-24 px-4 py-3 rounded-lg font-medium text-sm whitespace-nowrap ${
                  selectedDay === day.id
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day.name}
              </button>
            ))}
          </div>
        </div>

        {/* Current Day Schedule */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              {days.find(d => d.id === selectedDay)?.name}'s Schedule
            </h2>
          </div>

          {schedule.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {schedule.map((classItem, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {classItem.subject}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <span className="mr-2">🕐</span>
                          {classItem.time}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">👤</span>
                          {classItem.teacher || 'Not assigned'}
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">🏫</span>
                          {classItem.room}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        Class
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No classes scheduled</h3>
              <p className="text-gray-500">Enjoy your day off!</p>
            </div>
          )}
        </div>

        {/* Weekly Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Weekly Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {days.map((day) => (
              <div
                key={day.id}
                className={`text-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  selectedDay === day.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedDay(day.id)}
              >
                <div className="text-sm font-medium text-gray-600">{day.name}</div>
                <div className="text-2xl font-bold text-gray-800 mt-1">
                  {mockSchedule[day.id]?.length || 0}
                </div>
                <div className="text-xs text-gray-500">classes</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}