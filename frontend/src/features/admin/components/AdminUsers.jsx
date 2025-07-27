

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteUser, fetchUsers, updateUserRole } from "../adminSlice";
// import { toast } from "react-toastify";
// import { FiTrash2, FiLoader } from "react-icons/fi";

// const AdminUsers = () => {
//   const dispatch = useDispatch();
//   const { users, loading, error, actionLoading } = useSelector((state) => state.admin);

//   useEffect(() => {
//     dispatch(fetchUsers());
//   }, [dispatch]);

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       dispatch(deleteUser(id))
//         .unwrap()
//         .then(() => {
//           toast.success("User deleted successfully");
//           dispatch(fetchUsers());
//         })
//         .catch(() => toast.error("Failed to delete user"));
//     }
//   };

//   const handleUpdate = (id,role) => {
//     if (window.confirm("Are you sure you want to update the role?")) {
//       dispatch(updateUserRole({id,role}))
//         .unwrap()
//         .then(() => {
//           toast.success("User role updated successfully");
//           dispatch(fetchUsers());
//         })
//         .catch(() => toast.error("Failed to update user role"));
//     }
//   };

//   if (loading) return (
//     <div className="tw:flex tw:justify-center tw:items-center tw:h-64">
//       <FiLoader className="tw:animate-spin tw:text-2xl tw:text-blue-600" />
//     </div>
//   );
  
//   if (error) return (
//     <div className="tw:bg-red-100 tw:border-l-4 tw:border-red-500 tw:text-red-700 tw:p-4 tw:mb-4">
//       <p>{error}</p>
//     </div>
//   );

//   return (
//     <div className="tw:overflow-x-auto tw:shadow-md tw:rounded-lg">
//       <table className="tw:w-full tw:text-sm tw:text-left tw:text-gray-500">
//         <thead className="tw:text-xs tw:text-gray-700 tw:uppercase tw:bg-gray-50">
//           <tr>
//             <th scope="col" className="tw:px-6 tw:py-3">ID</th>
//             <th scope="col" className="tw:px-6 tw:py-3">Name</th>
//             <th scope="col" className="tw:px-6 tw:py-3">Email</th>
//             <th scope="col" className="tw:px-6 tw:py-3">Role</th>
//             <th scope="col" className="tw:px-6 tw:py-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id} className="tw:bg-white tw:border-b hover:tw:bg-gray-50">
//               <td className="tw:px-6 tw:py-4">{u.id}</td>
//               <td className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-900">{u.name}</td>
//               <td className="tw:px-6 tw:py-4">{u.email}</td>
//               <td className="tw:px-6 tw:py-4">
//                 <select
//                   className="tw:bg-gray-50 tw:border tw:border-gray-300 tw:text-gray-900 tw:text-sm tw:rounded-lg focus:tw:ring-blue-500 focus:tw:border-blue-500 tw:block tw:w-full tw:p-2"
//                   value={u.role}
//                   onChange={(e) => handleUpdate(u.id, e.target.value)}
//                   disabled={actionLoading}
//                 >
//                   {["ADMIN", "OWNER", "USER"].map((r) => (
//                     <option key={r} value={r}>
//                       {r}
//                     </option>
//                   ))}
//                 </select>
//               </td>
//               <td className="tw:px-6 tw:py-4">
//                 <button
//                   onClick={() => handleDelete(u.id)}
//                   className="tw:flex tw:items-center tw:gap-1 tw:text-red-600 hover:tw:text-red-800 tw:font-medium"
//                   disabled={actionLoading}
//                 >
//                   <FiTrash2 className="tw:inline" /> Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default AdminUsers;




import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers, updateUserRole } from "../adminSlice";
import { toast } from "react-toastify";
import { FiTrash2, FiLoader, FiSearch } from "react-icons/fi";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading, error, actionLoading } = useSelector((state) => state.admin);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(id))
        .unwrap()
        .then(() => {
          toast.success("User deleted successfully");
          dispatch(fetchUsers());
        })
        .catch(() => toast.error("Failed to delete user"));
    }
  };

  const handleUpdate = (id, role) => {
    if (window.confirm("Are you sure you want to update the role?")) {
      dispatch(updateUserRole({ id, role }))
        .unwrap()
        .then(() => {
          toast.success("User role updated successfully");
          dispatch(fetchUsers());
        })
        .catch(() => toast.error("Failed to update user role"));
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  });

  if (loading) return (
    <div className="tw:flex tw:justify-center tw:items-center tw:h-64">
      <FiLoader className="tw:animate-spin tw:text-2xl tw:text-blue-600" />
    </div>
  );

  if (error) return (
    <div className="tw:bg-red-100 tw:border-l-4 tw:border-red-500 tw:text-red-700 tw:p-4 tw:mb-4">
      <p>{error}</p>
    </div>
  );

  return (
    <div className="tw:space-y-4">
      
      <div className="tw:relative tw:w-full tw:max-w-md">
        <div className="tw:absolute tw:inset-y-0 tw:left-0 tw:flex tw:items-center tw:pl-3 tw:pointer-events-none">
          <FiSearch className="tw:text-gray-400" />
        </div>
        <input
          type="text"
          className="tw:bg-gray-50 tw:border tw:border-gray-300 tw:text-gray-900 tw:text-sm tw:rounded-lg focus:tw:ring-blue-500 focus:tw:border-blue-500 tw:block tw:w-full tw:pl-10 tw:p-2.5"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

     
      <div className="tw:overflow-x-auto tw:shadow-md tw:rounded-lg">
        <table className="tw:w-full tw:text-sm tw:text-left tw:text-gray-500">
          <thead className="tw:text-xs tw:text-gray-700 tw:uppercase tw:bg-gray-50">
            <tr>
              <th scope="col" className="tw:px-6 tw:py-3">ID</th>
              <th scope="col" className="tw:px-6 tw:py-3">Name</th>
              <th scope="col" className="tw:px-6 tw:py-3">Email</th>
              <th scope="col" className="tw:px-6 tw:py-3">Role</th>
              <th scope="col" className="tw:px-6 tw:py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u.id} className="tw:bg-white tw:border-b hover:tw:bg-gray-50">
                  <td className="tw:px-6 tw:py-4">{u.id}</td>
                  <td className="tw:px-6 tw:py-4 tw:font-medium tw:text-gray-900">{u.name}</td>
                  <td className="tw:px-6 tw:py-4">{u.email}</td>
                  <td className="tw:px-6 tw:py-4">
                    <select
                      className="tw:bg-gray-50 tw:border tw:border-gray-300 tw:text-gray-900 tw:text-sm tw:rounded-lg focus:tw:ring-blue-500 focus:tw:border-blue-500 tw:block tw:w-full tw:p-2"
                      value={u.role}
                      onChange={(e) => handleUpdate(u.id, e.target.value)}
                      disabled={actionLoading}
                    >
                      {["OWNER", "USER"].map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="tw:px-6 tw:py-4">
                    <button
                      onClick={() => handleDelete(u.id)}
                      className="tw:flex tw:items-center tw:gap-1 tw:text-red-600 hover:tw:text-red-800 tw:font-medium"
                      disabled={actionLoading}
                    >
                      <FiTrash2 className="tw:inline" /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="tw:px-6 tw:py-4 tw:text-center">
                  No users found matching your search
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;