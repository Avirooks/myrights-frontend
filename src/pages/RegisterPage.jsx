import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabase'

function RegisterPage() {
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const isStrongPassword = (password) => {
    const hasMinimumLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>_\-+=]/.test(password)

    return (
      hasMinimumLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    )
  }

  const handleRegister = async (event) => {
    event.preventDefault()
    setErrorMessage('')
    setSuccessMessage('')

    if (password !== confirmPassword) {
  setErrorMessage('הסיסמה ואימות הסיסמה אינם תואמים.')
  return
}

    if (!isStrongPassword(password)) {
      setErrorMessage(
        'הסיסמה חייבת לכלול לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד.'
      )
      return
    }

    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    setLoading(false)

    if (error) {
      setErrorMessage('לא הצלחנו ליצור משתמש. בדוק את הפרטים ונסה שוב.')
      return
    }

    setSuccessMessage('המשתמש נוצר בהצלחה. מעביר אותך להתחברות...')

    setTimeout(() => {
      navigate('/login')
    }, 1200)
  }

  return (
    <div className="app-page">
      <Navbar />

      <main className="auth-page">
        <section className="auth-card">
          <h1>הרשמה ל־MyRights</h1>

          <p>
            צור משתמש כדי לשמור שאלון, לראות זכויות מותאמות ולעקוב אחרי ההתקדמות.
          </p>

          <form onSubmit={handleRegister} className="auth-form">
            <label>
              שם מלא
              <input
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="שם מלא"
                required
              />
            </label>

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
                placeholder="לפחות 8 תווים, אותיות, מספר ותו מיוחד"
                minLength="8"
                required
              />
            </label>

            <label>
  אימות סיסמה
  <input
    type="password"
    value={confirmPassword}
    onChange={(event) => setConfirmPassword(event.target.value)}
    placeholder="הכנס שוב את הסיסמה"
    minLength="8"
    required
  />
</label>

            <div className="password-hint">
              הסיסמה חייבת לכלול: לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד.
            </div>

            {errorMessage && <div className="auth-error">{errorMessage}</div>}
            {successMessage && <div className="auth-success">{successMessage}</div>}

            <button type="submit" className="primary-button" disabled={loading}>
              {loading ? 'יוצר משתמש...' : 'הרשמה'}
            </button>
          </form>

          <div className="auth-footer">
            כבר יש לך משתמש? <Link to="/login">להתחברות</Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default RegisterPage