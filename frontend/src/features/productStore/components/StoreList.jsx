

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStores, submitRating } from "../productStoreSlice";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const StoreList = () => {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.store);
  const { user } = useSelector((state) => state.auth);

  const [activeStoreId, setActiveStoreId] = useState(null);
  const [hoverRating, setHoverRating] = useState(0);
  const [updatingStoreId, setUpdatingStoreId] = useState(null);

  useEffect(() => {
    if (user) dispatch(getStores());
  }, [dispatch, user]);

  const handleRatingClick = (storeId, rating) => {
    setUpdatingStoreId(storeId);
    dispatch(submitRating({ storeId, rating }))
      .unwrap()
      .then(() => {
        toast.success("Rating updated!");
        const updatedStores = stores.map((store) =>
          store.id === storeId ? { ...store, userRating: rating } : store
        );
        setActiveStoreId(null);
        setHoverRating(0);
        setUpdatingStoreId(null);
      
      })
      .catch((error) => {
        toast.error(error || "Failed to rate store.");
        setUpdatingStoreId(null);
      });
  };

  const renderStars = (storeId, currentRating) => (
    <div className="tw:flex tw:items-center tw:gap-1 tw:mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={20}
          onClick={() => handleRatingClick(storeId, star)}
          className={`tw:cursor-pointer ${
            star <= (hoverRating || currentRating)
              ? "tw:text-yellow-500"
              : "tw:text-gray-400"
          }`}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );

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

              {activeStoreId === store.id ? (
                updatingStoreId === store.id ? (
                  <p className="tw:text-sm tw:mt-2 tw:text-blue-500">Updating rating...</p>
                ) : (
                  renderStars(store.id, store.userRating)
                )
              ) : store.userRating !== null ? (
                <>
                  <p>
                    <span className="tw:font-medium">Your Rating:</span> ⭐ {store.userRating}
                  </p>
                  <button
                    className="tw:mt-2 tw:bg-blue-600 tw:text-white tw:px-3 tw:py-1 tw:rounded tw:hover:bg-blue-700 tw:text-sm"
                    onClick={() => setActiveStoreId(store.id)}
                  >
                    Edit Rating
                  </button>
                </>
              ) : (
                <button
                  className="tw:mt-2 tw:bg-blue-600 tw:text-white tw:px-3 tw:py-1 tw:rounded tw:hover:bg-blue-700 tw:text-sm"
                  onClick={() => setActiveStoreId(store.id)}
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
