export function Input({
  name,
  label,
  type,
  placeholder
}: {
  name: string
  label: string
  type: string
  placeholder: string
}) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="form-input"
      />
    </div>
  )
}
