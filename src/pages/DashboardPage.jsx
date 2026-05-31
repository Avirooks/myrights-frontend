import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
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

function getMaritalStatusLabel(status) {
  const statuses = {
    married: 'נשוי/ה',
    widowed: 'אלמן/ה',
    divorced: 'גרוש/ה',
    single: 'רווק/ה',
    unknown: 'לא ידוע',
  }

  return statuses[status] || 'לא צוין'
}

function getGenderLabel(gender) {
  const genders = {
    male: 'זכר',
    female: 'נקבה',
    other: 'אחר',
    prefer_not_to_say: 'מעדיף/ה לא לציין',
  }

  return genders[gender] || 'לא צוין'
}

function getSpecialStatusLabel(status) {
  const statuses = {
    disabled_idf: 'נכה צה״ל',
    disabled_idf_family: 'בן/בת משפחה של נכה צה״ל',
    bereaved_family: 'משפחה שכולה',
    terror_victim: 'נפגע/ת פעולות איבה',
    october_7_survivor: 'נפגע/ת או שורד/ת מאירועי 7.10',
    holocaust_survivor: 'שורד/ת שואה',
    other: 'אחר',
    none: 'לא ידוע / לא רלוונטי',
  }

  return statuses[status] || status
}

function getSpecialStatusesText(statuses) {
  if (!Array.isArray(statuses) || statuses.length === 0) {
    return 'לא ידוע / לא רלוונטי'
  }

  return statuses.map((status) => getSpecialStatusLabel(status)).join(', ')
}

function maskIdNumber(idNumber) {
  if (!idNumber) return 'לא הוזנה'

  const cleanId = String(idNumber)

  if (cleanId.length < 4) {
    return 'הוזנה'
  }

  return `******${cleanId.slice(-3)}`
}

function isRightMatched(right, questionnaire) {
  if (!questionnaire) return false

  const rules = right.matchRules

  if (!rules || Object.keys(rules).length === 0) {
    return false
  }

  if (rules.minAge && Number(questionnaire.age) < rules.minAge) {
    return false
  }

  if (rules.maxAge && Number(questionnaire.age) > rules.maxAge) {
    return false
  }

  if (rules.gender && questionnaire.gender !== rules.gender) {
    return false
  }

  if (
    rules.maritalStatus &&
    questionnaire.marital_status !== rules.maritalStatus
  ) {
    return false
  }

  if (rules.specialStatus) {
    const statuses = Array.isArray(questionnaire.special_statuses)
      ? questionnaire.special_statuses
      : []

    if (!statuses.includes(rules.specialStatus)) {
      return false
    }
  }

  return true
}

function DashboardPage() {
  const [checklistOpen, setChecklistOpen] = useState(false)
  const [latestQuestionnaire, setLatestQuestionnaire] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const matchedRights = useMemo(() => {
    if (!latestQuestionnaire) return []

    return rightsData.filter((right) =>
      isRightMatched(right, latestQuestionnaire)
    )
  }, [latestQuestionnaire])

  const hasRights = matchedRights.length > 0

  const specialStatusesText = useMemo(() => {
    return getSpecialStatusesText(latestQuestionnaire?.special_statuses)
  }, [latestQuestionnaire])

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
            'id, parent_name, age, id_number, gender, marital_status, special_statuses, created_at'
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
          { label: 'זכויות לבדיקה', href: '/dashboard' },
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

            <h1>זכויות לבדיקה לפי השאלון</h1>

            <p>
              להלן רשימת זכויות והטבות שכדאי לבדוק לפי הפרטים שמילאתם בשאלון.
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
                    כדי להציג זכויות לבדיקה, יש למלא קודם את שאלון בדיקת
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
                    <div className="dashboard-summary-header">
                      <h2>סיכום השאלון האחרון</h2>

                      <Button
                        type="button"
                        variant="secondary"
                        onClick={() => navigate('/questionnaire?mode=edit')}
                        className="dashboard-edit-questionnaire-btn"
                      >
                        ✎ עדכון שאלון
                      </Button>
                    </div>

                    <div className="dashboard-right-info">
                      <div>
                        <span>שם מלא</span>
                        <strong>{latestQuestionnaire.parent_name}</strong>
                      </div>

                      <div>
                        <span>גיל</span>
                        <strong>{latestQuestionnaire.age}</strong>
                      </div>

                      <div>
                        <span>תעודת זהות</span>
                        <strong>
                          {maskIdNumber(latestQuestionnaire.id_number)}
                        </strong>
                      </div>

                      <div>
                        <span>מין / מגדר</span>
                        <strong>
                          {getGenderLabel(latestQuestionnaire.gender)}
                        </strong>
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
                        <span>מצבים מיוחדים</span>
                        <strong>{specialStatusesText}</strong>
                      </div>
                    </div>

                    <p className="dashboard-disclaimer">
                      הזכויות המוצגות הן זכויות לבדיקה ראשונית לפי פרטי ההורה.
                      הן אינן מהוות אישור זכאות סופי. מומלץ לבדוק כל זכות מול
                      הגורם הרשמי.
                    </p>
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
                    aria-label="רשימת זכויות לבדיקה"
                  >
                    {hasRights ? (
                      matchedRights.map((right) => (
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
                          <h2>לא נמצאו זכויות מתאימות להצגה</h2>
                          <p>
                            לפי הנתונים שמולאו בשאלון לא נמצאו כרגע זכויות
                            מתאימות להצגה. ניתן לעדכן את השאלון או לבדוק מול
                            גורם רשמי.
                          </p>

                          <Button
                            type="button"
                            variant="primary"
                            onClick={() => navigate('/questionnaire?mode=edit')}
                          >
                            עדכון שאלון
                          </Button>
                        </div>
                      </Card>
                    )}
                  </section>

                  <aside
                    className="desktop-checklist"
                    aria-label="צ׳קליסט מימוש זכויות"
                  >
                    <RightsChecklist rights={matchedRights} />
                  </aside>

                  {checklistOpen && (
                    <div id="mobile-checklist" className="mobile-checklist">
                      <RightsChecklist
                        id="mobile-checklist-content"
                        variant="mobile"
                        rights={matchedRights}
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