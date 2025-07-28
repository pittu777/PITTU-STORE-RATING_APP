

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addStore, fetchOwners, clearMessages } from "../adminSlice";

const AddStoreForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
    image:"",
  });

  const dispatch = useDispatch();
  const { owners, loading, error, success } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchOwners());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storeData = {
      ...form,
      image : form.image.trim()===""?null:form.image.trim()
    };
    dispatch(addStore(storeData));
  };

  useEffect(() => {
    if (success || error) {
      setTimeout(() => dispatch(clearMessages()), 3000);
    }
  }, [success, error, dispatch]);

  return (
    <div className="tw:bg-white tw:shadow tw:rounded-lg tw:p-6 tw:max-w-lg tw:mx-auto">
      <h2 className="tw:text-xl tw:font-bold tw:mb-4">Add New Store</h2>

      {success && <p className="tw:text-green-600">{success}</p>}
      {error && <p className="tw:text-red-600">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="tw:mb-4">
          <label className="tw:block tw:mb-1">Store Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="tw:w-full tw:border tw:px-3 tw:py-2 tw:rounded"
            required
          />
        </div>

        <div className="tw:mb-4">
          <label className="tw:block tw:mb-1">Store Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="tw:w-full tw:border tw:px-3 tw:py-2 tw:rounded"
            required
          />
        </div>

        <div className="tw:mb-4">
          <label className="tw:block tw:mb-1">Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="tw:w-full tw:border tw:px-3 tw:py-2 tw:rounded"
            required
          ></textarea>
        </div>


        
        <div className="tw:mb-4">
          <label className="tw:block tw:mb-1">Store Image URL</label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="tw:w-full tw:border tw:px-3 tw:py-2 tw:rounded"
            placeholder="https://example.com/store-image.jpg"
          />
          <p className="tw:text-xs tw:text-gray-500 tw-mt-1">
            Leave blank to use default store image
          </p>
        </div>

        <div className="tw:mb-4">
          <label className="tw:block tw:mb-1">Owner</label>
          <select
            name="ownerId"
            value={form.ownerId}
            onChange={handleChange}
            className="tw:w-full tw:border tw:px-3 tw:py-2 tw:rounded"
            required
          >
            <option value="">Select Owner</option>
            {owners.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.name} ({owner.email})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="tw:bg-blue-600 tw:text-white tw:px-4 tw:py-2 tw:rounded hover:tw:bg-blue-700"
        >
          {loading ? "Adding..." : "Add Store"}
        </button>
      </form>
    </div>
  );
};

export default AddStoreForm;