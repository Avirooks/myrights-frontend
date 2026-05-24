const badgeStyles = {
  info: {
    backgroundColor: 'var(--color-secondary)',
    color: 'var(--color-primary)',
    border: '1px solid var(--color-border)',
  },
  success: {
    backgroundColor: 'rgba(56, 142, 60, 0.12)',
    color: 'var(--color-success)',
    border: '1px solid rgba(56, 142, 60, 0.24)',
  },
  error: {
    backgroundColor: 'rgba(211, 47, 47, 0.12)',
    color: 'var(--color-error)',
    border: '1px solid rgba(211, 47, 47, 0.24)',
  },
}

function StatusBadge({ children, variant = 'info', className = '' }) {
  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--spacing-xxs)',
        padding: '0.4rem 0.75rem',
        borderRadius: '999px',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 700,
        lineHeight: 1,
        ...badgeStyles[variant],
      }}
    >
      {children}
    </span>
  )
}

export default StatusBadge;
