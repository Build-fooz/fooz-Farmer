function Card({ title, description, onEdit, onList, onDelete }) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-4">{description}</p>
        
        {/* Buttons */}
        <div className="flex justify-between">
          {/* Edit Button */}
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded border border-blue-700 shadow-sm"
            onClick={onEdit}
          >
            Edit
          </button>
  
          {/* List Button */}
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded border border-green-700 shadow-sm"
            onClick={onList}
          >
            List
          </button>
  
          {/* Delete Button */}
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded border border-red-700 shadow-sm"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
  
  export default Card;