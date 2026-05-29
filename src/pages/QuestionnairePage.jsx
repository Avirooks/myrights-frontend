import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

function QuestionnairePage() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/dashboard')
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
                      placeholder="לדוגמה: 72"
                      required
                    />
                  </div>

                  <div className="questionnaire-form-group">
                    <label htmlFor="maritalStatus">מצב משפחתי</label>
                    <select id="maritalStatus" name="maritalStatus" required>
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
                    <select id="income" name="income" required>
                      <option value="">בחר תשובה</option>
                      <option value="yes">כן</option>
                      <option value="no">לא</option>
                    </select>
                  </div>

                  <div className="questionnaire-form-group">
                    <label htmlFor="dailyHelp">האם ההורה זקוק לעזרה יומיומית?</label>
                    <select id="dailyHelp" name="dailyHelp" required>
                      <option value="">בחר תשובה</option>
                      <option value="yes">כן</option>
                      <option value="no">לא</option>
                    </select>
                  </div>
                </div>
              </section>

              <div className="questionnaire-actions">
                <button type="submit" className="primary questionnaire-submit-btn">
                  הצג זכויות מותאמות
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