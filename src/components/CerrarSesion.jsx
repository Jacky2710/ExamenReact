import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://tu-api.com/login", { email, password });
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
                setIsAuthenticated(true);
            }
        } catch (err) {
            setError("Credenciales incorrectas");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
}

function Users() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("https://tu-api.com/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(response.data);
            } catch (err) {
                setError("Error al obtener usuarios");
            }
        };
        fetchUsers();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div>
            <h2>Lista de Usuarios</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.email}</li>
                ))}
            </ul>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

function CreateUser() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("https://tu-api.com/users", { email, password }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage("Usuario creado exitosamente");
            setEmail("");
            setPassword("");
        } catch (err) {
            setMessage("Error al crear usuario");
        }
    };

    return (
        <div>
            <h2>Crear Usuario</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleCreateUser}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
}

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/users" element={isAuthenticated ? <Users /> : <Navigate to="/login" />} />
                <Route path="/create-user" element={isAuthenticated ? <CreateUser /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
