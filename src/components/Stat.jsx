import '../styles/components/stat.css'

const Stat = (props) => {

  const {
    label,
    value,
    suffix
  } = props

  return (
    <div className="stat">
      <span className="stat__label">{label}: </span>
      <span className="stat__value">
        {value}
        {suffix && suffix}
      </span>
    </div>
  )
}

export default Stat

//Сделать компонент Stat коорый будет просто принимать разные пропсы при использовании в Game