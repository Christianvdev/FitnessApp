import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './api/axios.js'
import AppShell, { Icon } from './components/AppShell.jsx'
import './styles/DashboardPage.css'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function DashboardPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      navigate('/')
      return
    }

    async function loadDashboard() {
      try {
        const [userResponse, workoutResponse] = await Promise.all([
          api.get('/api/accounts/me/'),
          api.get('/api/tracker/workout/')
        ])
        setUsername(userResponse.data.username)
        setWorkouts(workoutResponse.data.results || workoutResponse.data)
      } catch (error) {
        console.error('Could not load dashboard:', error)
      } finally {
        setLoading(false)
      }
    }
    loadDashboard()
  }, [navigate])

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const totalSets = workouts.reduce((total, workout) => total + (Number(workout.sets) || 0), 0)
  const dayName = days.includes(today) ? today : 'Monday'

  return (
    <AppShell section="Overview">
      <div className="overview-heading">
        <div>
          <p className="fit-kicker">YOUR TRAINING SPACE</p>
          <h1 className="fit-page-title">Welcome back{username ? `, ${username}` : ''}<span className="fit-heading-dot">.</span></h1>
          <p className="fit-subtitle">Small steps, stronger days. Keep your training on track.</p>
        </div>
        <button className="fit-primary-button" onClick={() => navigate(`/workout-log/${dayName}`)}><Icon name="plus" size={17} /> Log workout</button>
      </div>

      <div className="overview-stats">
        <div className="overview-stat"><span className="overview-stat-label"><Icon name="activity" size={17} /> Total exercises</span><strong>{loading ? '—' : workouts.length}</strong><small>Exercises you've logged</small></div>
        <div className="overview-stat"><span className="overview-stat-label"><Icon name="layers" size={17} /> Total sets</span><strong>{loading ? '—' : totalSets}</strong><small>Sets completed so far</small></div>
        <div className="overview-stat overview-stat-featured"><span className="overview-stat-label"><Icon name="calendar" size={17} /> Today's focus</span><strong className="overview-day-value">{dayName}</strong><button onClick={() => navigate(`/dashboard/${dayName}`)}>Open today's workout <Icon name="arrow" size={15} /></button></div>
      </div>

      <div className="fit-section-heading"><div><p className="fit-kicker">YOUR SCHEDULE</p><h2>Training week</h2></div><p>Choose a day to view or log exercises</p></div>
      <div className="day-container">
        {days.map((day, index) => (
          <button key={day} className={`day-button ${day === dayName ? 'day-button-today' : ''}`} onClick={() => navigate(`/dashboard/${day}`)}>
            <span className="day-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="day-info"><strong>{day}</strong><small>{day === dayName ? 'Today · Ready when you are' : 'View training day'}</small></span>
            {day === dayName && <span className="day-today-tag">TODAY</span>}
            <span className="day-arrow"><Icon name="arrow" size={17} /></span>
          </button>
        ))}
      </div>
      <div className="overview-footer-note"><Icon name="activity" size={18} /><span>Consistency builds progress. Your next workout starts here.</span></div>
    </AppShell>
  )
}
