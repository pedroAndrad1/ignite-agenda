export const convertStringHoraToMinutoNumber = (stringHora: string) => {
  const [hora, minuto] = stringHora.split(':').map(Number)

  return hora * 60 + minuto
}
