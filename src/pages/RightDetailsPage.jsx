import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
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
           { label: 'זכויות מותאמות', href: '/dashboard' }
          ]}
        />

        <main className="right-details-page">
          <section className="right-details-hero">
            <div className="container">
              <h1>הזכות לא נמצאה</h1>
              <p>לא הצלחנו למצוא את פרטי הזכות שביקשת.</p>

              <Link to="/dashboard" className="right-details-link">
                <Button variant="primary">חזרה לרשימת הזכויות</Button>
              </Link>
            </div>
          </section>
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
          { label: 'זכויות מותאמות', href: '/dashboard' }
        ]}
      />

      <main className="right-details-page">
        <section className="right-details-hero">
          <div className="container">
            <Link to="/dashboard" className="right-details-back-btn">
              חזרה לדשבורד
            </Link>

            <h1>{right.title}</h1>
            <p>{right.shortDescription}</p>
          </div>
        </section>

        <section className="right-details-main">
          <div className="container right-details-container">
            <div className="right-details-status-grid">
              <div className="right-details-status-card">
                <span>סטטוס זכאות</span>
                <strong>{right.eligibilityStatus}</strong>
              </div>

              <div className="right-details-status-card">
                <span>סטטוס תהליך</span>
                <StatusBadge variant={getBadgeVariant(right.progressStatus)}>
                  {right.progressStatus}
                </StatusBadge>
              </div>

              <div className="right-details-status-card">
                <span>צעדים הבאים</span>
                <p>{right.nextAction}</p>
              </div>
            </div>

            <div className="right-details-card">
              <h2>תקציר הזכות</h2>
              <p>{right.fullDescription}</p>
            </div>

            <div className="right-details-card">
              <h2>צעדים למימוש</h2>

              <ol className="right-details-steps">
                {right.actionSteps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div className="right-details-card right-details-source-card">
              <h2>מקור רשמי</h2>
              <p>{right.officialSource}</p>

              {right.officialUrl && (
                <a
                  href={right.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="right-details-link"
                >
                  <Button variant="primary">מעבר לאתר הרשמי</Button>
                </a>
              )}
            </div>

            <div className="right-details-actions">
              <Link to="/dashboard" className="right-details-link">
                <Button variant="secondary">חזרה לרשימת הזכויות</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default RightDetailsPage