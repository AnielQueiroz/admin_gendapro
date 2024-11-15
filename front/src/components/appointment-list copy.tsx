import React, { useState } from "react";

interface Appointment {
  id: number;
  clientName: string;
  time: string;
  service: string;
  status: "Pendente" | "Concluído" | "Cancelado" | "Todos";
}

interface AppointmentListProps {
  statusFilter: "Pendente" | "Concluído" | "Cancelado" | "Todos";
}

// Dados de agendamentos (mock)
const appointments: Appointment[] = [
  { id: 1, clientName: "Michel B. Jordan", time: "09:00", service: "Corte de cabelo", status: "Pendente" },
  { id: 2, clientName: "Chris Evans", time: "10:30", service: "Barba", status: "Concluído" },
  { id: 3, clientName: "Angelina Jolie", time: "11:00", service: "Hidratação", status: "Pendente" },
  { id: 4, clientName: "Richard Rios", time: "11:00", service: "Cabelo e Barba", status: "Concluído" },
  { id: 5, clientName: "Olivia Clark", time: "11:00", service: "Prancha", status: "Cancelado" },
  { id: 6, clientName: "Clark Kent", time: "12:00", service: "Salvar o dia", status: "Pendente" },
  { id: 7, clientName: "Louis Lane", time: "13:00", service: "Acompanhar o Clark", status: "Pendente" },
];

const AppointmentList: React.FC<AppointmentListProps> = ({ statusFilter }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filtra os agendamentos com base no status
  const filteredAppointments = appointments.filter((appointment) => {
    if (statusFilter === "Todos") return true;
    return appointment.status === statusFilter;
  });

  // Definir quantidade de cards para mostrar no mobile
  const visibleAppointments = isExpanded
    ? filteredAppointments
    : filteredAppointments.slice(0, 1); // Mostrar apenas o primeiro card inicialmente

  return (
    <div className="p-4">
      {/* Lista de Agendamentos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {visibleAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <h4 className="text-base font-semibold">{appointment.clientName}</h4>
              <p className="text-sm text-gray-500 font-bold">{appointment.service}</p>
              <p className="text-sm text-gray-500">{appointment.time}</p>
            </div>
            <span
              className={`text-sm font-medium ${
                appointment.status === "Pendente" ? "text-yellow-500" : "text-green-500"
              }`}
            >
              {appointment.status}
            </span>
          </div>
        ))}
      </div>

      {/* Botão de Expandir/Ocultar (Somente no mobile) */}
      <div className="block md:hidden mt-2 text-center">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-500 hover:text-blue-600 focus:outline-none"
        >
          {isExpanded ? "Ocultar" : "Expandir"}
        </button>
      </div>
    </div>
  );
};

export default AppointmentList;
