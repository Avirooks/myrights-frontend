import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Card from '../components/Card'
import AiHelpBox from '../components/AiHelpBox'

function HomePage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: '📋',
      title: 'בדיקת זכויות מותאמת',
      description: 'שאלון קצר וברור שיעזור להבין אילו זכויות וקצבאות עשויות להתאים להורה.',
    },
    {
      icon: '✓',
      title: 'מידע ממקורות רשמיים',
      description: 'כל הזכויות המוצעות מבוססות על מידע מאמין ומעודכן מגורמים ממשלתיים.',
    },
    {
      icon: '🎯',
      title: 'צעדים ברורים למימוש',
      description: 'הנחיות פשוטות וברורות כיצד להמשיך וללא ליבצע את התהליכים הדרושים.',
    },
    {
      icon: '✅',
      title: 'צ׳קליסט אישי למעקב',
      description: 'רשימת מעקב פשוטה שתעזור לעקוב אחרי התהליכים שהוזנחו או בתהליך.',
    },
  ]

  return (
    <div>
      <Navbar
        title="MyRights"
        links={[
          { label: 'בית', href: '/' },
          { label: 'שאלון', href: '/questionnaire' },
          { label: 'דשבורד', href: '/dashboard' },
        ]}
        showCta={false}
      />

      <main>
        {/* Hero Section */}
        <section className="section-hero">
          <div className="container">
            <h1>
              עוזרים להורים מבוגרים להכיר ולממש את הזכויות שלהם
            </h1>
            <p>
              MyRights היא עוזרת אישית שמסייעת לבני משפחה להתאים בדיוק אילו זכויות, הטבות וקצבאות 
              יכולות לעזור לההורים המבוגרים שלהם ב־דרך פשוטה וברורה.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/questionnaire')}
              style={{ backgroundColor: '#FFFFFF', color: 'var(--color-primary)', fontWeight: 700 }}
            >
              התחלת בדיקת זכויות
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="section">
          <div className="container">
            <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)', fontSize: 'var(--font-size-2xl)', fontWeight: 700 }}>
              איך זה עובד?
            </h2>
            <div className="content-grid">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>
                      {feature.icon}
                    </div>
                    <h3 style={{ margin: 0, marginBottom: 'var(--spacing-sm)', fontSize: 'var(--font-size-lg)', fontWeight: 600 }}>
                      {feature.title}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--color-text-light)', lineHeight: 1.6, fontSize: 'var(--font-size-base)' }}>
                      {feature.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AI Help Section */}
        <section className="section">
          <div className="container" style={{ maxWidth: '800px' }}>
            <AiHelpBox />
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ backgroundColor: 'var(--color-secondary)', padding: 'clamp(1.5rem, 4%, 2rem) 0' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ margin: 0, marginBottom: 'var(--spacing-md)', fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-primary)' }}>
              מוכנים להתחיל?
            </h2>
            <p style={{ margin: 0, marginBottom: 'var(--spacing-lg)', fontSize: 'var(--font-size-base)', color: 'var(--color-text-light)' }}>
              מלאו שאלון קצר וקבלו רשימה מותאמת של זכויות וקצבאות שעשויות להתאים.
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
