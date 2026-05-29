import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'

function Navbar({ title = 'MyRights', links = [] }) {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()

  const [accessOpen, setAccessOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('עברית')

  const accessRef = useRef(null)
  const menuRef = useRef(null)

  const defaultLinks = [
    { label: 'בית', href: '/' },
    { label: 'זכויות מותאמות', href: '/dashboard' },
  ]

  const menuLinks = links.length > 0 ? links : defaultLinks

  useEffect(() => {
    function onDocClick(event) {
      if (accessRef.current && !accessRef.current.contains(event.target)) {
        setAccessOpen(false)
      }

      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('click', onDocClick)

    return () => {
      document.removeEventListener('click', onDocClick)
    }
  }, [])

  function resetAccessibility() {
    document.body.classList.remove(
      'accessibility-text-large',
      'accessibility-text-small',
      'accessibility-high-contrast',
      'accessibility-grayscale',
      'accessibility-highlight-links'
    )
  }

  const handleLogout = async () => {
    await signOut()
    setMenuOpen(false)
    navigate('/')
  }

  const languages = [
    { label: 'עברית', value: 'עברית' },
    { label: 'EN', value: 'English' },
    { label: 'RU', value: 'Russian' },
    { label: 'AR', value: 'Arabic' },
  ]

  return (
    <header className="navbar">
      <div className="container">
        <div className="navbar-inner compact-navbar">
          <div className="navbar-brand-menu">
            <Link to="/" className="navbar-brand navbar-brand-link" aria-label="חזרה לדף הבית">
  <h1>{title}</h1>
  <p className="navbar-slogan">הדרך הפשוטה לעזור להורים</p>
</Link>

            <div className="main-menu-wrapper" ref={menuRef}>
              <button
                type="button"
                className="hamburger-btn"
                aria-label="פתיחת תפריט"
                aria-expanded={menuOpen}
                onClick={(event) => {
                  event.stopPropagation()
                  setMenuOpen((value) => !value)
                }}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>

              <div className={`main-menu-dropdown ${menuOpen ? 'open' : ''}`}>
                <nav aria-label="תפריט ראשי">
                  {menuLinks.map((link) => (
                    <NavLink
                      key={link.label}
                      to={link.href}
                      className={({ isActive }) =>
                        isActive ? 'main-menu-link active' : 'main-menu-link'
                      }
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  ))}

                  <div className="main-menu-divider"></div>

                  {!user ? (
                    <>
                      <Link
                        to="/login"
                        className="main-menu-link"
                        onClick={() => setMenuOpen(false)}
                      >
                        התחברות
                      </Link>

                      <Link
                        to="/register"
                        className="main-menu-link primary"
                        onClick={() => setMenuOpen(false)}
                      >
                        הרשמה
                      </Link>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="main-menu-link logout"
                      onClick={handleLogout}
                    >
                      התנתקות
                    </button>
                  )}

                  <div className="main-menu-divider"></div>

                  <button type="button" className="main-menu-link disabled">
                    התחברות מנהל — בהמשך
                  </button>
                </nav>
              </div>
            </div>
          </div>

          <div className="navbar-actions compact-actions">
            <div className="navbar-controls">
              <div className="accessibility" ref={accessRef}>
                <button
  type="button"
  className="accessibility-btn accessibility-icon-btn"
  aria-label="פתיחת תפריט נגישות"
  title="תפריט נגישות"
  aria-haspopup="true"
  aria-expanded={accessOpen}
  aria-controls="accessibility-menu"
  onClick={(event) => {
    event.stopPropagation()
    setAccessOpen((value) => !value)
  }}
>
  <svg
    className="accessibility-icon"
    viewBox="0 0 24 24"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="12" cy="4" r="2" />
    <path d="M4 9h16" />
    <path d="M12 6v14" />
    <path d="M8 20l4-8 4 8" />
  </svg>
</button>

                <div
                  id="accessibility-menu"
                  className={`accessibility-menu ${accessOpen ? 'open' : ''}`}
                  role="menu"
                  aria-label="תפריט נגישות"
                >
                  <button
                    type="button"
                    className="accessibility-item"
                    onClick={() => {
                      document.body.classList.remove('accessibility-text-small')
                      document.body.classList.add('accessibility-text-large')
                      setAccessOpen(false)
                    }}
                  >
                    הגדלת טקסט
                  </button>

                  <button
                    type="button"
                    className="accessibility-item"
                    onClick={() => {
                      document.body.classList.remove('accessibility-text-large')
                      document.body.classList.add('accessibility-text-small')
                      setAccessOpen(false)
                    }}
                  >
                    הקטנת טקסט
                  </button>

                  <button
                    type="button"
                    className="accessibility-item"
                    onClick={() => {
                      document.body.classList.toggle('accessibility-high-contrast')
                      setAccessOpen(false)
                    }}
                  >
                    ניגודיות צבעים
                  </button>

                  <button
                    type="button"
                    className="accessibility-item"
                    onClick={() => {
                      document.body.classList.toggle('accessibility-grayscale')
                      setAccessOpen(false)
                    }}
                  >
                    גווני אפור
                  </button>

                  <button
                    type="button"
                    className="accessibility-item"
                    onClick={() => {
                      document.body.classList.toggle('accessibility-highlight-links')
                      setAccessOpen(false)
                    }}
                  >
                    הדגשת קישורים
                  </button>

                  <button
                    type="button"
                    className="accessibility-item reset"
                    onClick={() => {
                      resetAccessibility()
                      setAccessOpen(false)
                    }}
                  >
                    איפוס הגדרות
                  </button>
                </div>
              </div>

              <div className="language-inline" aria-label="בחירת שפה">
                {languages.map((language, index) => (
                  <span className="language-inline-option" key={language.value}>
                    <button
                      type="button"
                      className={
                        selectedLanguage === language.value
                          ? 'language-inline-btn active'
                          : 'language-inline-btn'
                      }
                      onClick={() => setSelectedLanguage(language.value)}
                    >
                      {language.label}
                    </button>

                    {index < languages.length - 1 && (
                      <span className="language-separator">|</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar