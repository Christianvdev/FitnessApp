import { useNavigate, useLocation } from 'react-router-dom'
import '../styles/AppShell.css'

// A small shared icon component keeps the navigation consistent.
export function Icon({ name, size = 20 }) {
  const icons = {
    dumbbell: <><path d="m6.5 6.5 11 11M3 7l4-4m-1 7 4-4M14 18l4-4m-1 7 4-4" /></>,
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" /><path d="M9 21v-7h6v7" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    back: <path d="m15 18-6-6 6-6" />,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5M21 12H9" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4m10-4v4M3 10h18" /></>,
    activity: <path d="M3 12h4l3-7 4 14 3-7h4" />,
    layers: <><rect x="4" y="4" width="16" height="16" rx="3" /><path d="M8 9h8m-8 4h8" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name] || icons.activity}</svg>
}

export function Brand() {
  return (
    <div className="fit-brand">
      <span className="fit-brand-icon"><Icon name="activity" size={21} /></span>
      <span>fit<span className="fit-brand-light">tracker</span><span className="fit-brand-dot">.</span></span>
    </div>
  )
}

export default function AppShell({ children, section = 'Overview' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' })
  const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].includes(today) ? today : 'Monday'

  function signOut() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate('/')
  }

  return (
    <div className="fit-shell">
      <header className="fit-topbar">
        <button className="fit-brand-button" onClick={() => navigate('/home')} aria-label="FitTracker home"><Brand /></button>
        <div className="fit-topbar-right">
          <span className="fit-topbar-section">{section}</span>
          <span className="fit-topbar-divider" />
          <span className="fit-date"><Icon name="calendar" size={15} /> {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          <button className="fit-icon-button fit-desktop-logout" onClick={signOut} title="Sign out" aria-label="Sign out"><Icon name="logout" size={18} /></button>
        </div>
      </header>

      <div className="fit-body">
        <aside className="fit-sidebar">
          <p className="fit-nav-label">WORKSPACE</p>
          <button className={`fit-nav-link ${location.pathname === '/home' ? 'active' : ''}`} onClick={() => navigate('/home')}><Icon name="home" size={18} /> Overview</button>
          <button className={`fit-nav-link ${location.pathname.includes('/dashboard/') ? 'active' : ''}`} onClick={() => navigate(`/dashboard/${day}`)}><Icon name="layers" size={18} /> Today's workout</button>
          <button className="fit-nav-link" onClick={() => navigate(`/workout-log/${day}`)}><Icon name="plus" size={18} /> Log exercise</button>
          <div className="fit-sidebar-spacer" />
          <div className="fit-sidebar-note"><span className="fit-note-icon"><Icon name="activity" size={18} /></span><strong>Every rep counts.</strong><small>Keep showing up. Track your progress one session at a time.</small></div>
          <button className="fit-nav-link fit-sidebar-logout" onClick={signOut}><Icon name="logout" size={18} /> Sign out</button>
        </aside>
        <main className="fit-main">{children}</main>
      </div>

      <nav className="fit-bottom-nav" aria-label="Mobile navigation">
        <button className={location.pathname === '/home' ? 'active' : ''} onClick={() => navigate('/home')}><Icon name="home" size={20} /><span>Home</span></button>
        <button className={location.pathname.includes('/dashboard/') ? 'active' : ''} onClick={() => navigate(`/dashboard/${day}`)}><Icon name="layers" size={20} /><span>Workouts</span></button>
        <button className="fit-mobile-add" onClick={() => navigate(`/workout-log/${day}`)}><Icon name="plus" size={23} /><span>Log</span></button>
        <button onClick={signOut}><Icon name="logout" size={20} /><span>Sign out</span></button>
      </nav>
    </div>
  )
}
