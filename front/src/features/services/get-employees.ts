export const getEmployees = async (establishmentId: string) => {
    const response = await fetch('http://localhost:3000/professional/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ establishmentId })
    });

    return { success: response.ok, data: await response.json() };
}