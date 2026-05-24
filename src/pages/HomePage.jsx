import Navbar from '../components/Navbar'
import Button from '../components/Button'
import Card from '../components/Card'

function HomePage() {
  const cards = [
    {
      title: 'ממלאים שאלון קצר',
      description:'שאלות פשוטות שיעזרו להבין אילו זכויות עשויות להתאים להורה .',
    },
    {
      title: 'מקבלים זכויות מותאמות',
      description: 'הצגה ברורה של הזכויות וההנחות הרלוונטיות.',
    },
    {
      title: 'רואים צעדים למימוש',
      description: 'צעדים פשוטים כדי להמשיך ולקבל את התמיכה המתאימה.',
    },
  ]

  return (
    <div>
      <Navbar
        title="MyRights"
        links={[
          { label: 'בית', href: '/' },
          { label: 'שאלון', href: '/questionnaire' },
          { label: 'Dashboard', href: '/dashboard' },
        ]}
      />

      <main className="container" style={{ padding: 'var(--spacing-xl) 0' }}>
        <section style={{ textAlign: 'center', color: 'var(--color-text)' }}>
          <h1
            style={{
              margin: 0,
              fontSize: '2.5rem',
              lineHeight: 1.1,
              maxWidth: '720px',
              marginInline: 'auto',
            }}
          >
            יש לכם הורים שהגיעו לגיל השלישי ?
            במערכת זו תוכלו לקבל מידע והכוונה כיצד ניתן להכיר ולממש את הזכויות שלהם       
          </h1>
          <p
            style={{
              marginTop: 'var(--spacing-md)',
              marginBottom: 'var(--spacing-lg)',
              fontSize: 'var(--font-size-base)',
              maxWidth: '720px',
              color: '#5F6B72',
            }}
          >
           
          </p>

          <Button variant="primary">התחלת בדיקת זכויות</Button>
        </section>

        <section style={{ marginTop: 'var(--spacing-xl)' }}>
          <div
            style={{
              display: 'grid',
              gap: 'var(--spacing-lg)',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            }}
          >
            {cards.map((card) => (
              <Card key={card.title}>
                <h2 style={{ marginTop: 0, marginBottom: 'var(--spacing-sm)' }}>{card.title}</h2>
                <p style={{ margin: 0, color: '#5F6B72' }}>{card.description}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage;
