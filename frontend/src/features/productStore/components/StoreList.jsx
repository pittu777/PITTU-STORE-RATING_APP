

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStores, submitRating} from "../productStoreSlice";
import { toast } from "react-toastify";


const StoreList = () => {
  const dispatch = useDispatch();

  const { stores, loading, error } = useSelector((state) => state.store);
  const { user } = useSelector((state) => state.auth);
  const [selectedStoreId, setSelectedStoreId] = useState(null);
const [selectedRating, setSelectedRating] = useState("");

  
const handleSubmitRating = (storeId) => {
  if (!selectedRating) {
    toast.warn("Please select a rating before submitting.");
    return;
  }

  dispatch(submitRating({ storeId, rating: selectedRating }))
    .unwrap()
    .then(() => {
      toast.success("Rating submitted!");
    //   dispatch(getStores()); // refresh list
      setSelectedStoreId(null);
      setSelectedRating("");
    })
    .catch((error) => {
      toast.error(error || "Failed to submit rating.");
    });
};

  useEffect(() => {
    if (user) dispatch(getStores());
  }, [dispatch, user]);

  if (loading) return <p className="tw:text-center tw:mt-10">Loading stores...</p>;
  if (error) return <p className="tw:text-center tw:text-red-600 tw:mt-10">{error}</p>;

  return (
    <div className="tw:container tw:mx-auto tw:px-4 tw:py-6">
      <h1 className="tw:text-2xl tw:font-bold tw:text-center tw:mb-6">Stores Listing</h1>

      <div className="tw:grid tw:sm:grid-cols-2 tw:md:grid-cols-3 tw:gap-6">
        {stores.map((store) => (
          <div
            key={store.id}
            className="tw:bg-white tw:shadow-md tw:rounded-lg tw:p-5 tw:border tw:border-gray-200"
          >
            <h2 className="tw:text-lg tw:font-semibold tw:text-gray-800">{store.name}</h2>
            <p className="tw:text-sm tw:text-gray-600 tw:mt-1">{store.address}</p>

            <div className="tw:mt-3">
              <p>
                <span className="tw:font-medium">Overall Rating:</span>{" "}
                {store.overallRating ? `⭐ ${store.overallRating}` : "No ratings yet"}
              </p>

              {selectedStoreId === store.id ? (
  <div className="tw:mt-2">
    <select
      className="tw:border tw:rounded tw:px-2 tw:py-1"
      value={selectedRating}
      onChange={(e) => setSelectedRating(Number(e.target.value))}
    >
      <option value="">Select Rating</option>
      {[1, 2, 3, 4, 5].map((r) => (
        <option key={r} value={r}>
          {r}
        </option>
      ))}
    </select>
    <button
      className="tw:ml-2 tw:bg-green-600 tw:text-white tw:px-3 tw:py-1 tw:rounded tw:hover:bg-green-700 tw:text-sm"
      onClick={() => handleSubmitRating(store.id)}
    >
      Submit
    </button>
  </div>
) : store.userRating !== null ? (
  <p>
    <span className="tw:font-medium">Your Rating:</span> ⭐ {store.userRating}
  </p>
) : (
  <button
    className="tw:mt-2 tw:bg-blue-600 tw:text-white tw:px-3 tw:py-1 tw:rounded tw:hover:bg-blue-700 tw:text-sm"
    onClick={() => setSelectedStoreId(store.id)}
  >
    Rate This Store
  </button>
)}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreList;
