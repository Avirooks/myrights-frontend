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

  const navbarLinks = [
    { label: 'בית', href: '/' },
    { label: 'שאלון', href: '/questionnaire' },
    { label: 'זכויות מותאמות', href: '/dashboard' },
  ]

  if (!right) {
    return (
      <div>
        <Navbar title="MyRights" links={navbarLinks} />

        <main className="right-details-page">
          <section className="right-details-hero">
            <div className="container">
              <Link to="/dashboard" className="right-details-back-btn">
                חזרה לרשימת הזכויות
              </Link>

              <h1>הזכות לא נמצאה</h1>

              <p>
                לא הצלחנו למצוא את פרטי הזכות שביקשת. ייתכן שהקישור אינו תקין
                או שהזכות אינה קיימת ברשימה הנוכחית.
              </p>
            </div>
          </section>

          <section className="right-details-main">
            <div className="container right-details-container">
              <div className="right-details-card">
                <h2>מה אפשר לעשות?</h2>

                <p>
                  ניתן לחזור לרשימת הזכויות המותאמות ולבחור זכות אחרת מתוך
                  הרשימה.
                </p>

                <div className="right-details-actions">
                  <Link to="/dashboard" className="right-details-link">
                    <Button type="button" variant="primary">
                      חזרה לרשימת הזכויות
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    )
  }

  return (
    <div>
      <Navbar title="MyRights" links={navbarLinks} />

      <main className="right-details-page">
        <section className="right-details-hero">
          <div className="container">
            <Link to="/dashboard" className="right-details-back-btn">
              חזרה לרשימת הזכויות
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
                <span>הצעד הבא</span>
                <p>{right.nextAction}</p>
              </div>
            </div>

            <div className="right-details-card">
              <h2>תקציר הזכות</h2>
              <p>{right.fullDescription}</p>
            </div>

            <div className="right-details-card">
              <h2>צעדים למימוש</h2>

              {right.actionSteps?.length > 0 ? (
                <ol className="right-details-steps">
                  {right.actionSteps.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              ) : (
                <p>לא הוגדרו עדיין צעדים למימוש עבור זכות זו.</p>
              )}
            </div>

            <div className="right-details-card right-details-source-card">
              <h2>מקור רשמי</h2>

              <p>{right.officialSource}</p>

              {right.officialUrl ? (
                <a
                  href={right.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="right-details-link"
                >
                  <Button type="button" variant="primary">
                    מעבר לאתר הרשמי
                  </Button>
                </a>
              ) : (
                <p>לא צורף קישור רשמי לזכות זו בשלב הנוכחי.</p>
              )}
            </div>

            <div className="right-details-actions">
              <Link to="/dashboard" className="right-details-link">
                <Button type="button" variant="secondary">
                  חזרה לרשימת הזכויות
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default RightDetailsPage