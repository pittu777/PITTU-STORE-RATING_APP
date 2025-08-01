// import React, { useState } from "react";
// import { useSelector } from "react-redux";
// import AdminHome from "./AdminHome";
// import AdminUsers from "./AdminUsers";
// import AdminStores from "./AdminStores";
// import AddStoreForm from "./AddStoreForm";

// const AdminDashboard = () => {
//   const [tab, setTab] = useState("home");
//   const { admin } = useSelector((state) => state.adminAuth);



  

//   if (!admin || admin.role !== "ADMIN") {
//     return <div className="tw:text-center tw:text-red-600 tw:mt-10">Access Denied</div>;
//   }

//   return (
//     <div className="tw:container tw:mx-auto tw:px-4 tw:py-6">
//       <h1 className="tw:text-2xl tw:font-bold tw:text-center">Admin Dashboard</h1>

//       <div className="tw:flex tw:gap-3 tw:justify-center tw:flex-wrap tw:my-6">
//         <button
//           className={`tw:px-4 tw:py-2 tw:rounded ${
//             tab === "home" ? "tw:bg-blue-600 tw:text-white" : "tw:bg-gray-200"
//           }`}
//           onClick={() => setTab("home")}
//         >
//           🏠 Home
//         </button>
//         <button
//           className={`tw:px-4 tw:py-2 tw:rounded ${
//             tab === "users" ? "tw:bg-blue-600 tw:text-white" : "tw:bg-gray-200"
//           }`}
//           onClick={() => setTab("users")}
//         >
//           👤 All Users
//         </button>
//         <button
//           className={`tw:px-4 tw:py-2 tw:rounded ${
//             tab === "stores" ? "tw:bg-blue-600 tw:text-white" : "tw:bg-gray-200"
//           }`}
//           onClick={() => setTab("stores")}
//         >
//           🏬 All Stores
//         </button>
//         <button
//           className={`tw:px-4 tw:py-2 tw:rounded ${
//             tab === "add" ? "tw:bg-blue-600 tw:text-white" : "tw:bg-gray-200"
//           }`}
//           onClick={() => setTab("add")}
//         >
//           ➕ Add Store
//         </button>
//       </div>

//       <div>
//         {tab === "home" && <AdminHome />}
//         {tab === "users" && <AdminUsers />}
//         {tab === "stores" && <AdminStores />}
//         {tab === "add" && <AddStoreForm />}
//       </div>
      
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminHome from "./AdminHome";
import AdminUsers from "./AdminUsers";
import AdminStores from "./AdminStores";
import AddStoreForm from "./AddStoreForm";
import Navbar from "../../../layouts/Navbar";


const AdminDashboard = () => {
  const [tab, setTab] = useState("home");
  const {admin } = useSelector((state) => state.adminAuth);

  if (!admin || admin.role !== "ADMIN") {
    return <div className="tw:text-center tw:text-red-600 tw:mt-10">Access Denied</div>;
  }

  return (
    <>
      <Navbar onTabChange={setTab} currentTab={tab} />
      <div className="tw:container tw:mx-auto tw:px-4 tw:py-6">
        {tab === "home" && <AdminHome />}
        {tab === "users" && <AdminUsers />}
        {tab === "stores" && <AdminStores />}
        {tab === "add" && <AddStoreForm />}
      </div>
    </>
  );
};

export default AdminDashboard;
