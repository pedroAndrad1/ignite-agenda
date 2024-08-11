import { CaretLeft, CaretRight, SpinnerGap } from 'phosphor-react'
import {
  CalendarioActions,
  CalendarioBody,
  CalendarioContainer,
  CalendarioDay,
  CalendarioHeader,
  CalendarioLoader,
  CalendarioTitle,
} from './styles'
import { getDiaDaSemana } from '@/shared/utils/getDiaDaSemana'
import { useCallback, useEffect, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { Tooltip } from '@pedroandrad1/react'

interface DiaDaSemana {
  dia?: dayjs.Dayjs
  disabled: boolean
}
interface CalendarioSemana {
  semana: number
  diasDaSemana: DiaDaSemana[]
}
interface CalendarioProps {
  onSelectedDia: (dia: Date) => void
  diasDaSemanaIndisponiveis?: number[]
  diasDoMesIndisponiveis?: number[]
  isLoading?: boolean
  onMesChange?: (data: string) => void
}

export function Calendario({
  diasDaSemanaIndisponiveis,
  diasDoMesIndisponiveis,
  onSelectedDia,
  onMesChange,
  isLoading,
}: CalendarioProps) {
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

    const ultimoDiaDoMes = dataAtual.set('date', dataAtual.daysInMonth())
    const ultimoDiaUltimaSemanaDoMes = ultimoDiaDoMes.get('day')
    const sobraProximoMes = Array.from({
      length: 7 - (ultimoDiaUltimaSemanaDoMes + 1),
    })

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
      ...sobraMesAnterior.map(() => ({ disabled: true })),
      ...diasDoMes.map((dia) => ({
        dia,
        disabled:
          dia.endOf('date').isBefore(new Date()) ||
          (diasDaSemanaIndisponiveis || []).includes(dia.get('day')) ||
          (diasDoMesIndisponiveis || []).includes(dia.get('date')),
      })),
      ...sobraProximoMes.map(() => ({ disabled: true })),
    ]

    return convertDiasToSemanasDoMes(diasDoMesAndSobras)
  }, [
    dataAtual,
    calcSobrasDoMes,
    convertDiasToSemanasDoMes,
    diasDaSemanaIndisponiveis,
    diasDoMesIndisponiveis,
  ])

  useEffect(() => {
    if (onMesChange) onMesChange(dataAtual.toISOString())
  }, [onMesChange, dataAtual])

  return (
    <CalendarioContainer>
      {isLoading ? (
        <CalendarioLoader>
          <SpinnerGap size={32} color="#FFF" />
        </CalendarioLoader>
      ) : (
        <>
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
                  {diasDaSemana.map(({ dia, disabled }, i) => (
                    <td key={`${i}__dia_calendario`}>
                      {dia ? (
                        <Tooltip
                          trigger={
                            <CalendarioDay
                              disabled={disabled}
                              onClick={() => onSelectedDia(dia.toDate())}
                            >
                              {dia?.get('date')}
                            </CalendarioDay>
                          }
                          content={`${dia?.format('DD[ de ]MMMM')} - ${disabled ? 'Indisponível' : 'Disponível'}`}
                        />
                      ) : (
                        <CalendarioDay disabled={disabled}></CalendarioDay>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </CalendarioBody>
        </>
      )}
    </CalendarioContainer>
  )
}
