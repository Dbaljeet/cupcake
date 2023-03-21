export const Cashformat = (value: number, limit: number) => {
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: limit,
    maximumFractionDigits: limit,
  })

  return formatter.format(value)
}
