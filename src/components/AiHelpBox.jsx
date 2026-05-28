import { useState } from 'react'
import Button from './Button'

function AiHelpBox() {
  const [question, setQuestion] = useState('')
  const [showDemo, setShowDemo] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (question.trim()) {
      setShowDemo(true)
      setQuestion('')
      // In the future, this would call a real AI API
    }
  }

  return (
    <section
      style={{
        backgroundColor: 'var(--color-secondary)',
        borderRadius: 'var(--radius)',
        padding: 'var(--spacing-md)',
        textAlign: 'center',
        marginTop: 'var(--spacing-md)',
        border: '1px solid var(--color-border)',
      }}
    >
      <h2
        style={{
          margin: 0,
          marginBottom: 'var(--spacing-sm)',
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--color-primary)',
        }}
      >
        שאלו את העוזר החכם שלנו
      </h2>
      <p
        style={{
          margin: 0,
          marginBottom: 'var(--spacing-lg)',
          fontSize: 'var(--font-size-base)',
          color: '#5F6B72',
          maxWidth: '100%',
          marginInline: 'auto',
          lineHeight: 1.6,
          overflowWrap: 'anywhere',
        }}
      >
        כתבו שאלה קצרה על זכויות ההורה, ואנחנו נעזור להבין מה כדאי לבדוק.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '100%', marginInline: 'auto' }}>
        <div
          style={{
            display: 'flex',
            gap: 'var(--spacing-sm)',
            flexDirection: 'column',
          }}
        >
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="לדוגמה: האם הורה בן 78 שזקוק לעזרה בבית יכול לקבל קצבת סיעוד?"
            style={{
              padding: 'var(--spacing-md)',
              fontSize: 'var(--font-size-base)',
              textAlign: 'right',
            }}
          />
          <Button type="submit" variant="primary">
            שאלו שאלה
          </Button>
        </div>
      </form>

      {showDemo && (
        <div
          style={{
            marginTop: 'var(--spacing-lg)',
            padding: 'var(--spacing-lg)',
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius)',
            border: '1px solid var(--color-border)',
            textAlign: 'right',
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 'var(--font-size-base)',
              color: 'var(--color-primary)',
              fontWeight: 600,
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            תשובת הדגמה:
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 'var(--font-size-base)',
              color: '#5F6B72',
              lineHeight: 1.6,
            }}
          >
            בשלב זה העוזר החכם מוצג כהדגמה בלבד. בהמשך ניתן יהיה לחבר אותו ל־AI אמיתי דרך Backend מאובטח.
          </p>
        </div>
      )}
    </section>
  )
}

export default AiHelpBox
