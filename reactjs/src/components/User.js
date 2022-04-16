import React, { useState, useEffect } from "react";
import { config } from "dotenv";

config();

const API = "http://localhost:5000";

export const User = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name === "" || email === "" || password === "") return;

    if (!edit) {
      const res = await fetch(`${API}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const a = await res.json();
      console.log(a);
    } else {
      const res = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      setEdit(false);
      setId('')
      const a = await res.json();
      console.log(a);
    }

    setName("");
    setEmail("");
    setPassword("");
    getUsers();
  };

  const getUsers = async () => {
    const res = await fetch(`${API}/users`);
    const users = await res.json();
    setUsers(users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirm = window.confirm("Are you sure?!");
    if (!confirm) return;

    const res = await fetch(`${API}/users/${id}`, { method: "DELETE" });
    const data = await res.json();
    await getUsers();
    console.log(data);
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/users/${id}`);
    const data = await res.json();

    setEdit(true);
    setId(id);
    setName(data.name);
    setEmail(data.email);
    setPassword(data.password);

    console.log(data);
  };

  return (
    //Formulario
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group p-2">
            <input
              className="form-control"
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              value={name}
              autoFocus
            />
          </div>
          <div className="form-group p-2">
            <input
              className="form-control"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              value={email}
            />
          </div>
          <div className="form-group p-2">
            <input
              className="form-control"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              value={password}
            />
          </div>
          {!edit ? <button className="btn btn-primary btn-block"> Create </button> : 
          <button className="btn btn-success btn-block"> Update </button>}
        </form>
      </div>
      {/* Tabla de datos */}
      <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm btn-block"
                    onClick={() => editUser(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-block bt-sm"
                    onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
