// components/TeacherPortal/TeacherSchedule.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TeacherSchedule({ user }) {
  const [schedule, setSchedule] = useState([]);
  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedView, setSelectedView] = useState('daily'); // 'daily' or 'weekly'
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  const mockSchedule = {
    monday: [
      {
        time: '08:00 - 09:00',
        subject: 'Mathematics',
        class: 'Grade 10A',
        room: 'Room 101',
        type: 'lecture',
        students: 32
      },
      {
        time: '09:00 - 10:00',
        subject: 'Mathematics',
        class: 'Grade 10B',
        room: 'Room 102',
        type: 'lecture',
        students: 28
      },
      {
        time: '10:15 - 11:15',
        subject: 'Advanced Math',
        class: 'Grade 11A',
        room: 'Room 201',
        type: 'tutorial',
        students: 24
      },
      {
        time: '11:15 - 12:15',
        subject: 'Mathematics',
        class: 'Grade 10C',
        room: 'Room 103',
        type: 'lecture',
        students: 30
      },
    ],
    tuesday: [
      {
        time: '08:00 - 09:00',
        subject: 'Mathematics',
        class: 'Grade 10A',
        room: 'Room 101',
        type: 'workshop',
        students: 32
      },
      {
        time: '09:00 - 10:30',
        subject: 'Advanced Math',
        class: 'Grade 11A',
        room: 'Lab 1',
        type: 'practical',
        students: 24
      },
      {
        time: '11:00 - 12:00',
        subject: 'Staff Meeting',
        class: 'All Teachers',
        room: 'Conference Room',
        type: 'meeting',
        students: 0
      },
    ],
    wednesday: [
      {
        time: '08:00 - 10:00',
        subject: 'Mathematics',
        class: 'Grade 10B',
        room: 'Room 102',
        type: 'double-period',
        students: 28
      },
      {
        time: '10:30 - 11:30',
        subject: 'Advanced Math',
        class: 'Grade 11A',
        room: 'Room 201',
        type: 'lecture',
        students: 24
      },
      {
        time: '11:30 - 12:30',
        subject: 'Mathematics',
        class: 'Grade 10C',
        room: 'Room 103',
        type: 'tutorial',
        students: 30
      },
    ],
    thursday: [
      {
        time: '08:00 - 09:00',
        subject: 'Mathematics',
        class: 'Grade 10A',
        room: 'Room 101',
        type: 'lecture',
        students: 32
      },
      {
        time: '09:00 - 10:00',
        subject: 'Mathematics',
        class: 'Grade 10B',
        room: 'Room 102',
        type: 'workshop',
        students: 28
      },
      {
        time: '10:30 - 12:00',
        subject: 'Professional Development',
        class: 'Training',
        room: 'Library',
        type: 'training',
        students: 0
      },
    ],
    friday: [
      {
        time: '08:00 - 09:00',
        subject: 'Advanced Math',
        class: 'Grade 11A',
        room: 'Room 201',
        type: 'lecture',
        students: 24
      },
      {
        time: '09:00 - 10:00',
        subject: 'Mathematics',
        class: 'Grade 10C',
        room: 'Room 103',
        type: 'review',
        students: 30
      },
      {
        time: '10:30 - 11:30',
        subject: 'Mathematics Club',
        class: 'Club',
        room: 'Room 101',
        type: 'club',
        students: 15
      },
    ],
  };

  const weeklyOverview = {
    monday: { classes: 4, students: 114, hours: 4 },
    tuesday: { classes: 3, students: 56, hours: 3.5 },
    wednesday: { classes: 3, students: 82, hours: 4 },
    thursday: { classes: 3, students: 60, hours: 3.5 },
    friday: { classes: 3, students: 69, hours: 3.5 },
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

  const getTypeColor = (type) => {
    const colors = {
      lecture: 'bg-blue-100 text-blue-800',
      tutorial: 'bg-green-100 text-green-800',
      workshop: 'bg-purple-100 text-purple-800',
      practical: 'bg-orange-100 text-orange-800',
      meeting: 'bg-red-100 text-red-800',
      training: 'bg-indigo-100 text-indigo-800',
      'double-period': 'bg-pink-100 text-pink-800',
      review: 'bg-teal-100 text-teal-800',
      club: 'bg-yellow-100 text-yellow-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type) => {
    const icons = {
      lecture: '📚',
      tutorial: '✏️',
      workshop: '🛠️',
      practical: '🔬',
      meeting: '👥',
      training: '🎓',
      'double-period': '⏰',
      review: '📝',
      club: '🎯',
    };
    return icons[type] || '📅';
  };

  const handleTakeAttendance = (classItem) => {
    // Navigate to attendance page with class context
    navigate('/teacher/attendance', {
      state: {
        className: classItem.class,
        subject: classItem.subject
      }
    });
  };

  const handleViewGrades = (classItem) => {
    // Navigate to grades page with class context
    navigate('/teacher/grades', {
      state: {
        className: classItem.class,
        subject: classItem.subject
      }
    });
  };

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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Teaching Schedule</h1>
              <p className="text-gray-600">Manage your classes and teaching timetable</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setSelectedView('daily')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedView === 'daily'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Daily View
                </button>
                <button
                  onClick={() => setSelectedView('weekly')}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedView === 'weekly'
                      ? 'bg-white text-gray-800 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Weekly View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <span className="text-blue-600 text-2xl">📚</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Classes This Week</p>
                <p className="text-2xl font-bold text-gray-800">16</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <span className="text-green-600 text-2xl">👥</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-800">381</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <span className="text-purple-600 text-2xl">⏰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Teaching Hours</p>
                <p className="text-2xl font-bold text-gray-800">18.5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <span className="text-orange-600 text-2xl">🏫</span>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Different Classes</p>
                <p className="text-2xl font-bold text-gray-800">4</p>
              </div>
            </div>
          </div>
        </div>

        {selectedView === 'daily' ? (
          <>
            {/* Day Selector */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex overflow-x-auto space-x-2 pb-2">
                {days.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    className={`flex-1 min-w-32 px-4 py-3 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                      selectedDay === day.id
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {day.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Day Schedule */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">
                  {days.find(d => d.id === selectedDay)?.name}'s Schedule
                  <span className="ml-2 text-sm font-normal text-gray-600">
                    ({schedule.length} classes, {weeklyOverview[selectedDay]?.hours} hours)
                  </span>
                </h2>
              </div>

              {schedule.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {schedule.map((classItem, index) => (
                    <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                                {classItem.subject}
                              </h3>
                              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <span className="mr-2">🏫</span>
                                  {classItem.class}
                                </div>
                                <div className="flex items-center">
                                  <span className="mr-2">🕐</span>
                                  {classItem.time}
                                </div>
                                <div className="flex items-center">
                                  <span className="mr-2">📍</span>
                                  {classItem.room}
                                </div>
                                {classItem.students > 0 && (
                                  <div className="flex items-center">
                                    <span className="mr-2">👥</span>
                                    {classItem.students} students
                                  </div>
                                )}
                              </div>
                            </div>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(classItem.type)}`}>
                              <span className="mr-1">{getTypeIcon(classItem.type)}</span>
                              {classItem.type.replace('-', ' ')}
                            </span>
                          </div>

                          {/* Quick Actions */}
                          {classItem.students > 0 && (
                            <div className="flex flex-wrap gap-2 mt-4">
                              <button
                                onClick={() => handleTakeAttendance(classItem)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center"
                              >
                                <span className="mr-2">✅</span>
                                Take Attendance
                              </button>
                              <button
                                onClick={() => handleViewGrades(classItem)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center"
                              >
                                <span className="mr-2">📝</span>
                                Enter Grades
                              </button>
                              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center">
                                <span className="mr-2">📋</span>
                                Lesson Plan
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-4">🎉</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No classes scheduled</h3>
                  <p className="text-gray-500">Enjoy your day off!</p>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Weekly View */
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Weekly Overview</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {days.map((day) => (
                  <div
                    key={day.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedDay === day.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      setSelectedDay(day.id);
                      setSelectedView('daily');
                    }}
                  >
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-800 mb-2">{day.name}</div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Classes:</span>
                          <span className="font-semibold">{weeklyOverview[day.id]?.classes}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Students:</span>
                          <span className="font-semibold">{weeklyOverview[day.id]?.students}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hours:</span>
                          <span className="font-semibold">{weeklyOverview[day.id]?.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Weekly Summary */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Weekly Summary</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">16</div>
                    <div className="text-sm text-blue-700">Total Classes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">381</div>
                    <div className="text-sm text-blue-700">Total Students</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">18.5</div>
                    <div className="text-sm text-blue-700">Teaching Hours</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">4</div>
                    <div className="text-sm text-blue-700">Different Classes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center">
                <span className="text-yellow-600 text-xl mr-3">📅</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Parent-Teacher Meeting</h4>
                  <p className="text-sm text-gray-600">Friday, 2:00 PM - Conference Room</p>
                </div>
              </div>
              <span className="text-sm text-yellow-600 font-medium">This Week</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center">
                <span className="text-blue-600 text-xl mr-3">🎓</span>
                <div>
                  <h4 className="font-semibold text-gray-800">Math Competition Training</h4>
                  <p className="text-sm text-gray-600">Starts next Monday - Room 201</p>
                </div>
              </div>
              <span className="text-sm text-blue-600 font-medium">Next Week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}