

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStores, submitRating } from "../productStoreSlice";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
import DEFAULT_STORE_IMAGE from "./../../../../src/assets/logo.png"

const StoreList = () => {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.store);
  const { user } = useSelector((state) => state.auth);

  console.log(stores);

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


      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
  {stores.map((store) => (
    
    <div key={store.id} className="col">
      <div className="card h-100 shadow-sm border-0">
        {/* Optional card image - uncomment if you have store images */}
        <img 
          src={store.image? store.image: DEFAULT_STORE_IMAGE} 
          className="card-img-top" 
          alt={store.name}
          
        />
        
        <div className="card-body">
          <h5 className="card-title fw-semibold mb-2">{store.name}</h5>
          <p className="card-text text-muted small mb-3">{store.address}</p>
          
          <div className="border-top pt-3">
            <p className="mb-2">
              <span className="fw-medium">Overall Rating:</span>{" "}
              {store.overallRating ? (
                <span className="d-inline-flex align-items-center">
                  ⭐ {store.overallRating}
                </span>
              ) : (
                "No ratings yet"
              )}
            </p>

            {activeStoreId === store.id ? (
              updatingStoreId === store.id ? (
                <p className="text-primary small mt-2">Updating rating...</p>
              ) : (
                renderStars(store.id, store.userRating)
              )
            ) : store.userRating !== null ? (
              <>
                <p className="mb-3">
                  <span className="fw-medium">Your Rating:</span>{" "}
                  <span className="d-inline-flex align-items-center">
                    ⭐ {store.userRating}
                  </span>
                </p>
                <button
                  className="btn btn-primary btn-sm w-100"
                  onClick={() => setActiveStoreId(store.id)}
                >
                  Edit Rating
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary btn-sm w-100"
                onClick={() => setActiveStoreId(store.id)}
              >
                Rate This Store
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default StoreList;
