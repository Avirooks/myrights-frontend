import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import { supabase } from '../lib/supabase'

const specialStatusOptions = [
  { value: 'disabled_idf', label: 'נכה צה״ל' },
  { value: 'disabled_idf_family', label: 'בן/בת משפחה של נכה צה״ל' },
  { value: 'bereaved_family', label: 'משפחה שכולה' },
  { value: 'terror_victim', label: 'נפגע/ת פעולות איבה' },
  { value: 'october_7_survivor', label: 'נפגע/ת או שורד/ת מאירועי 7.10' },
  { value: 'holocaust_survivor', label: 'שורד/ת שואה' },
  { value: 'other', label: 'אחר' },
  { value: 'none', label: 'לא ידוע / לא רלוונטי' },
]

function calculateAge(birthDate) {
  if (!birthDate) return null

  const today = new Date()
  const dateOfBirth = new Date(birthDate)

  if (Number.isNaN(dateOfBirth.getTime())) return null

  let age = today.getFullYear() - dateOfBirth.getFullYear()
  const monthDifference = today.getMonth() - dateOfBirth.getMonth()

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dateOfBirth.getDate())
  ) {
    age -= 1
  }

  return age
}

function isValidIsraeliId(value) {
  if (!value) return true
  return /^\d{9}$/.test(value)
}

