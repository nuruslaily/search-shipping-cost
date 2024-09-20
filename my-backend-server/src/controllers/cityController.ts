import { Request, Response } from 'express';
import axios from 'axios';

export const getCities = async (req: Request, res: Response) => {
    const { province } = req.query;
    try {
        const response = await axios.get(`https://api.rajaongkir.com/starter/city?province=${province}`, {
            headers: {
                key: process.env.RAJAONGKIR_API_KEY || '',
            },
        });
        res.json(response.data.rajaongkir.results);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).send('Error fetching cities');
    }
};
