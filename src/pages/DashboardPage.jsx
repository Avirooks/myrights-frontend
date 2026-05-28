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
  if (progressStatus === 'ממתין' || progressStatus === 'לבדיקה') return 'warning'
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

      <main>
        <section
          style={{
            backgroundColor: 'var(--color-secondary)',
            padding: 'var(--spacing-xl) 0',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="container">
            <h1
              style={{
                margin: 0,
                fontSize: 'var(--font-size-3xl)',
                fontWeight: 700,
                lineHeight: 1.2,
                marginBottom: 'var(--spacing-md)',
                color: 'var(--color-primary)',
              }}
            >
              זכויות מותאמות לכם
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
              להלן רשימת זכויות והטבות שעשויות להתאים לפי הפרטים שמילאתם בשאלון. 
              כל זכות מלווה בפרטים מלאים וצעדים ברורים למימוש.
            </p>
          </div>
        </section>

        <section className="container section">
          <div className="dashboard-layout">
            {/* Mobile checklist toggle button */}
            <div className="mobile-checklist-toggle" style={{ width: '100%' }}>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setChecklistOpen((s) => !s)}
                aria-expanded={checklistOpen}
                aria-controls="mobile-checklist"
                style={{ width: '100%', textAlign: 'center' }}
              >
                {checklistOpen ? '🔼 הסתר צ׳קליסט' : '▶ הצג צ׳קליסט מימוש'}
              </Button>
            </div>

            {/* Rights Cards */}
            <section
              style={{
                display: 'grid',
                gap: 'var(--spacing-lg)',
              }}
            >
              {rightsData.map((right) => (
                <Card key={right.id}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)', textAlign: 'right' }}>
                    {/* Title and Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-md)', flexWrap: 'wrap', alignItems: 'flex-start' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <h2 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 600, color: 'var(--color-text)' }}>
                          {right.title}
                        </h2>
                        <p style={{ margin: 'var(--spacing-xs) 0 0', color: '#5F6B72', fontSize: 'var(--font-size-sm)' }}>
                          {right.shortDescription}
                        </p>
                      </div>
                      <StatusBadge variant={getBadgeVariant(right.progressStatus)}>
                        {right.progressStatus}
                      </StatusBadge>
                    </div>

                    {/* Status Information */}
                    <div
                      style={{
                        display: 'grid',
                        gap: 'var(--spacing-sm)',
                        padding: 'var(--spacing-md)',
                        backgroundColor: 'var(--color-secondary)',
                        borderRadius: 'var(--radius)',
                      }}
                    >
                      <div>
                        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: '#5F6B72', fontWeight: 500 }}>
                          סטטוס זכאות
                        </p>
                        <p style={{ margin: 'var(--spacing-xs) 0 0', color: 'var(--color-text)', fontWeight: 600 }}>
                          {right.eligibilityStatus}
                        </p>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: '#5F6B72', fontWeight: 500 }}>
                          סטטוס תהליך
                        </p>
                        <p style={{ margin: 'var(--spacing-xs) 0 0', color: 'var(--color-text)', fontWeight: 600 }}>
                          {right.progressStatus}
                        </p>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: '#5F6B72', fontWeight: 500 }}>
                          צעדים הבאים
                        </p>
                        <p style={{ margin: 'var(--spacing-xs) 0 0', color: 'var(--color-text)' }}>
                          {right.nextAction}
                        </p>
                      </div>
                    </div>

                    {/* More Info Button */}
                    <div style={{ display: 'flex', justifyContent: 'flex-start', paddingTop: 'var(--spacing-sm)' }}>
                      <Link to={`/right/${right.id}`} style={{ textDecoration: 'none' }}>
                        <Button type="button" variant="primary">
                          לפרטים נוספים →
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </section>

            {/* Desktop Checklist */}
            <div className="desktop-checklist">
              <RightsChecklist />
            </div>

            {/* Mobile Checklist */}
            {checklistOpen && (
              <div id="mobile-checklist" className="mobile-checklist">
                <RightsChecklist id="mobile-checklist-content" variant="mobile" />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage
