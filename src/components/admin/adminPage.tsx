/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { User, UsersData } from "../shared/types";
import httpClient from "../../axios";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import Pagination from "../shared/pagination";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const { activeUser, handleLogout, updateActiveUser } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const getUsers = async (page = 1, limit = 10) => {
    try {
      const response = await httpClient.get<UsersData>(`/users?page=${page}&limit=${limit}`);
      console.log(response);
      setUsers(response.data.users);

      setTotalPages(Math.ceil(response.data.totalUsers / limit));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (activeUser?.status === "blocked") {
      handleLogout();
    }
    if (activeUser?.role !== "admin") {
      navigate("/home");
    }
  }, [activeUser?.status, activeUser?.role, handleLogout, navigate]);

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

      if (selectedUsers.includes(activeUser?.id as string)) {
        updateActiveUser({ status });
      }
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

      if (selectedUsers.includes(activeUser?.id as string)) {
        updateActiveUser({ role });
      }
    } catch (error) {
      console.error("Error changing user role:", error);
    }
  };

  return (
    <div className="mt-5 container">
      <div className=" mb-3 d-flex justify-content-between">
        <div className="d-flex gap-2">
          <button onClick={() => updateUserStatus("blocked")} className="btn btn-secondary">
            Block
          </button>
          <button onClick={() => updateUserStatus("active")} className="btn btn-success">
            Unblock
          </button>
          <button onClick={deleteUsers} className="btn btn-danger">
            Delete
          </button>
        </div>

        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            Update role
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li>
              <a className="dropdown-item" onClick={() => updateUserRole("admin")}>
                Admin
              </a>
            </li>
            <li>
              <a className="dropdown-item" onClick={() => updateUserRole("user")}>
                User
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
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

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default AdminPage;
