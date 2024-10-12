import React, { useEffect, useState } from "react";
import { User, UsersData } from "../shared/types";
import httpClient from "../../axios";
// import { useAuth } from "../../context/authContext";

const AdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // const { handleLogout } = useAuth();

  const getUsers = async (page = 1, limit = 10) => {
    try {
      const response = await httpClient.get<UsersData>(`/users?page=${page}&limit=${limit}`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleSelectUser = (id: string) => {
    setSelectedUsers((prev) => (prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]));
  };

  const updateUsersState = (key: keyof User, value: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (selectedUsers.includes(user.id) ? { ...user, [key]: value } : user))
    );

    setSelectedUsers([]);
  };

  const updateUserStatus = async (status: "blocked" | "active") => {
    try {
      const endpoint = status === "blocked" ? "/users/block" : "/users/unblock";
      await Promise.all(selectedUsers.map((id) => httpClient.put(`${endpoint}/${id}`)));
      updateUsersState("status", status);
    } catch (error) {
      console.error(`Error updating users to ${status}:`, error);
    }
  };

  const deleteUsers = async () => {
    try {
      await Promise.all(selectedUsers.map((id) => httpClient.delete(`/users/${id}`)));
      setUsers((prevUsers) => prevUsers.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error deleting users:", error);
    }
  };

  const updateUserRole = async (role: "user" | "admin") => {
    try {
      await Promise.all(selectedUsers.map((id) => httpClient.put(`/users/role/${id}`, { role })));
      updateUsersState("role", role);
    } catch (error) {
      console.error("Error changing user role:", error);
    }
  };

  return (
    <div className="mt-5 container">
      <div className=" mb-2 d-flex gap-2 align-items-center">
        <button onClick={() => updateUserStatus("blocked")} className="btn btn-danger">
          Block
        </button>

        <button onClick={() => updateUserStatus("active")} className="border-0 bg-transparent">
          <i className="bi bi-check-circle fs-4"></i>
        </button>
        <button onClick={deleteUsers} className="border-0 bg-transparent">
          <i className="bi bi-trash fs-4"></i>
        </button>

        <select
          onChange={(e) => updateUserRole(e.target.value as "user" | "admin")}
          className="form-select form-select-sm w-25"
          aria-label="Small select example"
          defaultValue="">
          <option value="" disabled>
            Select role
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>
                <input
                  className="form-check-input"
                  type="checkbox"
                  onChange={(e) => {
                    setSelectedUsers(e.target.checked ? users.map((user) => user.id) : []);
                  }}
                />
              </th>

              <th>UserName</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={user.status === "blocked" ? "table-warning" : "table-light"}>
                <td>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role} </td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
