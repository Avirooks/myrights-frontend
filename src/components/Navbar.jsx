import { NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

function Navbar({ title = 'MyRights', links = [] }) {
  const filteredLinks = links.filter(
    (link) => link.label !== 'שאלון' && link.label !== 'Questionnaire'
  )

  const [accessOpen, setAccessOpen] = useState(false)
  const accessRef = useRef(null)

  useEffect(() => {
    function onDocClick(e) {
      if (!accessRef.current) return
      if (!accessRef.current.contains(e.target)) setAccessOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

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

          <div className="navbar-actions">
            <div className="navbar-left">
              <div className="accessibility">
                <div ref={accessRef}>
                <button
                  className="accessibility-btn"
                  aria-haspopup="true"
                  aria-expanded={accessOpen}
                  aria-controls="accessibility-menu"
                  onClick={(e) => {
                    e.stopPropagation()
                    setAccessOpen((v) => !v)
                  }}
                >
                  נגישות
                </button>

                <div
                  id="accessibility-menu"
                  className={"accessibility-menu" + (accessOpen ? ' open' : '')}
                  role="menu"
                  aria-label="תפריט נגישות"
                >
                  <button className="accessibility-item" onClick={() => {
                    document.body.classList.remove('accessibility-text-small')
                    document.body.classList.add('accessibility-text-large')
                    setAccessOpen(false)
                  }}>הגדלת טקסט</button>

                  <button className="accessibility-item" onClick={() => {
                    document.body.classList.remove('accessibility-text-large')
                    document.body.classList.add('accessibility-text-small')
                    setAccessOpen(false)
                  }}>הקטנת טקסט</button>

                  <button className="accessibility-item" onClick={() => {
                    document.body.classList.toggle('accessibility-high-contrast')
                    setAccessOpen(false)
                  }}>ניגודיות צבעים</button>

                  <button className="accessibility-item" onClick={() => {
                    document.body.classList.toggle('accessibility-grayscale')
                    setAccessOpen(false)
                  }}>גווני אפור</button>

                  <button className="accessibility-item" onClick={() => {
                    document.body.classList.toggle('accessibility-highlight-links')
                    setAccessOpen(false)
                  }}>הדגשת קישורים</button>

                  <button className="accessibility-item reset" onClick={() => {
                    document.body.classList.remove('accessibility-text-large', 'accessibility-text-small', 'accessibility-high-contrast', 'accessibility-grayscale', 'accessibility-highlight-links')
                    setAccessOpen(false)
                  }}>איפוס הגדרות</button>
                </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Navbar