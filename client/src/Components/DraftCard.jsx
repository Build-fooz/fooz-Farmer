import { useState, useEffect } from "react";
import axios from "../Utils/middalware"; // Ensure the path is correct

const DraftCard = ({ userId, onEdit }) => {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const response = await axios.get(`/products/draft/${userId}`);
        console.log("Fetched drafts:", response.data);
        
        // ✅ Normalize drafts and ensure `uuid` is assigned
        const draftsData = Array.isArray(response.data) ? response.data : [response.data];
        const normalizedDrafts = draftsData.map((draft) => ({
          ...draft,
          uuid: draft.uuid || draft._id,
        }));
        setDrafts(normalizedDrafts);
      } catch (error) {
        console.error("Failed to fetch drafts:", error.response?.data?.message || error.message);
      }
    };

    if (userId) fetchDraft();
  }, [userId]);

  // ✅ Delete draft using `uuid`
  const handleDelete = async (uuid) => {
    if (!uuid) {
      console.error("Invalid UUID");
      return;
    }

    // Verify the draft with the provided uuid exists
    const draftExists = drafts.some((draft) => draft.uuid === uuid);
    if (!draftExists) {
      console.error(`Draft with UUID ${uuid} not found`);
      return;
    }

    try {
      await axios.delete(`/products/draft/${uuid}`); // ✅ Send `uuid` instead of `_id`
      setDrafts((prevDrafts) => prevDrafts.filter((draft) => draft.uuid !== uuid));
      console.log(`Draft with UUID ${uuid} deleted`);
    } catch (error) {
      console.error("Failed to delete draft:", error.response?.data?.message || error.message);
    }
  };

  // ✅ List draft using `uuid`
  const handleList = async (draft) => {
    try {
      const response = await axios.post(`/products/list/${draft.uuid}`);
      console.log("Draft listed successfully:", response.data);
  
      // ✅ Remove draft after listing
      setDrafts((prevDrafts) => prevDrafts.filter((d) => d.uuid !== draft.uuid));
    } catch (error) {
      console.error("Failed to list draft:", error.response?.data?.message || error.message);
    }
  };  

  if (drafts.length === 0) return <p>No draft available</p>;

  return (
    <div>
      {drafts.map((draft) => (
        <div key={draft.uuid} className="bg-white shadow-md p-4 rounded-lg mb-4">
          <h3 className="font-bold">{draft.productName}</h3>
          <p>Quantity: {draft.quantity} {draft.unit}</p>
          <p>Selling Price: ₹{draft.sellingPrice}</p>
          <p>Size: {draft.size}</p>
          <p>Notes: {draft.specialNotes}</p>
          <p>Sell To: {draft.sellTo}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onEdit(draft)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(draft.uuid)} // ✅ Use `uuid` for deletion
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
            <button
              onClick={() => handleList(draft)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
            >
              List
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DraftCard;