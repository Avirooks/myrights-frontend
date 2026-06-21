import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabase'

function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    setLoading(false)

    if (error) {
      setErrorMessage('המייל או הסיסמה אינם נכונים')
      return
    }

 navigate('/home')
  }

  return (
    <div className="app-page">
      <Navbar />

      <main className="auth-page">
        <section className="auth-card">
          <h1>התחברות ל־MyRights</h1>

          <p>
            התחבר כדי לראות זכויות מותאמות, לשמור התקדמות ולעקוב אחרי פעולות עבור ההורה.
          </p>

          <form onSubmit={handleLogin} className="auth-form">
            <label>
              מייל
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="example@email.com"
                required
              />
            </label>

            <label>
              סיסמה
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="הכנס סיסמה"
                required
              />
            </label>

            {errorMessage && <div className="auth-error">{errorMessage}</div>}

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'מתחבר...' : 'התחברות'}
            </button>
          </form>

          <div className="auth-footer">
            עדיין אין לך משתמש? <Link to="/register">להרשמה</Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default LoginPage