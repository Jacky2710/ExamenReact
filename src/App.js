
import useUsers from './hooks/useUser';
import { createUser, loginUser } from './services/UserService';
import { useState } from 'react';

function App() {
    const { users, fetchUsers } = useUsers();
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });
    const [loginData, setLoginData] = useState({ email: '', password: '' });

    const handleAddUser = async () => {
        if (!newUser.name || !newUser.email || !newUser.password) {
            alert("Todos los campos son obligatorios");
            return;
        }
        await createUser(newUser);
        fetchUsers(); // Actualizar la lista de usuarios
        setNewUser({ name: '', email: '', password: '' }); // Limpiar los campos
    };


    const handleLogin = async () => {
        const response = await loginUser(loginData);
        if (response.access_token) {
            window.location.href = '/bienvenido'; // Redirigir a la página de bienvenida
        } else {
            alert("Credenciales inválidas");
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lista de Usuarios</h2>

            <div className="mb-4 p-3 border rounded bg-light">
                <h3>Agregar Usuario</h3>
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Nombre"
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Contraseña"
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                />
                <button className="btn btn-primary" onClick={handleAddUser}>Agregar</button>
            </div>

            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Password</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.password}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-4 p-3 border rounded bg-light">
                <h3>Iniciar Sesión</h3>
                <input
                    type="email"
                    className="form-control mb-2"
                    placeholder="Email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                />
                <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Contraseña"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                />
                <button className="btn btn-success" onClick={handleLogin}>Iniciar Sesión</button>
            </div>
        </div>
    );
}

export default App