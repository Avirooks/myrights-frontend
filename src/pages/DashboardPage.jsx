import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Button from '../components/Button'
import StatusBadge from '../components/StatusBadge'
import RightsChecklist from '../components/RightsChecklist'
import { rightsData } from '../data/rightsData'
import { supabase } from '../lib/supabase'

function getBadgeVariant(progressStatus) {
  if (progressStatus === 'הושלם') return 'success'
  if (progressStatus === 'ממתין' || progressStatus === 'לבדיקה') return 'warning'
  return 'info'
}

function getYesNoLabel(value) {
  return value ? 'כן' : 'לא'
}

function getMaritalStatusLabel(status) {
  const statuses = {
    married: 'נשוי/ה',
    widowed: 'אלמן/ה',
    divorced: 'גרוש/ה',
    single: 'רווק/ה',
  }

  return statuses[status] || 'לא צוין'
}

function DashboardPage() {
  const [checklistOpen, setChecklistOpen] = useState(false)
  const [latestQuestionnaire, setLatestQuestionnaire] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const hasRights = rightsData.length > 0

  useEffect(() => {
    async function fetchLatestQuestionnaire() {
      setIsLoading(true)
      setErrorMessage('')

      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError) {
          throw userError
        }

        if (!user) {
          navigate('/login')
          return
        }

        const { data, error } = await supabase
          .from('questionnaire_answers')
          .select(
            'id, parent_name, age, marital_status, has_extra_income, needs_daily_help, created_at'
          )
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (error) {
          throw error
        }

        setLatestQuestionnaire(data)
      } catch (error) {
        console.error('Dashboard fetch error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          fullError: error,
        })

        setErrorMessage('לא הצלחנו לטעון את נתוני השאלון. נסה לרענן את העמוד.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestQuestionnaire()
  }, [navigate])

  return (
    <div>
      <Navbar
        title="MyRights"
        links={[
          { label: 'בית', href: '/' },
          { label: 'שאלון', href: '/questionnaire' },
          { label: 'זכויות מותאמות', href: '/dashboard' },
        ]}
      />

      <main className="dashboard-page">
        <section className="dashboard-hero">
          <div className="container dashboard-hero-content">
            <button
              type="button"
              className="dashboard-back-btn"
              onClick={() => navigate('/questionnaire')}
            >
              חזרה לשאלון
            </button>

            <h1>הזכויות המותאמות לפי השאלון</h1>

            <p>
              להלן רשימת זכויות והטבות שעשויות להתאים לפי הפרטים שמילאתם בשאלון.
              כל זכות כוללת סטטוס, צעד הבא והכוונה ראשונית להמשך טיפול.
            </p>
          </div>
        </section>

        <section className="dashboard-main-section">
          <div className="container">
            {isLoading && (
              <Card>
                <div className="dashboard-empty-state">
                  <h2>טוען את נתוני השאלון...</h2>
                  <p>אנחנו שולפים את הנתונים האחרונים שנשמרו במערכת.</p>
                </div>
              </Card>
            )}

            {!isLoading && errorMessage && (
              <Card>
                <div className="dashboard-empty-state">
                  <h2>שגיאה בטעינת הנתונים</h2>
                  <p>{errorMessage}</p>

                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => window.location.reload()}
                  >
                    רענון העמוד
                  </Button>
                </div>
              </Card>
            )}

            {!isLoading && !errorMessage && !latestQuestionnaire && (
              <Card>
                <div className="dashboard-empty-state">
                  <h2>עדיין לא מולא שאלון</h2>
                  <p>
                    כדי להציג זכויות מותאמות, יש למלא קודם את שאלון בדיקת
                    הזכויות.
                  </p>

                  <Button
                    type="button"
                    variant="primary"
                    onClick={() => navigate('/questionnaire')}
                  >
                    מעבר לשאלון
                  </Button>
                </div>
              </Card>
            )}

            {!isLoading && !errorMessage && latestQuestionnaire && (
              <>
                <Card>
                  <section className="dashboard-questionnaire-summary">
                    <h2>סיכום השאלון האחרון</h2>

                    <div className="dashboard-right-info">
                      <div>
                        <span>שם ההורה</span>
                        <strong>{latestQuestionnaire.parent_name}</strong>
                      </div>

                      <div>
                        <span>גיל</span>
                        <strong>{latestQuestionnaire.age}</strong>
                      </div>

                      <div>
                        <span>מצב משפחתי</span>
                        <strong>
                          {getMaritalStatusLabel(
                            latestQuestionnaire.marital_status
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>הכנסה נוספת</span>
                        <strong>
                          {getYesNoLabel(
                            latestQuestionnaire.has_extra_income
                          )}
                        </strong>
                      </div>

                      <div>
                        <span>זקוק לעזרה יומיומית</span>
                        <strong>
                          {getYesNoLabel(
                            latestQuestionnaire.needs_daily_help
                          )}
                        </strong>
                      </div>
                    </div>
                  </section>
                </Card>

                <div className="dashboard-layout">
                  <div className="mobile-checklist-toggle">
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setChecklistOpen((value) => !value)}
                      aria-expanded={checklistOpen}
                      aria-controls="mobile-checklist"
                      className="dashboard-checklist-toggle-btn"
                    >
                      {checklistOpen
                        ? 'הסתר צ׳קליסט מימוש'
                        : 'הצג צ׳קליסט מימוש'}
                    </Button>
                  </div>

                  <section
                    className="dashboard-rights-list"
                    aria-label="רשימת זכויות מותאמות"
                  >
                    {hasRights ? (
                      rightsData.map((right) => (
                        <Card key={right.id}>
                          <article className="dashboard-right-card">
                            <div className="dashboard-right-header">
                              <div className="dashboard-right-title">
                                <h2>{right.title}</h2>
                                <p>{right.shortDescription}</p>
                              </div>

                              <StatusBadge
                                variant={getBadgeVariant(
                                  right.progressStatus
                                )}
                              >
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
                                <span>הצעד הבא</span>
                                <p>{right.nextAction}</p>
                              </div>
                            </div>

                            <div className="dashboard-card-actions">
                              <Link
                                to={`/right/${right.id}`}
                                className="dashboard-card-link"
                              >
                                <Button type="button" variant="primary">
                                  לפרטים נוספים
                                </Button>
                              </Link>
                            </div>
                          </article>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <div className="dashboard-empty-state">
                          <h2>לא נמצאו זכויות להצגה</h2>
                          <p>
                            כרגע אין זכויות זמינות להצגה. ניתן לחזור לשאלון
                            ולמלא את הפרטים מחדש.
                          </p>

                          <Button
                            type="button"
                            variant="primary"
                            onClick={() => navigate('/questionnaire')}
                          >
                            חזרה לשאלון
                          </Button>
                        </div>
                      </Card>
                    )}
                  </section>

                  <aside
                    className="desktop-checklist"
                    aria-label="צ׳קליסט מימוש זכויות"
                  >
                    <RightsChecklist />
                  </aside>

                  {checklistOpen && (
                    <div id="mobile-checklist" className="mobile-checklist">
                      <RightsChecklist
                        id="mobile-checklist-content"
                        variant="mobile"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default DashboardPage