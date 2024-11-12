const SummaryCard = () => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-600">Agendamentos de Hoje</h3>
                <span className="text-lg font-semibold text-blue-600">12</span>
            </div>
            <p className="text-xs text-gray-500">2 pendentes, 5 concluídos</p>
        </div>
    );
}

export default SummaryCard;