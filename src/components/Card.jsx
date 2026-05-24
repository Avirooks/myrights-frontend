function Card({ title, children, className = '' }) {
  return (
    <article className={`card ${className}`.trim()}>
      {title && (
        <h2
          className="heading-large"
          style={{ margin: 0, marginBottom: 'var(--spacing-md)' }}
        >
          {title}
        </h2>
      )}
      {children}
    </article>
  )
}

export default Card;
