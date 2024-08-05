import { Calendario } from '@/shared/components/Calendario'
import {
  CalendarioStepContainer,
  HorarioPickerItem,
  HorariosPickerContainer,
  HorariosPickerHeader,
  HorariosPickerList,
  HorariosPickerListLoader,
} from './styles'
import { useState } from 'react'
import dayjs from 'dayjs'
import { api } from '@/lib/axios'
import { usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { SpinnerGap } from 'phosphor-react'

interface HorariosDisponiveis {
  horario: number
  disponivel: boolean
}

interface HorariosDisponiveisResponse {
  horariosDisponiveis: HorariosDisponiveis[]
}

export function CalendarioStep() {
  const [selectedDia, setSelectedDia] = useState<Date | null>(null)
  const isDiaSelected = !!selectedDia
  const pathName = usePathname()
  const selectedDiaDaSemana = selectedDia && dayjs(selectedDia).format('dddd')
  const selectedDiaDoMes =
    selectedDia && dayjs(selectedDia).format('DD[ de ]MMMM')
  const getDisponibilidade = async () => {
    const { data } = await api.get<HorariosDisponiveisResponse>(
      `disponibilidade/${pathName.split('/')[2]}/horarios`,
      {
        params: {
          date: dayjs(selectedDia).format('YYYY-MM-DD'),
        },
      },
    )

    return data
  }
  const {
    data: horariosDisponiveisResponse,
    isLoading: horariosDisponiveisLoading,
  } = useQuery<HorariosDisponiveisResponse>({
    queryKey: ['disponibilidade', { selectedDia }],
    queryFn: getDisponibilidade,
    enabled: !!selectedDia,
  })

  return (
    <CalendarioStepContainer isHorariosPickerOpened={isDiaSelected}>
      <Calendario selectedDia={selectedDia} onSelectedDia={setSelectedDia} />
      {isDiaSelected && (
        <HorariosPickerContainer>
          <HorariosPickerHeader>
            {selectedDiaDaSemana} <span>{selectedDiaDoMes}</span>
          </HorariosPickerHeader>
          {!horariosDisponiveisLoading ? (
            <HorariosPickerList>
              {horariosDisponiveisResponse &&
                horariosDisponiveisResponse.horariosDisponiveis.map(
                  ({ horario, disponivel }) => (
                    <li key={horario}>
                      <HorarioPickerItem disabled={!disponivel}>
                        {String(horario).padStart(2, '0')}:00h -{' '}
                        {String(horario + 1).padStart(2, '0')}:00h
                      </HorarioPickerItem>
                    </li>
                  ),
                )}
            </HorariosPickerList>
          ) : (
            <HorariosPickerListLoader>
              <SpinnerGap size={32} color="#FFF" />
            </HorariosPickerListLoader>
          )}
        </HorariosPickerContainer>
      )}
    </CalendarioStepContainer>
  )
}
