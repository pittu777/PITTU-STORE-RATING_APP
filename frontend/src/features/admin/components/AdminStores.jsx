
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteStore, fetchStores } from "../adminSlice";


// const AdminStores = () => {
//   const dispatch = useDispatch();
//   const { stores, loading, error } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchStores());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this store?")) {
//       dispatch(deleteStore(id));
//     }
//   };

//   if (loading) return <p>Loading stores...</p>;
//   if (error) return <p className="tw:text-red-600">{error}</p>;

//   return (
//     <ul className="tw:divide-y tw:mt-4">
//       {stores.map((store) => (
//         <li key={store.id} className="tw:py-3">
//           <strong>{store.name}</strong> — {store.address}
//           <br />
//           👑 Owner: {store.owner?.name || "N/A"} <br />
//           ⭐ Avg Rating: {store.averageRating || "0"}
//            <button
//             onClick={() => handleDelete(store.id)}
//             className="btn btn-danger"
//           >
//             Delete
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default AdminStores;


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteStore, fetchStores } from "../adminSlice";
import { toast } from "react-toastify";
import { FiTrash2, FiEdit, FiStar, FiMapPin, FiUser } from "react-icons/fi";
import { FiLoader } from "react-icons/fi";

const AdminStores = () => {
  const dispatch = useDispatch();
  const { stores, loading, error, actionLoading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      try {
        await dispatch(deleteStore(id)).unwrap();
        toast.success("Store deleted successfully");
        dispatch(fetchStores());
      } catch (error) {
        toast.error("Failed to delete store");
      }
    }
  };

  if (loading) return (
    <div className="tw:flex tw:justify-center tw:items-center tw:h-64">
      <FiLoader className="tw:animate-spin tw:text-2xl tw:text-blue-600" />
    </div>
  );

  if (error) return (
    <div className="tw:bg-red-100 tw:border-l-4 tw:border-red-500 tw:text-red-700 tw:p-4 tw:mb-4 tw:rounded">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="tw:space-y-4 tw:mt-6">
      <h2 className="tw:text-xl tw:font-bold tw:text-gray-800">Manage Stores</h2>
      
      {stores.length === 0 && (
        <div className="tw:bg-gray-50 tw:p-4 tw:rounded-lg tw:text-center tw:text-gray-500">
          No stores found
        </div>
      )}

      <div className="tw:grid tw:grid-cols-1 md:tw:grid-cols-2 lg:tw:grid-cols-3 tw:gap-4">
        {stores.map((store) => (
          <div key={store.id} className="tw:bg-white tw:rounded-lg tw:shadow tw:overflow-hidden tw:border tw:border-gray-100 hover:tw:shadow-md tw:transition-shadow">
            <div className="tw:p-4">
              <h3 className="tw:text-lg tw:font-semibold tw:text-gray-800 tw:mb-2">{store.name}</h3>
              
              <div className="tw:space-y-2 tw:text-sm">
                <div className="tw:flex tw:items-center tw:text-gray-600">
                  <FiMapPin className="tw:mr-2 tw:text-blue-500" />
                  <span>{store.address || "No address provided"}</span>
                </div>
                
                <div className="tw:flex tw:items-center tw:text-gray-600">
                  <FiUser className="tw:mr-2 tw:text-green-500" />
                  <span>Owner: {store.owner?.name || "N/A"}</span>
                </div>
                
                <div className="tw:flex tw:items-center tw:text-gray-600">
                  <FiStar className="tw:mr-2 tw:text-yellow-500" />
                  <span>Rating: {store.averageRating || "0.0"}</span>
                </div>
              </div>
            </div>
            
            <div className="tw:bg-gray-50 tw:px-4 tw:py-3 tw:flex tw:justify-end tw:space-x-2">
              <button
                onClick={() => handleDelete(store.id)}
                disabled={actionLoading}
                className="tw:flex tw:items-center tw:gap-1 tw:px-3 tw:py-1 tw:bg-red-50 tw:text-red-600 tw:rounded tw:text-sm hover:tw:bg-red-100 tw:transition-colors"
              >
                <FiTrash2 size={14} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStores;