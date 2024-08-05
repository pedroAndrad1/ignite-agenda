import { Calendario } from '@/shared/components/Calendario'
import {
  CalendarioStepContainer,
  HorarioPickerItem,
  HorariosPickerContainer,
  HorariosPickerHeader,
  HorariosPickerList,
} from './styles'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { usePathname } from 'next/navigation'

interface Disponibilidade {
  horario: number
  disponivel: boolean
}

interface DisponibilidadeResponse {
  disponibilidades: Disponibilidade[]
}

export function CalendarioStep() {
  const [selectedDia, setSelectedDia] = useState<Date | null>(null)
  const [disponibilidades, setDisponibilidades] = useState<Disponibilidade[]>(
    [],
  )
  const isDiaSelected = !!selectedDia
  const pathName = usePathname()

  const selectedDiaDaSemana = selectedDia && dayjs(selectedDia).format('dddd')
  const selectedDiaDoMes =
    selectedDia && dayjs(selectedDia).format('DD[ de ]MMMM')

  useEffect(() => {
    if (!selectedDia) return

    api
      .get<DisponibilidadeResponse>(
        `disponibilidade/${pathName.split('/')[2]}`,
        {
          params: {
            date: dayjs(selectedDia).format('YYYY-MM-DD'),
          },
        },
      )
      .then((res) => setDisponibilidades(res.data.disponibilidades))
  }, [selectedDia, pathName])

  return (
    <CalendarioStepContainer isHorariosPickerOpened={isDiaSelected}>
      <Calendario selectedDia={selectedDia} onSelectedDia={setSelectedDia} />
      {isDiaSelected && (
        <HorariosPickerContainer>
          <HorariosPickerHeader>
            {selectedDiaDaSemana} <span>{selectedDiaDoMes}</span>
          </HorariosPickerHeader>
          <HorariosPickerList>
            {disponibilidades.map(({ horario, disponivel }) => (
              <li key={horario}>
                <HorarioPickerItem disabled={!disponivel}>
                  {String(horario).padStart(2, '0')}:00h -{' '}
                  {String(horario + 1).padStart(2, '0')}:00h
                </HorarioPickerItem>
              </li>
            ))}
          </HorariosPickerList>
        </HorariosPickerContainer>
      )}
    </CalendarioStepContainer>
  )
}
