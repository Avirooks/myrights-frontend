import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import RightsChecklist from '../components/RightsChecklist'
import { rightsData } from '../data/rightsData'

function getBadgeVariant(progressStatus) {
  if (progressStatus === 'הושלם') return 'success'
  if (progressStatus === 'ממתין' || progressStatus === 'לבדיקה') return 'info'
  return 'info'
}

function DashboardPage() {
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
            זכויות מותאמות
          </h1>
          <p
            style={{
              margin: 0,
              marginBottom: 'var(--spacing-lg)',
              fontSize: 'var(--font-size-base)',
              color: '#5F6B72',
              maxWidth: '760px',
            }}
          >
            להלן רשימת זכויות והטבות שעשויות להתאים לפי הפרטים שמולאו בשאלון.
          </p>
        </section>

        {/* בעתיד הצ׳קליסט יתעדכן לפי הנתונים שהמשתמש ימלא בשאלון. */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 320px',
            gap: 'var(--spacing-lg)',
            alignItems: 'start',
          }}
        >
          <section
            style={{
              display: 'grid',
              gap: 'var(--spacing-lg)',
            }}
          >
            {rightsData.map((right) => (
            <Card key={right.id}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-md)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                  <div style={{ textAlign: 'right' }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>{right.title}</h2>
                    <p style={{ margin: '0.5rem 0 0', color: '#5F6B72' }}>{right.shortDescription}</p>
                  </div>
                  <StatusBadge variant={getBadgeVariant(right.progressStatus)}>{right.progressStatus}</StatusBadge>
                </div>

                <div style={{ display: 'grid', gap: 'var(--spacing-xs)' }}>
                  <p style={{ margin: 0, color: '#263238', fontWeight: 700 }}>סטטוס זכאות: {right.eligibilityStatus}</p>
                  <p style={{ margin: 0, color: '#263238', fontWeight: 700 }}>סטטוס תהליך: {right.progressStatus}</p>
                  <p style={{ margin: 0, color: '#5F6B72' }}>צעדים הבאים: {right.nextAction}</p>
                  <p style={{ margin: 0, color: '#5F6B72', fontSize: '0.95rem' }}>מקור רשמי: {right.officialSource}</p>
                </div>

                <div style={{ marginTop: 'var(--spacing-md)', display: 'flex', justifyContent: 'flex-start' }}>
                  <Button type="button">לפרטים נוספים</Button>
                </div>
              </div>
            </Card>
          ))}
          </section>

          <RightsChecklist />
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
