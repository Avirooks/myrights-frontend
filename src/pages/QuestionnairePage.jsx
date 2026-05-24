import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Card from '../components/Card'

function QuestionnairePage() {
  return (
    <div>
      <Navbar
        title="MyRights"
        links={[
          { label: 'בית', href: '#' },
          { label: 'שאלון', href: '#' },
          { label: 'Dashboard', href: '#' },
        ]}
      />

      <main className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
        <section style={{ textAlign: 'right', color: 'var(--color-text)' }}>
          <h1
            style={{
              margin: 0,
              fontSize: '2rem',
              lineHeight: 1.2,
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            שאלון בדיקת זכויות
          </h1>
          <p
            style={{
              margin: 0,
              marginBottom: 'var(--spacing-xl)',
              fontSize: 'var(--font-size-base)',
              color: '#5F6B72',
              maxWidth: '760px',
            }}
          >
            מלאו מספר פרטים בסיסיים על ההורה המבוגר כדי לקבל התאמה ראשונית של זכויות והטבות.
          </p>
        </section>

        <Card>
          <form style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
            <div style={{ display: 'grid', gap: 'var(--spacing-xs)' }}>
              <label htmlFor="age">גיל ההורה</label>
              <input id="age" type="number" placeholder="הכנס גיל" />
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-xs)' }}>
              <label htmlFor="family-status">מצב משפחתי</label>
              <select id="family-status">
                <option>רווק/ה</option>
                <option>נשוי/ה</option>
                <option>גרוש/ה</option>
                <option>אלמן/ה</option>
              </select>
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-xs)' }}>
              <label htmlFor="senior-pension">האם ההורה מקבל קצבת אזרח ותיק?</label>
              <select id="senior-pension">
                <option>כן</option>
                <option>לא</option>
              </select>
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-xs)' }}>
              <label htmlFor="daily-help">האם ההורה זקוק לעזרה יומיומית בבית?</label>
              <select id="daily-help">
                <option>כן</option>
                <option>לא</option>
              </select>
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-xs)' }}>
              <label htmlFor="additional-income">האם יש להורה הכנסה נוספת?</label>
              <select id="additional-income">
                <option>כן</option>
                <option>לא</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--spacing-lg)' }}>
              <Button type="button">הצג זכויות מתאימות</Button>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}

export default QuestionnairePage
