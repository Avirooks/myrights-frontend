import { NavLink, useNavigate } from 'react-router-dom'

function Navbar({ title = 'MyRights', links = [], showCta = true }) {
  const navigate = useNavigate()

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand */}
          <div className="navbar-brand">
            <h1>{title}</h1>
          </div>

          {/* Navigation Links */}
          {links.length > 0 && (
            <nav aria-label="ניווט ראשי">
              <ul className="navbar-nav">
                {links.map((link) => (
                  <li key={link.label}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          {/* CTA Button */}
          {showCta && (
            <div className="navbar-cta">
              <button
                className="primary"
                onClick={() => navigate('/questionnaire')}
                style={{ fontSize: 'var(--font-size-base)', padding: '10px 20px' }}
              >
                התחלת בדיקה
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
