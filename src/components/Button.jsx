import '../styles/components/button.css'

const Button = (props) => {
  const {
    className = '',
    onClick,
    children,
  } = props


  return (
    <button
      className={`button ${className}`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button