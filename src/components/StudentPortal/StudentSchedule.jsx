// components/StudentPortal/StudentSchedule.jsx
import './StudentSchedule.css'

function StudentSchedule({ user }) {
  const weeklySchedule = [
    { day: 'Monday', periods: ['Math', 'Physics', 'Break', 'English', 'Amharic'] },
    { day: 'Tuesday', periods: ['Chemistry', 'Biology', 'Break', 'History', 'Sport'] },
    { day: 'Wednesday', periods: ['Math', 'English', 'Break', 'Physics', 'Civics'] },
    { day: 'Thursday', periods: ['Amharic', 'Geography', 'Break', 'Math', 'Club'] },
    { day: 'Friday', periods: ['Physics', 'English', 'Break', 'Biology', 'Art'] }
  ]

  const t = {
    title: user.language === 'am' ? 'የትምህርት መርሃ ግብሬ' : 'My Class Schedule',
    time: user.language === 'am' ? 'ሰዓት' : 'Time',
    break: user.language === 'am' ? 'የምግብ ሰዓት' : 'Lunch Break'
  }

  const times = ['8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-1:00']

  return (
    <div className="student-schedule">
      <h1>{t.title}</h1>

      <div className="schedule-grid">
        <div className="time-column">
          <div className="time-header">{t.time}</div>
          {times.map((time, index) => (
            <div key={index} className="time-slot">{time}</div>
          ))}
        </div>

        {weeklySchedule.map((daySchedule, dayIndex) => (
          <div key={dayIndex} className="day-column">
            <div className="day-header">
              {user.language === 'am' ?
                ['ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ'][dayIndex] :
                daySchedule.day
              }
            </div>
            {daySchedule.periods.map((period, periodIndex) => (
              <div key={periodIndex} className={`period-slot ${period === 'Break' ? 'break-slot' : ''}`}>
                {period === 'Break' ? t.break : period}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentSchedule