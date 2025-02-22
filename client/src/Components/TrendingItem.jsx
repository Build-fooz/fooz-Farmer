const TrendingItem = ({ name, status }) => (
    <div className="flex justify-between text-gray-700 text-sm">
      <span>{name}</span>
      <span className="text-green-500 font-medium">{status}</span>
    </div>
  );
  
  export default TrendingItem;
  