import { NavLink } from 'react-router-dom'

function Navbar({ title = 'MyRights', links = [] }) {
  const filteredLinks = links.filter(
    (link) => link.label !== 'שאלון' && link.label !== 'Questionnaire'
  )

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner">
          
          <div className="navbar-brand">
            <h1>{title}</h1>
            <p className="navbar-slogan">הדרך הפשוטה לעזור להורים</p>
          </div>

          {filteredLinks.length > 0 && (
            <nav aria-label="ניווט ראשי" className="navbar-center">
              <ul className="navbar-nav">
                {filteredLinks.map((link) => (
                  <li key={link.label}>
                    <NavLink
                      to={link.href}
                      className={({ isActive }) =>
                        isActive ? 'navbar-link active' : 'navbar-link'
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <div className="navbar-actions-empty" aria-hidden="true" />

        </div>
      </div>
    </header>
  )
}

export default Navbar