import { useState } from 'react'
import { CalendarioStep } from './CalendarioStep'
import { ConfirmacaoStep } from './ConfirmacaoStep'

export function AgendamentoForm() {
  const [agendamento, setAgendamento] = useState<Date | null>(null)
  const cancelAgendamento = () => setAgendamento(null)

  if (agendamento)
    return (
      <ConfirmacaoStep
        agendamento={agendamento}
        cancel={cancelAgendamento}
      ></ConfirmacaoStep>
    )

  return <CalendarioStep onHorarioSelect={setAgendamento}></CalendarioStep>
}
