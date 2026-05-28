import { Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

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

      <main>
        <section className="dashboard-hero">
          <div className="container dashboard-hero-content">
            <button
              type="button"
              className="dashboard-back-btn"
              onClick={() => navigate('/')}
            >
              חזרה לדף הבית
            </button>

            <h1> הזכויות המותאמות לפי השאלון</h1>

            <p>
             להלן רשימת זכויות והטבות שעשויות להתאים לפי הפרטים שמילאתם בשאלון.
כל זכות כוללת סטטוס, צעד הבא והכוונה ראשונית להמשך טיפול.
            </p>
          </div>
        </section>

        <section className="dashboard-main-section">
          <div className="container">
            <div className="dashboard-layout">
              <div className="mobile-checklist-toggle">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setChecklistOpen((value) => !value)}
                  aria-expanded={checklistOpen}
                  aria-controls="mobile-checklist"
                  style={{ width: '100%', textAlign: 'center' }}
                >
                  {checklistOpen ? 'הסתר צ׳קליסט' : 'הצג צ׳קליסט מימוש'}
                </Button>
              </div>

              <section className="dashboard-rights-list">
                {rightsData.map((right) => (
                  <Card key={right.id}>
                    <article className="dashboard-right-card">
                      <div className="dashboard-right-header">
                        <div className="dashboard-right-title">
                          <h2>{right.title}</h2>
                          <p>{right.shortDescription}</p>
                        </div>

                        <StatusBadge variant={getBadgeVariant(right.progressStatus)}>
                          {right.progressStatus}
                        </StatusBadge>
                      </div>

                      <div className="dashboard-right-info">
                        <div>
                          <span>סטטוס זכאות</span>
                          <strong>{right.eligibilityStatus}</strong>
                        </div>

                        <div>
                          <span>סטטוס תהליך</span>
                          <strong>{right.progressStatus}</strong>
                        </div>

                        <div>
                          <span>צעדים הבאים</span>
                          <p>{right.nextAction}</p>
                        </div>
                      </div>

                      <div className="dashboard-card-actions">
                        <Link to={`/right/${right.id}`}>
                          <Button type="button" variant="primary">
                            לפרטים נוספים
                          </Button>
                        </Link>
                      </div>
                    </article>
                  </Card>
                ))}
              </section>

              <aside className="desktop-checklist">
                <RightsChecklist />
              </aside>

              {checklistOpen && (
                <div id="mobile-checklist" className="mobile-checklist">
                  <RightsChecklist id="mobile-checklist-content" variant="mobile" />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage