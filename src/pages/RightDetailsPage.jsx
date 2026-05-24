import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import { rightsData } from '../data/rightsData'

function getBadgeVariant(progressStatus) {
  if (progressStatus === 'הושלם') return 'success'
  if (progressStatus === 'ממתין' || progressStatus === 'לבדיקה') return 'info'
  return 'info'
}

function RightDetailsPage() {
  const right = rightsData[0]

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
        <section style={{ textAlign: 'right', color: 'var(--color-text)', marginBottom: 'var(--spacing-xl)' }}>
          <h1
            style={{
              margin: 0,
              fontSize: '2rem',
              lineHeight: 1.2,
              marginBottom: 'var(--spacing-md)',
            }}
          >
            {right.title}
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: 'var(--font-size-base)',
              color: '#5F6B72',
            }}
          >
            {right.shortDescription}
          </p>
        </section>

        <div style={{ display: 'grid', gap: 'var(--spacing-lg)', maxWidth: '800px' }}>
          <Card>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)', textAlign: 'right' }}>
              <div style={{ display: 'grid', gap: 'var(--spacing-md)' }}>
                {right.eligibilityStatus && (
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#5F6B72', fontWeight: 600 }}>סטטוס זכאות</p>
                    <p style={{ margin: 'var(--spacing-xs) 0 0', fontSize: '1.1rem', color: 'var(--color-text)', fontWeight: 700 }}>
                      {right.eligibilityStatus}
                    </p>
                  </div>
                )}

                {right.progressStatus && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--spacing-md)' }}>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontSize: '0.9rem', color: '#5F6B72', fontWeight: 600 }}>סטטוס תהליך</p>
                      <p style={{ margin: 'var(--spacing-xs) 0 0', fontSize: '1.1rem', color: 'var(--color-text)', fontWeight: 700 }}>
                        {right.progressStatus}
                      </p>
                    </div>
                    <StatusBadge variant={getBadgeVariant(right.progressStatus)}>{right.progressStatus}</StatusBadge>
                  </div>
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)' }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>תיאור</h2>
                <p style={{ margin: 0, fontSize: 'var(--font-size-base)', color: '#5F6B72', lineHeight: 1.6 }}>
                  {right.fullDescription}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)' }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>צעדים הנדרשים</h2>
                <ol style={{ margin: 0, paddingRight: 'var(--spacing-lg)', textAlign: 'right' }}>
                  {right.actionSteps.map((step, index) => (
                    <li
                      key={index}
                      style={{
                        marginBottom: 'var(--spacing-sm)',
                        fontSize: 'var(--font-size-base)',
                        color: '#5F6B72',
                        lineHeight: 1.6,
                      }}
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-md)' }}>
                <h2 style={{ margin: 0, fontSize: '1.25rem', marginBottom: 'var(--spacing-md)' }}>מקור רשמי</h2>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#5F6B72', marginBottom: 'var(--spacing-md)' }}>
                  {right.officialSource}
                </p>
                {right.officialUrl && (
                  <a
                    href={right.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 'var(--spacing-sm) var(--spacing-lg)',
                      backgroundColor: 'var(--color-primary)',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: 'var(--border-radius)',
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = '#163D5F')}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = 'var(--color-primary)')}
                  >
                    מעבר למקור הרשמי
                  </a>
                )}
              </div>
            </div>
          </Card>

          <div style={{ display: 'flex', justifyContent: 'flex-start', gap: 'var(--spacing-md)' }}>
            <Button>חזרה לרשימת הזכויות</Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RightDetailsPage
