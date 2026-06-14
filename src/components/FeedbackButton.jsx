import { useState } from 'react'
import FeedbackForm from './FeedbackForm'

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        className="feedback-button"
        onClick={() => setIsOpen(true)}
      >
        משוב
      </button>

      {isOpen && (
        <div
          className="feedback-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="טופס משוב"
        >
          <div className="feedback-modal">
            <button
              type="button"
              className="feedback-close"
              onClick={() => setIsOpen(false)}
              aria-label="סגירת טופס המשוב"
            >
              ×
            </button>

            <FeedbackForm />
          </div>
        </div>
      )}
    </>
  )
}