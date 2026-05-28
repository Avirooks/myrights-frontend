import { useNavigate } from 'react-router-dom'

function QuestionnairePage() {
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <main className="page-container">
      <div className="container">
        <header className="page-header">
          <h1>שאלון בדיקת זכויות</h1>
          <p>
            מלאו מספר פרטים בסיסיים על ההורה כדי לקבל התאמה ראשונית של זכויות והטבות.
          </p>
        </header>

        <form className="card" onSubmit={handleSubmit}>
          <section className="form-section">
            <h2>פרטי ההורה</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="parentName">שם ההורה</label>
                <input id="parentName" name="parentName" type="text" />
              </div>

              <div className="form-group">
                <label htmlFor="age">גיל</label>
                <input id="age" name="age" type="number" />
              </div>

              <div className="form-group">
                <label htmlFor="maritalStatus">מצב משפחתי</label>
                <select id="maritalStatus" name="maritalStatus">
                  <option value="">בחר מצב משפחתי</option>
                  <option value="married">נשוי/ה</option>
                  <option value="widowed">אלמן/ה</option>
                  <option value="divorced">גרוש/ה</option>
                  <option value="single">רווק/ה</option>
                </select>
              </div>
            </div>
          </section>

          <section className="form-section">
            <h2>מצב כלכלי ותפקודי</h2>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="income">האם יש להורה הכנסה נוספת?</label>
                <select id="income" name="income">
                  <option value="">בחר תשובה</option>
                  <option value="yes">כן</option>
                  <option value="no">לא</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dailyHelp">האם ההורה זקוק לעזרה יומיומית?</label>
                <select id="dailyHelp" name="dailyHelp">
                  <option value="">בחר תשובה</option>
                  <option value="yes">כן</option>
                  <option value="no">לא</option>
                </select>
              </div>
            </div>
          </section>

          <button type="submit" className="primary">
            הצג זכויות מתאימות
          </button>
        </form>
      </div>
    </main>
  )
}

export default QuestionnairePage