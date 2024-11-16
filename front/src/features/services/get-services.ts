export const getServices = async (establishmentId: string) => {
    const response = await fetch('http://localhost:3000/services/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ establishmentId })
    });

    return { success: response.ok, data: await response.json() };
}