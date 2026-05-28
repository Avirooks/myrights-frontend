import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Card from '../components/Card'

function QuestionnairePage() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div>
      <Navbar
        title="MyRights"
        links={[
          { label: 'בית', href: '/' },
          { label: 'שאלון', href: '/questionnaire' },
          { label: 'Dashboard', href: '/dashboard' },
        ]}
      />

      <main className="container section">
        <section style={{ textAlign: 'right', color: 'var(--color-text)', marginBottom: 'var(--spacing-lg)' }}>
          <h1
            style={{
              margin: 0,
              fontSize: 'var(--font-size-3xl)',
              fontWeight: 700,
              lineHeight: 1.2,
              marginBottom: 'var(--spacing-md)',
            }}
          >
            שאלון בדיקת זכויות
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 'var(--font-size-base)',
              color: '#5F6B72',
              maxWidth: '760px',
              lineHeight: 1.6,
            }}
          >
            מלאו מספר פרטים בסיסיים על ההורה המבוגר כדי לקבל התאמה ראשונית של זכויות והטבות.
            כל השדות הם חסויים ומשמשים לחישוב זכויות בלבד.
          </p>
        </section>

        <Card style={{ maxWidth: '800px', margin: '0 auto' }}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
            
            {/* פרטי ההורה */}
            <section style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-lg)' }}>
              <h2
                style={{
                  margin: 0,
                  marginBottom: 'var(--spacing-lg)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                }}
              >
                פרטי ההורה
              </h2>

              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                <div>
                  <label htmlFor="age" style={{ fontWeight: 500 }}>
                    גיל ההורה *
                  </label>
                  <input
                    id="age"
                    type="number"
                    min="60"
                    max="120"
                    placeholder="הכנס גיל"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="family-status" style={{ fontWeight: 500 }}>
                    מצב משפחתי *
                  </label>
                  <select id="family-status" required>
                    <option value="">בחר מצב משפחתי</option>
                    <option value="single">רווק/ה</option>
                    <option value="married">נשוי/ה</option>
                    <option value="divorced">גרוש/ה</option>
                    <option value="widowed">אלמן/ה</option>
                  </select>
                </div>
              </div>
            </section>

            {/* מצב כלכלי */}
            <section style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-lg)' }}>
              <h2
                style={{
                  margin: 0,
                  marginBottom: 'var(--spacing-lg)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                }}
              >
                מצב כלכלי
              </h2>

              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                <div>
                  <label htmlFor="additional-income" style={{ fontWeight: 500 }}>
                    האם יש להורה הכנסה נוספת? *
                  </label>
                  <select id="additional-income" required>
                    <option value="">בחר</option>
                    <option value="yes">כן</option>
                    <option value="no">לא</option>
                  </select>
                </div>
              </div>
            </section>

            {/* מצב תפקודי */}
            <section style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: 'var(--spacing-lg)' }}>
              <h2
                style={{
                  margin: 0,
                  marginBottom: 'var(--spacing-lg)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                }}
              >
                מצב תפקודי
              </h2>

              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                <div>
                  <label htmlFor="daily-help" style={{ fontWeight: 500 }}>
                    האם ההורה זקוק לעזרה יומיומית בבית? *
                  </label>
                  <select id="daily-help" required>
                    <option value="">בחר</option>
                    <option value="yes">כן</option>
                    <option value="no">לא</option>
                  </select>
                </div>
              </div>
            </section>

            {/* קצבאות קיימות */}
            <section>
              <h2
                style={{
                  margin: 0,
                  marginBottom: 'var(--spacing-lg)',
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 600,
                  color: 'var(--color-primary)',
                }}
              >
                קצבאות קיימות
              </h2>

              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                <div>
                  <label htmlFor="senior-pension" style={{ fontWeight: 500 }}>
                    האם ההורה מקבל קצבת אזרח ותיק? *
                  </label>
                  <select id="senior-pension" required>
                    <option value="">בחר</option>
                    <option value="yes">כן</option>
                    <option value="no">לא</option>
                  </select>
                </div>
              </div>
            </section>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--spacing-md)', paddingTop: 'var(--spacing-md)' }}>
              <Button type="button" variant="secondary" onClick={() => navigate('/')}>
                חזור
              </Button>
              <Button type="submit" variant="primary">
                הצג זכויות מתאימות
              </Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}

export default QuestionnairePage
