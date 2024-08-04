import { Calendario } from '@/shared/components/Calendario'
import {
  CalendarioStepContainer,
  HorarioPickerItem,
  HorariosPickerContainer,
  HorariosPickerHeader,
  HorariosPickerList,
} from './styles'
import { useState } from 'react'

export function CalendarioStep() {
  const [selectedDia, setSelectedDia] = useState<Date | null>(null)
  const isDiaSelected = !!selectedDia

  return (
    <CalendarioStepContainer isHorariosPickerOpened={isDiaSelected}>
      <Calendario selectedDia={selectedDia} onSelectedDia={setSelectedDia} />
      {isDiaSelected && (
        <HorariosPickerContainer>
          <HorariosPickerHeader>
            Terça Feira <span>20 de setembro</span>
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
