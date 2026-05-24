function Button({ children, variant = 'primary', type = 'button', className = '', ...props }) {
  const variantClass = variant === 'secondary' ? 'secondary' : 'primary'

  return (
    <button type={type} className={`${variantClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  )
}

export default Button;
