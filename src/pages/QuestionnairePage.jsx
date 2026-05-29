import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabase'

function QuestionnairePage() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    parentName: '',
    age: '',
    maritalStatus: '',
    income: '',
    dailyHelp: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError) {
        throw userError
      }

      if (!user) {
        navigate('/login')
        return
      }

      const questionnaireData = {
        user_id: user.id,
        parent_name: formData.parentName.trim(),
        age: Number(formData.age),
        marital_status: formData.maritalStatus,
        has_extra_income: formData.income === 'yes',
        needs_daily_help: formData.dailyHelp === 'yes',
      }

      const { error: insertError } = await supabase
        .from('questionnaire_answers')
        .insert(questionnaireData)

      if (insertError) {
        throw insertError
      }

      navigate('/dashboard')
    } catch (error) {
      console.error('Questionnaire submit error:', error)
      setErrorMessage('אירעה שגיאה בשמירת השאלון. נסה שוב בעוד רגע.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Navbar
        title="MyRights"
        links={[
          { label: 'בית', href: '/' },
          { label: 'שאלון', href: '/questionnaire' },
          { label: 'זכויות מותאמות', href: '/dashboard' },
        ]}
      />

      <main className="questionnaire-page">
        <section className="questionnaire-hero">
          <div className="container">
            <button
              type="button"
              className="questionnaire-back-btn"
              onClick={() => navigate('/')}
            >
              חזרה לדף הבית
            </button>

            <h1>שאלון בדיקת זכויות</h1>

            <p>
              מלאו מספר פרטים בסיסיים על ההורה כדי לקבל התאמה ראשונית של זכויות,
              הטבות וקצבאות שעשויות להתאים.
            </p>
          </div>
        </section>

        <section className="questionnaire-main">
          <div className="container questionnaire-container">
            <form className="questionnaire-card" onSubmit={handleSubmit}>
              <section className="questionnaire-form-section">
                <h2>פרטי ההורה</h2>

                <div className="questionnaire-form-grid">
                  <div className="questionnaire-form-group">
                    <label htmlFor="parentName">שם ההורה</label>
                    <input
                      id="parentName"
                      name="parentName"
                      type="text"
                      value={formData.parentName}
                      onChange={handleChange}
                      placeholder="לדוגמה: דויד"
                      required
                    />
                  </div>

                  <div className="questionnaire-form-group">
                    <label htmlFor="age">גיל</label>
                    <input
                      id="age"
                      name="age"
                      type="number"
                      min="60"
                      max="120"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="לדוגמה: 72"
                      required
                    />
                  </div>

                  <div className="questionnaire-form-group">
                    <label htmlFor="maritalStatus">מצב משפחתי</label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      required
                    >
                      <option value="">בחר מצב משפחתי</option>
                      <option value="married">נשוי/ה</option>
                      <option value="widowed">אלמן/ה</option>
                      <option value="divorced">גרוש/ה</option>
                      <option value="single">רווק/ה</option>
                    </select>
                  </div>
                </div>
              </section>

              <section className="questionnaire-form-section">
                <h2>מצב כלכלי ותפקודי</h2>

                <div className="questionnaire-form-grid two-columns">
                  <div className="questionnaire-form-group">
                    <label htmlFor="income">האם יש להורה הכנסה נוספת?</label>
                    <select
                      id="income"
                      name="income"
                      value={formData.income}
                      onChange={handleChange}
                      required
                    >
                      <option value="">בחר תשובה</option>
                      <option value="yes">כן</option>
                      <option value="no">לא</option>
                    </select>
                  </div>

                  <div className="questionnaire-form-group">
                    <label htmlFor="dailyHelp">האם ההורה זקוק לעזרה יומיומית?</label>
                    <select
                      id="dailyHelp"
                      name="dailyHelp"
                      value={formData.dailyHelp}
                      onChange={handleChange}
                      required
                    >
                      <option value="">בחר תשובה</option>
                      <option value="yes">כן</option>
                      <option value="no">לא</option>
                    </select>
                  </div>
                </div>
              </section>

              {errorMessage && (
                <p className="form-error-message">{errorMessage}</p>
              )}

              <div className="questionnaire-actions">
                <button
                  type="submit"
                  className="primary questionnaire-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'שומר נתונים...' : 'הצג זכויות מותאמות'}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

export default QuestionnairePage