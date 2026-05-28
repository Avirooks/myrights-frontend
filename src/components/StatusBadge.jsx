function StatusBadge({ children, variant = 'info', className = '' }) {
  const variantMap = {
    success: 'success',
    warning: 'warning',
    info: 'info',
    error: 'info',
  }
  
  const badgeVariant = variantMap[variant] || 'info'

  return (
    <span className={`status-badge ${badgeVariant} ${className}`.trim()}>
      {children}
    </span>
  )
}

export default StatusBadge
