import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../profileApi";


const Profile = () => {
    const dispatch = useDispatch();
    
  
    const { userDetails, status, error } = useSelector((state) => state.profile);
    console.log(userDetails);
    
    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Profile</h2>
            {userDetails ? (
                <div>
                    <p><strong>ID:</strong> {userDetails.id}</p>
                    <p><strong>Name:</strong> {userDetails.name}</p>
                    <p><strong>Email:</strong> {userDetails.email}</p>
                </div>
            ) : (
                <p>No user details available.</p>
            )}
        </div>
    );
};

export default Profile;
