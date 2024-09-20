import { Request, Response } from 'express';
import axios from 'axios';

export const getProvinces = async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://api.rajaongkir.com/starter/province', {
            headers: {
                key: process.env.RAJAONGKIR_API_KEY || '',
            },
        });
        res.json(response.data.rajaongkir.results);
    } catch (error) {
        console.error('Error fetching provinces:', error);
        res.status(500).send('Error fetching provinces');
    }
};
