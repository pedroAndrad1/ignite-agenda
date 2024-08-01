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

export function Calendario() {
  const shortWeekDays = getDiaDaSemana({ short: true })
  return (
    <CalendarioContainer>
      <CalendarioHeader>
        <CalendarioTitle>
          Dezembro <span>2022</span>
        </CalendarioTitle>
        <CalendarioActions>
          <button>
            <CaretLeft />
          </button>
          <button>
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
