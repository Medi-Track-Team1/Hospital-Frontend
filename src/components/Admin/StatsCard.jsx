const StatsCard = ({ title, value, change, trend }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <span className={`ml-2 text-sm font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
      </div>
      <div className="mt-4">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              trend === 'up' ? 'bg-green-500' : 'bg-red-500'
            }`}
            style={{ width: trend === 'up' ? '75%' : '40%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;