function QuestionnairePage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const isEditMode = searchParams.get('mode') === 'edit'

  const [questionnaireId, setQuestionnaireId] = useState(null)

  const [formData, setFormData] = useState({
    parentName: '',
    birthDate: '',
    idNumber: '',
    gender: '',
    maritalStatus: '',
    specialStatuses: ['none'],
  })

  const [isLoading, setIsLoading] = useState(isEditMode)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const calculatedAge = useMemo(
    () => calculateAge(formData.birthDate),
    [formData.birthDate]
  )

  useEffect(() => {
    async function loadLatestQuestionnaire() {
      if (!isEditMode) return

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
            'id, parent_name, birth_date, id_number, gender, marital_status, special_statuses'
          )
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle()

        if (error) {
          throw error
        }

        if (!data) {
          setErrorMessage('לא נמצא שאלון קודם לעדכון. ניתן למלא שאלון חדש.')
          setIsLoading(false)
          return
        }

        setQuestionnaireId(data.id)

        setFormData({
          parentName: data.parent_name || '',
          birthDate: data.birth_date || '',
          idNumber: data.id_number || '',
          gender: data.gender || '',
          maritalStatus: data.marital_status || '',
          specialStatuses:
            Array.isArray(data.special_statuses) &&
            data.special_statuses.length > 0
              ? data.special_statuses
              : ['none'],
        })
      } catch (error) {
        console.error('Load questionnaire error:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          fullError: error,
        })

        setErrorMessage('לא הצלחנו לטעון את השאלון הקודם לעדכון.')
      } finally {
        setIsLoading(false)
      }
    }

    loadLatestQuestionnaire()
  }, [isEditMode, navigate])

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  function handleIdNumberChange(event) {
    const onlyDigits = event.target.value.replace(/\D/g, '').slice(0, 9)

    setFormData((prevData) => ({
      ...prevData,
      idNumber: onlyDigits,
    }))
  }

  function handleSpecialStatusChange(event) {
    const { value, checked } = event.target

    setFormData((prevData) => {
      if (value === 'none') {
        return {
          ...prevData,
          specialStatuses: checked ? ['none'] : [],
        }
      }

      const statusesWithoutNone = prevData.specialStatuses.filter(
        (status) => status !== 'none'
      )

      if (checked) {
        return {
          ...prevData,
          specialStatuses: [...statusesWithoutNone, value],
        }
      }

      const updatedStatuses = statusesWithoutNone.filter(
        (status) => status !== value
      )

      return {
        ...prevData,
        specialStatuses: updatedStatuses.length > 0 ? updatedStatuses : ['none'],
      }
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setErrorMessage('')

    if (calculatedAge === null || calculatedAge < 0 || calculatedAge > 120) {
      setErrorMessage('יש להזין תאריך לידה תקין.')
      return
    }

    if (!isValidIsraeliId(formData.idNumber)) {
      setErrorMessage('אם מזינים תעודת זהות, יש להזין בדיוק 9 ספרות.')
      return
    }

    setIsSubmitting(true)

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

      const questionnaireData = {
        user_id: user.id,
        parent_name: formData.parentName.trim(),
        birth_date: formData.birthDate,
        age: calculatedAge,
        id_number: formData.idNumber.trim() || null,
        gender: formData.gender,
        marital_status: formData.maritalStatus,
        special_statuses: formData.specialStatuses,
      }

      if (isEditMode && questionnaireId) {
        const { error: updateError } = await supabase
          .from('questionnaire_answers')
          .update(questionnaireData)
          .eq('id', questionnaireId)

        if (updateError) {
          throw updateError
        }
      } else {
        const { error: insertError } = await supabase
          .from('questionnaire_answers')
          .insert(questionnaireData)

        if (insertError) {
          throw insertError
        }
      }

      navigate('/dashboard')
    } catch (error) {
      console.error('Questionnaire submit error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
        fullError: error,
      })

      setErrorMessage('אירעה שגיאה בשמירת השאלון. נסה שוב בעוד רגע.')
    } finally {
      setIsSubmitting(false)
    }
  }

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

      <main className="questionnaire-page">
        <section className="questionnaire-hero">
          <div className="container">
            <button
              type="button"
              className="questionnaire-back-btn"
              onClick={() => navigate(isEditMode ? '/dashboard' : '/')}
            >
              {isEditMode ? 'חזרה לזכויות' : 'חזרה לדף הבית'}
            </button>

            <h1>{isEditMode ? 'עדכון שאלון זכויות' : 'שאלון בדיקת זכויות'}</h1>

            <p>
              מלאו פרטים בסיסיים על ההורה כדי לקבל רשימת זכויות ראשונית שכדאי
              לבדוק מול הגורמים הרשמיים.
            </p>
          </div>
        </section>

        <section className="questionnaire-main">
          <div className="container questionnaire-container">
            {isLoading ? (
              <div className="questionnaire-card">
                <h2>טוען את נתוני השאלון...</h2>
                <p>אנחנו שולפים את הפרטים האחרונים שנשמרו במערכת.</p>
              </div>
            ) : (
              <form className="questionnaire-card" onSubmit={handleSubmit}>
                <section className="questionnaire-form-section">
                  <h2>פרטי ההורה</h2>

                  <div className="questionnaire-form-grid">
                    <div className="questionnaire-form-group">
                      <label htmlFor="parentName">שם מלא של ההורה</label>
                      <input
                        id="parentName"
                        name="parentName"
                        type="text"
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="לדוגמה: דויד כהן"
                        required
                      />
                    </div>

                    <div className="questionnaire-form-group">
                      <label htmlFor="birthDate">תאריך לידה</label>
                      <input
                        id="birthDate"
                        name="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="questionnaire-form-group">
                      <label htmlFor="calculatedAge">גיל מחושב</label>
                      <input
                        id="calculatedAge"
                        type="text"
                        value={
                          calculatedAge !== null && calculatedAge >= 0
                            ? `${calculatedAge}`
                            : ''
                        }
                        placeholder="יחושב אוטומטית"
                        readOnly
                      />
                    </div>

                    <div className="questionnaire-form-group">
                      <label htmlFor="idNumber">תעודת זהות</label>
                      <input
                        id="idNumber"
                        name="idNumber"
                        type="text"
                        inputMode="numeric"
                        value={formData.idNumber}
                        onChange={handleIdNumberChange}
                        placeholder="אופציונלי - 9 ספרות"
                        maxLength="9"
                      />
                    </div>

                    <div className="questionnaire-form-group">
                      <label htmlFor="gender">מין / מגדר</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">בחר/י אפשרות</option>
                        <option value="male">זכר</option>
                        <option value="female">נקבה</option>
                        <option value="other">אחר</option>
                        <option value="prefer_not_to_say">
                          מעדיף/ה לא לציין
                        </option>
                      </select>
                    </div>

                    <div className="questionnaire-form-group">
                      <label htmlFor="maritalStatus">מצב משפחתי</label>
                      <select
                        id="maritalStatus"
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        required
                      >
                        <option value="">בחר מצב משפחתי</option>
                        <option value="married">נשוי/ה</option>
                        <option value="widowed">אלמן/ה</option>
                        <option value="divorced">גרוש/ה</option>
                        <option value="single">רווק/ה</option>
                        <option value="unknown">לא ידוע</option>
                      </select>
                    </div>
                  </div>
                </section>

                <section className="questionnaire-form-section">
                  <h2>מצבים מיוחדים לבדיקה</h2>

                  <p className="questionnaire-section-description">
                    סמנו רק אם אחד מהמצבים הבאים רלוונטי. המידע משמש להצגת
                    זכויות לבדיקה ראשונית ואינו מהווה אישור זכאות.
                  </p>

                  <div className="questionnaire-checkbox-grid">
                    {specialStatusOptions.map((option) => (
                      <label
                        key={option.value}
                        className="questionnaire-checkbox-option"
                      >
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={formData.specialStatuses.includes(
                            option.value
                          )}
                          onChange={handleSpecialStatusChange}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </section>

                {errorMessage && (
                  <p className="form-error-message">{errorMessage}</p>
                )}

                <div className="questionnaire-actions">
                  <button
                    type="submit"
                    className="primary questionnaire-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? 'שומר נתונים...'
                      : isEditMode
                        ? 'שמור עדכון שאלון'
                        : 'הצג זכויות לבדיקה'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default QuestionnairePage