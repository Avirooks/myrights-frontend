import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Card from '../components/Card'

function HomePage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: '📋',
      title: 'בדיקת זכויות מותאמת',
      description: 'שאלון קצר וברור שיעזור להבין אילו זכויות, קצבאות והטבות עשויות להתאים להורה.',
    },
    {
      icon: '✓',
      title: 'מידע ממקורות רשמיים',
      description: 'המידע מוצג בצורה פשוטה ונגישה, כדי לעזור למשפחה להבין מה חשוב לבדוק.',
    },
    {
      icon: '🎯',
      title: 'צעדים ברורים למימוש',
      description: 'לא רק לדעת שיש זכות, אלא להבין מה צריך לעשות כדי להתחיל לממש אותה.',
    },
    {
      icon: '✅',
      title: 'צ׳קליסט אישי למעקב',
      description: 'מעקב פשוט אחרי זכויות, מסמכים, פעולות ותהליכים שנמצאים בבדיקה.',
    },
  ]

  return (
    <div>
      <Navbar
        title="MyRights"
        links={[
          { label: 'בית', href: '/' },
          { label: 'שאלון', href: '/questionnaire' },
          { label: 'זכויות מותאמות', href: '/dashboard' }
        ]}
        showCta={false}
      />

      <main>
        <section className="home-hero">
          <div className="home-hero-bg" aria-hidden="true">
            <div className="city-line city-line-left" />
            <div className="city-line city-line-right" />
          </div>

          <div className="container home-hero-content">
            <h1>עוזרים להורים בגיל השלישי להכיר ולממש את הזכויות שלהם</h1>

            <p className="home-hero-subtitle">
              MyRights היא עוזרת אישית שמסייעת לבני משפחה להבין אילו זכויות,
              הטבות וקצבאות עשויות להתאים להורים המבוגרים שלהם, בדרך פשוטה וברורה.
            </p>

            <div className="home-search-box" role="search">
              <span className="home-search-icon" aria-hidden="true">⌕</span>
              <input
                type="text"
                placeholder="חיפוש זכות, הטבה או קצבה..."
                aria-label="חיפוש זכויות"
              />
            </div>

            <div className="home-ai-box">
              <div className="home-ai-header">
                <span className="home-ai-badge">✦</span>
                <h2> עוזר זכויות חכם</h2>
              </div>

              <div className="home-ai-input-row">
                <input
                  type="text"
                  placeholder="מה רצית לדעת?"
                  aria-label="שאלה לעוזר האישי"
                />
                <button type="button" aria-label="שליחת שאלה">
                  ↑
                </button>
              </div>

              <p className="home-ai-note">
                אין לשתף פרטים מזהים או מידע רגיש. המענה הוא לצורך הכוונה ראשונית בלבד.
              </p>
            </div>

            <Button
              variant="primary"
              onClick={() => navigate('/questionnaire')}
              className="home-hero-cta"
            >
              התחלת בדיקת זכויות אישית
            </Button>
          </div>
        </section>

        <section className="section home-features-section">
          <div className="container">
            <h2 className="home-section-title">איך זה עובד?</h2>

            <div className="content-grid">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <div className="home-feature-card">
                    <div className="home-feature-icon">{feature.icon}</div>
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="home-bottom-cta">
          <div className="container">
            <h2>מוכנים להתחיל?</h2>
            <p>
              מלאו שאלון קצר וקבלו רשימה ראשונית של זכויות וקצבאות שעשויות להתאים.
            </p>
            <Button variant="primary" onClick={() => navigate('/questionnaire')}>
              מלא שאלון
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage