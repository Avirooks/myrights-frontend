function Card({ title, children, className = '', ...props }) {
  return (
    <article className={`card ${className}`.trim()} {...props}>
      {title && (
        <h2 style={{ margin: 0, marginBottom: 'var(--spacing-md)' }}>
          {title}
        </h2>
      )}
      {children}
    </article>
  )
}

export default Card
