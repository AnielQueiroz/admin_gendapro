export const loginService = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: email, password })
    });

    return { success: response.ok, data: await response.json() };
}