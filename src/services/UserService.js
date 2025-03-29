const BASE_URL = "https://jacky.jeotech.x10.mx/";

export async function getAllUsers() {
    const response = await fetch(BASE_URL + 'users/');
    return response.json();
}

export async function createUser(user) {
    const response = await fetch(BASE_URL + 'users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
    return response.json();
}


export const loginUser = async (credentials) => {
    const response = await fetch(BASE_URL+'users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    });
    return response.json();
};