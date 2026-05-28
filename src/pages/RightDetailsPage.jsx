import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import { rightsData } from '../data/rightsData'

function getBadgeVariant(progressStatus) {
  if (progressStatus === 'הושלם') return 'success'
  if (progressStatus === 'ממתין' || progressStatus === 'לבדיקה') return 'warning'
  return 'info'
}

function RightDetailsPage() {
  const { id } = useParams()
  const right = rightsData.find((item) => item.id === id)

  if (!right) {
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
        <main className="container section" style={{ textAlign: 'right' }}>
          <h1 style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-error)' }}>
            הזכות לא נמצאה
          </h1>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <Button variant="primary">חזור לרשימת הזכויות</Button>
          </Link>
        </main>
      </div>
    )
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

      <main>
        {/* Hero Section */}
        <section
          style={{
            backgroundColor: 'var(--color-primary)',
            color: '#FFFFFF',
            padding: 'var(--spacing-lg) 0',
            textAlign: 'right',
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
              }}
            >
              {right.title}
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 'var(--font-size-base)',
                lineHeight: 1.6,
                opacity: 0.95,
              }}
            >
              {right.shortDescription}
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container section">
          <div style={{ maxWidth: '900px' }}>
            {/* Status Cards */}
            <div
              style={{
                display: 'grid',
                gap: 'var(--spacing-md)',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                marginBottom: 'var(--spacing-xl)',
              }}
            >
              {/* Eligibility Status */}
              <Card>
                <div style={{ textAlign: 'right' }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'var(--font-size-sm)',
                      color: '#5F6B72',
                      fontWeight: 500,
                      marginBottom: 'var(--spacing-sm)',
                    }}
                  >
                    סטטוס זכאות
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'var(--font-size-lg)',
                      fontWeight: 700,
                      color: 'var(--color-primary)',
                    }}
                  >
                    {right.eligibilityStatus}
                  </p>
                </div>
              </Card>

              {/* Progress Status */}
              <Card>
                <div style={{ textAlign: 'right' }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'var(--font-size-sm)',
                      color: '#5F6B72',
                      fontWeight: 500,
                      marginBottom: 'var(--spacing-sm)',
                    }}
                  >
                    סטטוס תהליך
                  </p>
                  <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <StatusBadge variant={getBadgeVariant(right.progressStatus)}>
                      {right.progressStatus}
                    </StatusBadge>
                  </div>
                </div>
              </Card>

              {/* Next Action */}
              <Card>
                <div style={{ textAlign: 'right' }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'var(--font-size-sm)',
                      color: '#5F6B72',
                      fontWeight: 500,
                      marginBottom: 'var(--spacing-sm)',
                    }}
                  >
                    צעדים הבאים
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 'var(--font-size-base)',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                    }}
                  >
                    {right.nextAction}
                  </p>
                </div>
              </Card>
            </div>

            {/* Description Section */}
            <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
              <div style={{ textAlign: 'right' }}>
                <h2
                  style={{
                    margin: 0,
                    marginBottom: 'var(--spacing-md)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                  }}
                >
                  תקציר הזכות
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: 'var(--font-size-base)',
                    color: '#5F6B72',
                    lineHeight: 1.7,
                  }}
                >
                  {right.fullDescription}
                </p>
              </div>
            </Card>

            {/* Action Steps Section */}
            <Card style={{ marginBottom: 'var(--spacing-lg)' }}>
              <div style={{ textAlign: 'right' }}>
                <h2
                  style={{
                    margin: 0,
                    marginBottom: 'var(--spacing-lg)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                  }}
                >
                  צעדים למימוש
                </h2>
                <ol
                  style={{
                    margin: 0,
                    paddingRight: 'var(--spacing-lg)',
                    display: 'grid',
                    gap: 'var(--spacing-md)',
                  }}
                >
                  {right.actionSteps.map((step, index) => (
                    <li
                      key={index}
                      style={{
                        fontSize: 'var(--font-size-base)',
                        color: '#5F6B72',
                        lineHeight: 1.6,
                        paddingRight: 'var(--spacing-md)',
                      }}
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            </Card>

            {/* Official Source Section */}
            <Card style={{ marginBottom: 'var(--spacing-xl)', backgroundColor: 'var(--color-secondary)' }}>
              <div style={{ textAlign: 'right' }}>
                <h2
                  style={{
                    margin: 0,
                    marginBottom: 'var(--spacing-md)',
                    fontSize: 'var(--font-size-lg)',
                    fontWeight: 600,
                    color: 'var(--color-primary)',
                  }}
                >
                  מקור רשמי
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: 'var(--font-size-sm)',
                    color: '#5F6B72',
                    marginBottom: 'var(--spacing-md)',
                  }}
                >
                  {right.officialSource}
                </p>
                {right.officialUrl && (
                  <a
                    href={right.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <Button variant="primary">
                      עבור לאתר הרשמי ↗
                    </Button>
                  </a>
                )}
              </div>
            </Card>

            {/* Back Navigation */}
            <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'flex-start' }}>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <Button variant="secondary">
                  ← חזור לרשימת הזכויות
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RightDetailsPage
