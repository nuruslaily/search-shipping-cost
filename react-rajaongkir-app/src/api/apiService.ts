import axios from "axios";

const baseUrl = 'https://my-backend-server-henna.vercel.app/api/'; // Use your proxy server URL

export const fetchProvinces = async () => {
    const response = await fetch(`${baseUrl}provinces`); // Use your proxy server URL
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

export const fetchCity = async (provinceId: string) => {
    const response = await fetch(`${baseUrl}cities?province=${provinceId}`); // Use your proxy server URL
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

export const fetchCost = async ({ origin, destination, weight, courier }: { origin: string, destination: string, weight: number, courier: string }) => {
    const response = await axios.post(`${baseUrl}cost`, { origin, destination, weight, courier });
    console.log("TEST: ", response);
    
    const data = await response.data;
    return data;
};


