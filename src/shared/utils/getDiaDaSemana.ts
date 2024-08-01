interface GetDiaDaSemanaParams {
  short?: boolean
}

export const getDiaDaSemana = ({ short }: GetDiaDaSemanaParams) => {
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

    if (short) {
      return diaDaSemanaFormatted.substring(0, 3).toLocaleUpperCase()
    }

    const diaDaSemanaCapitalized = diaDaSemanaFormatted
      .substring(0, 1)
      .toLocaleUpperCase()
      .concat(diaDaSemanaFormatted.substring(1))

    return diaDaSemanaCapitalized
  })
}
