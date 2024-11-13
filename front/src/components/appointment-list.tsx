import React from "react";

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
  // Filtra os agendamentos com base no status
  const filteredAppointments = appointments.filter((appointment) => {
    if (statusFilter === "Todos") return true;
    return appointment.status === statusFilter;
  })
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {filteredAppointments.map((appointment) => (
        <div key={appointment.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
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
  );
};

export default AppointmentList;
