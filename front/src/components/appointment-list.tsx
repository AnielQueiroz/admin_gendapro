const appointments = [
  { id: 1, clientName: "João Silva", time: "09:00", status: "Pendente" },
  { id: 2, clientName: "Maria Oliveira", time: "10:30", status: "Concluído" },
  { id: 3, clientName: "Pedro Santos", time: "11:00", status: "Pendente" },
];

const AppointmentList = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center">
          <div>
            <h4 className="text-base font-semibold">{appointment.clientName}</h4>
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
