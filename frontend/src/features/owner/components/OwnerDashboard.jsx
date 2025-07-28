

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOwnerStores } from "../ownerSlice";
import DEFAULT_IMAGE from "./../../../assets/logo.png";

const OwnerDashboard = () => {
  const dispatch = useDispatch();
  const { stores, loading, error } = useSelector((state) => state.owner);

  useEffect(() => {
    dispatch(fetchOwnerStores());
  }, [dispatch]);

  if (loading) return <p className="tw:text-center">Loading your stores...</p>;
  if (error) return <p className="tw:text-red-600 tw:text-center">{error} Please contact the admin</p>;

  return (
    <div className="tw:container tw:mx-auto tw:p-4">
      <h2 className="tw:text-2xl tw:font-bold tw:mb-4">Owner Dashboard</h2>

      {stores.length === 0 ? (
        <p>No stores found.</p>
      ) : (
        stores.map((store) => (
          <div key={store.id} className="tw:border tw:rounded tw:p-4 tw:mb-4 tw:bg-white">
                          <div className="card" style={{"width": "20rem"}}>
              <img src={store.image || DEFAULT_IMAGE} className="card-img-top" alt="..."/>
              
            </div>
            <h3 className="tw:text-xl tw:font-semibold">{store.name}</h3>
            <p className="tw:text-sm">📍 {store.address}</p>
            <p className="tw:mt-2">⭐ Avg Rating: {store.averageRating ?? "No ratings yet"}</p>
            <p>Total Ratings: {store.totalRatings}</p>

            {store.ratings?.length > 0 && (
              <div className="tw:mt-4">
                <h4 className="tw:font-semibold">Customer Ratings:</h4>
                <ul className="tw:list-disc tw:ml-6">
                  {store.ratings.map((r, i) => (
                    <li key={i}>
                      <strong>{r.user.name}</strong> ({r.user.email}) - ⭐ {r.rating}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default OwnerDashboard;
