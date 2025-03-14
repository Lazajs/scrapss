export function Input({
  name,
  label,
  type,
  placeholder,
  disabled,
  error,
  defaultValue
}: {
  name: string
  label: string
  type: string
  placeholder: string
  disabled?: boolean
  error?: string
  defaultValue?: string
}) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        min={
          type === 'date'
            ? new Date().toISOString().slice(0, 10)
            : type === 'number'
            ? '60'
            : undefined
        }
        name={name}
        placeholder={placeholder}
        className={`form-input ${error ? 'border-red-500' : ''}`}
        disabled={disabled}
        defaultValue={defaultValue}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}
