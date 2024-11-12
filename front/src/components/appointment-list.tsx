const appointments = [
  { id: 1, clientName: "João Silva", time: "09:00", status: "Pendente" },
  { id: 2, clientName: "Maria Oliveira", time: "10:30", status: "Concluído" },
  { id: 3, clientName: "Pedro Santos", time: "11:00", status: "Pendente" },
];

const AppointmentList = () => {
  return (
    <div className="space-y-2">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="p-3 bg-white rounded-lg shadow-sm flex justify-between">
          <div>
            <h4 className="text-sm font-semibold">{appointment.clientName}</h4>
            <p className="text-xs text-gray-500">{appointment.time}</p>
          </div>
          <span
            className={`text-xs ${
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
