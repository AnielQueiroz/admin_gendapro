const SummaryCard = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md lg:mb-4 lg:max-w-sm">
      <div className="flex justify-between items-center">
        <h3 className="text-base font-medium text-gray-600">Agendamentos de Hoje</h3>
        {/* <span className="text-2xl font-semibold text-blue-600">12</span> */}
      </div>
      <p className="text-sm text-gray-500 mt-2">4 pendentes, 2 concluídos</p>
    </div>
  );
};

export default SummaryCard;
