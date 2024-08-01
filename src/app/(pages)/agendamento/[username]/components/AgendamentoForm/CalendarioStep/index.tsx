import { Calendario } from '@/shared/components/Calendario'
import {
  CalendarioStepContainer,
  HorarioPickerItem,
  HorariosPickerContainer,
  HorariosPickerHeader,
  HorariosPickerList,
} from './styles'

export function CalendarioStep() {
  const isDateSelected = true

  return (
    <CalendarioStepContainer isHorariosPickerOpened={isDateSelected}>
      <Calendario />
      {isDateSelected && (
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
