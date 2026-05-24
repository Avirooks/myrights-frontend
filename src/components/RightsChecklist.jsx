function RightsChecklist() {
  const completedItems = [
    { title: 'הנחה בתחבורה ציבורית', status: 'בוצע' },
  ]

  const pendingItems = [
    { title: 'השלמת הכנסה', status: 'לבדיקת מסמכים' },
    { title: 'קצבת סיעוד', status: 'לבדיקת זכאות' },
  ]

  const upcomingItems = [
    { title: 'קצבת אזרח ותיק', status: 'רלוונטי בעוד שנה' },
  ]

  return (
    <aside
      style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius)',
        padding: 'var(--spacing-lg)',
        boxShadow: 'var(--shadow-soft)',
        position: 'sticky',
        top: 'var(--spacing-lg)',
      }}
    >
      <h2
        style={{
          margin: 0,
          marginBottom: 'var(--spacing-sm)',
          fontSize: '1.1rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          textAlign: 'right',
        }}
      >
        צ׳קליסט מימוש זכויות
      </h2>
      <p
        style={{
          margin: 0,
          marginBottom: 'var(--spacing-md)',
          fontSize: 'var(--font-size-sm)',
          color: '#5F6B72',
          textAlign: 'right',
          lineHeight: 1.5,
        }}
      >
        מעקב מהיר אחרי זכויות שבוצעו, זכויות שדורשות טיפול וזכויות שעשויות להיות רלוונטיות בשנתיים הקרובות.
      </p>

      <div style={{ display: 'grid', gap: 'var(--spacing-lg)' }}>
        {/* בוצע */}
        <div>
          <h3
            style={{
              margin: 0,
              marginBottom: 'var(--spacing-sm)',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--color-success)',
              textAlign: 'right',
            }}
          >
            ✓ בוצע
          </h3>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'grid',
              gap: 'var(--spacing-xs)',
            }}
          >
            {completedItems.map((item) => (
              <li
                key={item.title}
                style={{
                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                  backgroundColor: 'rgba(56, 142, 60, 0.08)',
                  borderRadius: 'var(--radius)',
                  fontSize: 'var(--font-size-sm)',
                  textAlign: 'right',
                  color: 'var(--color-text)',
                }}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        {/* לביצוע */}
        <div>
          <h3
            style={{
              margin: 0,
              marginBottom: 'var(--spacing-sm)',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
              textAlign: 'right',
            }}
          >
            ⚠ לביצוע
          </h3>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'grid',
              gap: 'var(--spacing-xs)',
            }}
          >
            {pendingItems.map((item) => (
              <li
                key={item.title}
                style={{
                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                  backgroundColor: 'var(--color-secondary)',
                  borderRadius: 'var(--radius)',
                  fontSize: 'var(--font-size-sm)',
                  textAlign: 'right',
                  color: 'var(--color-text)',
                }}
              >
                <div>{item.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#5F6B72', marginTop: '0.25rem' }}>
                  {item.status}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* זכויות קרובות */}
        <div>
          <h3
            style={{
              margin: 0,
              marginBottom: 'var(--spacing-sm)',
              fontSize: '0.95rem',
              fontWeight: 700,
              color: '#7C4500',
              textAlign: 'right',
            }}
          >
            📅 זכויות קרובות למימוש
          </h3>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'grid',
              gap: 'var(--spacing-xs)',
            }}
          >
            {upcomingItems.map((item) => (
              <li
                key={item.title}
                style={{
                  padding: 'var(--spacing-xs) var(--spacing-sm)',
                  backgroundColor: 'rgba(124, 69, 0, 0.08)',
                  borderRadius: 'var(--radius)',
                  fontSize: 'var(--font-size-sm)',
                  textAlign: 'right',
                  color: 'var(--color-text)',
                }}
              >
                <div>{item.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#5F6B72', marginTop: '0.25rem' }}>
                  {item.status}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

export default RightsChecklist
