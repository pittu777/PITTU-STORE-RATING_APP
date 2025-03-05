import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails } from "../profileApi";
import { useNavigate } from "react-router-dom";


const Profile = () => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    
  
    const { userDetails, status, error } = useSelector((state) => state.profile);
    console.log(userDetails);

    const handleClick = ()=>{
        nav('/home');
    }
    
    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

    if (status === "loading") return <p className="tw:text-center">Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <>
        <div>
            <h2>Profile</h2>
            {status==="loading"?(
                <div>
                    <p className="tw:text-center">Loading...</p>
                </div>
            ):userDetails?(
                <div className="tw:my-2">
                     <p className="tw:text-center"><strong>ID:</strong> {userDetails.id}</p>
        <p className="tw:text-center"><strong>Name:</strong> {userDetails.name}</p>
        <p className="tw:text-center"><strong>Email:</strong> {userDetails.email}</p>
                </div>
            ):(
                <p className="tw:text-center">No User found</p>
            )}
            
        </div>
        <div className="tw:flex tw:flex-col tw:items-center">

        <button onClick={handleClick} className="btn btn-primary">Go To Home</button>
        </div>
            </>
    );
};

export default Profile;
