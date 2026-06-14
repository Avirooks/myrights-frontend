import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'

export default function FeedbackForm() {
  const { user } = useAuth()

  const [rating, setRating] = useState('')
  const [category, setCategory] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')

    if (!user) {
      setStatus('יש להתחבר כדי לשלוח משוב')
      return
    }

    if (!rating || !category || !message.trim()) {
      setStatus('יש למלא את כל השדות')
      return
    }

    setIsSubmitting(true)

    const { error } = await supabase.from('feedback').insert({
      user_id: user.id,
      rating: Number(rating),
      category,
      message: message.trim(),
      page_url: window.location.pathname,
    })

    setIsSubmitting(false)

    if (error) {
      console.error('Error submitting feedback:', error)
      setStatus('שליחת המשוב נכשלה. נסה שוב.')
      return
    }

    setRating('')
    setCategory('')
    setMessage('')
    setStatus('המשוב נשלח בהצלחה. תודה!')
  }

return (
  <form onSubmit={handleSubmit}>
    {!user && (
  <p className="feedback-login-message">
    יש להתחבר לפני שליחת משוב
  </p>
)}

{status && (
  <p className="feedback-status" role="status">
    {status}
  </p>
)}
    <h2>נשמח לשמוע מה חשבת</h2>

    <label>איך היית מדרג את החוויה שלך באתר?</label>

    <div className="feedback-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={star <= Number(rating) ? 'star active' : 'star'}
          onClick={() => setRating(String(star))}
          aria-label={`דירוג ${star} מתוך 5`}
        >
          ★
        </button>
      ))}
    </div>

    <label htmlFor="feedback-category">
      על מה תרצה לתת משוב?
    </label>

    <select
      id="feedback-category"
      value={category}
      onChange={(event) => setCategory(event.target.value)}
      required
    >
      <option value="">בחר סוג משוב</option>
      <option value="improvement">הצעה לשיפור</option>
      <option value="preservation">הצעה לשימור</option>
      <option value="general">משוב כללי</option>
      <option value="bug">תקלה</option>
    </select>

    <label htmlFor="feedback-message">נשמח לשמוע עוד</label>

    <textarea
      id="feedback-message"
      value={message}
      onChange={(event) => setMessage(event.target.value)}
      placeholder="ספר לנו מה עבד טוב, מה היה חסר או מה כדאי לשפר"
      rows="5"
      required
    />

<button type="submit" disabled={isSubmitting || !user}>
  {isSubmitting ? 'שולח...' : 'שליחת משוב'}
</button>

    
  </form>
)
}