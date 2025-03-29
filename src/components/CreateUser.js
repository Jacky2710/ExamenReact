import { useState } from "react";
import axios from "axios";

const BASE_URL = "https://jacky.jeotech.x10.mx";

function CreateUser() {
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setMessage(""); // Limpiar mensajes previos

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(`${BASE_URL}/users/crear`, user, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setMessage("✅ Usuario creado con éxito");
            setUser({ name: "", email: "", password: "" });
        } catch (error) {
            setMessage("❌ Error al crear usuario. Inténtalo de nuevo.");
            console.error("Error al crear usuario:", error.response?.data || error.message);
        }
    };

    return (
        <div>
            <h2>Crear Usuario</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleCreateUser}>
                <input type="text" name="name" placeholder="Nombre" value={user.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Contraseña" value={user.password} onChange={handleChange} required />
                <button type="submit">Crear Usuario</button>
            </form>
        </div>
    );
}

export default CreateUser;
