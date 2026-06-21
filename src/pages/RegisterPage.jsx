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
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [userAlreadyExists, setUserAlreadyExists] = useState(false)
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
    setUserAlreadyExists(false)

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
      const message = error.message?.toLowerCase() || ''

      if (
        message.includes('already registered') ||
        message.includes('already exists') ||
        message.includes('user already')
      ) {
        setUserAlreadyExists(true)
        setErrorMessage('משתמש עם כתובת המייל הזו כבר קיים. ניתן להתחבר במקום להירשם מחדש.')
        return
      }

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
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="לפחות 8 תווים, אותיות, מספר ותו מיוחד"
                  minLength="8"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'הסתרת סיסמה' : 'הצגת סיסמה'}
                >
                  {showPassword ? '🙈' : '👁'}
                </button>
              </div>
            </label>

            <label>
              אימות סיסמה
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="הכנס שוב את הסיסמה"
                  minLength="8"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  aria-label={showConfirmPassword ? 'הסתרת סיסמה' : 'הצגת סיסמה'}
                >
                  {showConfirmPassword ? '🙈' : '👁'}
                </button>
              </div>
            </label>

            <div className="password-hint">
              הסיסמה חייבת לכלול: לפחות 8 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד.
            </div>

            {errorMessage && (
              <div className="auth-error">
                {errorMessage}

                {userAlreadyExists && (
                  <div className="auth-error-action">
                    <Link to="/login">מעבר להתחברות</Link>
                  </div>
                )}
              </div>
            )}

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