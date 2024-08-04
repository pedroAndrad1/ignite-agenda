import { Calendario } from '@/shared/components/Calendario'
import {
  CalendarioStepContainer,
  HorarioPickerItem,
  HorariosPickerContainer,
  HorariosPickerHeader,
  HorariosPickerList,
} from './styles'
import { useState } from 'react'
import dayjs from 'dayjs'

export function CalendarioStep() {
  const [selectedDia, setSelectedDia] = useState<Date | null>(null)
  const isDiaSelected = !!selectedDia

  const selectedDiaDaSemana = selectedDia && dayjs(selectedDia).format('dddd')
  const selectedDiaDoMes =
    selectedDia && dayjs(selectedDia).format('DD[ de ]MMMM')

  return (
    <CalendarioStepContainer isHorariosPickerOpened={isDiaSelected}>
      <Calendario selectedDia={selectedDia} onSelectedDia={setSelectedDia} />
      {isDiaSelected && (
        <HorariosPickerContainer>
          <HorariosPickerHeader>
            {selectedDiaDaSemana} <span>{selectedDiaDoMes}</span>
          </HorariosPickerHeader>
          <HorariosPickerList>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
            <li>
              <HorarioPickerItem>08:00h</HorarioPickerItem>
            </li>
          </HorariosPickerList>
        </HorariosPickerContainer>
      )}
    </CalendarioStepContainer>
  )
}
