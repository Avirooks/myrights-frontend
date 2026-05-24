import { Link } from 'react-router-dom'
import { useState } from 'react'
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
  const [checklistOpen, setChecklistOpen] = useState(false)
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
        <div className="dashboard-layout">
        
          {/* Mobile toggle button - visible only on small screens via CSS */}
          <div className="mobile-checklist-toggle" style={{ width: '100%' }}>
            <button
              type="button"
              className="secondary"
              onClick={() => setChecklistOpen((s) => !s)}
              aria-expanded={checklistOpen}
              aria-controls="mobile-checklist"
              style={{ width: '100%', textAlign: 'center' }}
            >
              צ׳קליסט מימוש זכויות
            </button>
          </div>

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
                  <Link to={`/right/${right.id}`} style={{ textDecoration: 'none' }}>
                    <Button type="button">לפרטים נוספים</Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
          </section>

          <div className="desktop-checklist">
  <RightsChecklist />
</div>

{checklistOpen && (
  <div id="mobile-checklist" className="mobile-checklist">
    <RightsChecklist id="mobile-checklist-content" variant="mobile" />
  </div>
)}
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
