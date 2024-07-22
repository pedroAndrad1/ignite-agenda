export const getDiaDaSemana = () => {
  const formatter = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
  })
  // Array [0,...,6]
  const diasDaSemanaRaw = Array.from(Array(7).keys())

  return diasDaSemanaRaw.map((diaDaSemana) => {
    const diaDaSemanaFormatted = formatter.format(
      // Um ano e um mes no qual o dia 0 seja domingo
      new Date(Date.UTC(2021, 5, diaDaSemana)),
    )
    const diaDaSemanaCapitalized = diaDaSemanaFormatted
      .substring(0, 1)
      .toLocaleUpperCase()
      .concat(diaDaSemanaFormatted.substring(1))

    return diaDaSemanaCapitalized
  })
}
