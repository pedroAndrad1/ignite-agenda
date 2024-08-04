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
import { useState } from 'react'
import dayjs from 'dayjs'

export function Calendario() {
  const [dataAtual, setDataAtual] = useState(dayjs().set('date', 1))

  const shortWeekDays = getDiaDaSemana({ short: true })
  const mesAtual = dataAtual.format('MMMM')
  const anoAtual = dataAtual.format('YYYY')

  const proximoMes = () => setDataAtual(dataAtual.add(1, 'M'))
  const mesAnterior = () => setDataAtual(dataAtual.subtract(1, 'M'))

  return (
    <CalendarioContainer>
      <CalendarioHeader>
        <CalendarioTitle>
          {mesAtual} <span>{anoAtual}</span>
        </CalendarioTitle>
        <CalendarioActions>
          <button onClick={() => mesAnterior()} title="Mês anterior">
            <CaretLeft />
          </button>
          <button onClick={() => proximoMes()} title="Próximo mês">
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
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <CalendarioDay>1</CalendarioDay>
            </td>
            <td>
              <CalendarioDay>2</CalendarioDay>
            </td>
            <td>
              <CalendarioDay>3</CalendarioDay>
            </td>
          </tr>
        </tbody>
      </CalendarioBody>
    </CalendarioContainer>
  )
}
