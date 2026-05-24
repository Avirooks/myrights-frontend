function Navbar({ title = 'MyRights', links = [] }) {
  return (
    <header className="container" style={{ padding: 'var(--spacing-lg) 0' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--spacing-md)',
        }}
      >
        {links.length > 0 && (
          <nav aria-label="ניווט ראשי">
            <ul
              style={{
                display: 'flex',
                gap: 'var(--spacing-md)',
                listStyle: 'none',
                margin: 0,
                padding: 0,
              }}
            >
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    style={{
                      color: 'var(--color-text)',
                      fontSize: 'var(--font-size-base)',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <div style={{ textAlign: 'right' }}>
          <p
            style={{
              margin: 0,
              fontSize: '1.25rem',
              fontWeight: 700,
              color: 'var(--color-primary)',
            }}
          >
            {title}
          </p>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
