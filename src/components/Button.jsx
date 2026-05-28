function Button({ children, variant = 'primary', type = 'button', ...props }) {
  const className = variant === 'secondary' ? 'secondary' : 'primary'
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  )
}

export default Button
