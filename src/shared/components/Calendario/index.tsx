import { CaretLeft, CaretRight } from 'phosphor-react'
import {
  CalendarioActions,
  CalendarioBody,
  CalendarioContainer,
  CalendarioDay,
  CalendarioHeader,
  CalendarioTitle,
} from './styles'
import { getDiaDaSemana } from '@/shared/utils/getDiaDaSemana'
import { useCallback, useMemo, useState } from 'react'
import dayjs from 'dayjs'

interface DiaDaSemana {
  dia: dayjs.Dayjs
  disabled: boolean
}
interface CalendarioSemana {
  semana: number
  diasDaSemana: DiaDaSemana[]
}
interface CalendarioProps {
  selectedDia: Date | null
  onSelectedDia: (dia: Date) => void
}

export function Calendario({ onSelectedDia }: CalendarioProps) {
  const [dataAtual, setDataAtual] = useState(dayjs().set('date', 1))

  const shortWeekDays = getDiaDaSemana({ short: true })
  const mesAtual = dataAtual.format('MMMM')
  const anoAtual = dataAtual.format('YYYY')

  const handleProximoMes = () => setDataAtual(dataAtual.add(1, 'M'))
  const handleMesAnterior = () => setDataAtual(dataAtual.subtract(1, 'M'))

  const calcSobrasDoMes = useCallback(() => {
    const primeiroDiaPrimeiraSemanaDoMes = dataAtual.get('day')
    const sobraMesAnterior = Array.from({
      length: primeiroDiaPrimeiraSemanaDoMes,
    })
      .map((_, i) => dataAtual.subtract(i + 1, 'day'))
      .reverse()

    const ultimoDiaDoMes = dataAtual.set('date', dataAtual.daysInMonth())
    const ultimoDiaUltimaSemanaDoMes = ultimoDiaDoMes.get('day')
    const sobraProximoMes = Array.from({
      length: 7 - (ultimoDiaUltimaSemanaDoMes + 1),
    }).map((_, i) => ultimoDiaDoMes.add(i + 1, 'day'))

    return [sobraMesAnterior, sobraProximoMes]
  }, [dataAtual])

  const convertDiasToSemanasDoMes = useCallback(
    (diasDoMesAndSobras: DiaDaSemana[]) => {
      return diasDoMesAndSobras.reduce<CalendarioSemana[]>(
        (acc, curr, i, original) => {
          const isNovaSemana = i % 7 === 0

          if (isNovaSemana) {
            acc.push({
              semana: i / 7 + 1,
              diasDaSemana: original.slice(i, i + 7),
            })
          }

          return acc
        },
        [],
      )
    },
    [],
  )

  const semanasDoCalendario = useMemo(() => {
    const diasDoMes = Array.from({ length: dataAtual.daysInMonth() }).map(
      (_, i) => dataAtual.set('date', i + 1),
    )
    const [sobraMesAnterior, sobraProximoMes] = calcSobrasDoMes()

    const diasDoMesAndSobras: DiaDaSemana[] = [
      ...sobraMesAnterior.map((dia) => ({ dia, disabled: true })),
      ...diasDoMes.map((dia) => ({
        dia,
        disabled: dia.endOf('date').isBefore(new Date()),
      })),
      ...sobraProximoMes.map((dia) => ({ dia, disabled: true })),
    ]

    return convertDiasToSemanasDoMes(diasDoMesAndSobras)
  }, [dataAtual, calcSobrasDoMes, convertDiasToSemanasDoMes])

  return (
    <CalendarioContainer>
      <CalendarioHeader>
        <CalendarioTitle>
          {mesAtual} <span>{anoAtual}</span>
        </CalendarioTitle>
        <CalendarioActions>
          <button onClick={() => handleMesAnterior()} title="Mês anterior">
            <CaretLeft />
          </button>
          <button onClick={() => handleProximoMes()} title="Próximo mês">
            <CaretRight />
          </button>
        </CalendarioActions>
      </CalendarioHeader>
      <CalendarioBody>
        <thead>
          <tr>
            {shortWeekDays.map((weekDay) => (
              <th key={weekDay}>{weekDay}.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {semanasDoCalendario.map(({ semana, diasDaSemana }) => (
            <tr key={semana}>
              {diasDaSemana.map(({ dia, disabled }) => (
                <td key={dia.toString()}>
                  <CalendarioDay
                    disabled={disabled}
                    onClick={() => onSelectedDia(dia.toDate())}
                  >
                    {dia.get('date')}
                  </CalendarioDay>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </CalendarioBody>
    </CalendarioContainer>
  )
}
