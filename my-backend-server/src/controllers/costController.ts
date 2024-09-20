import { Request, Response } from 'express';
import axios from 'axios';
import qs from 'qs';

export const getCost = async (req: Request, res: Response) => {
    const { origin, destination, weight, courier } = req.body;

    // Validate input
    if (!origin || !destination || !weight || !courier) {
        return res.status(400).send('Missing required fields');
    }

    const data = qs.stringify({
        origin,
        destination,
        weight,
        courier
    })

    const config = {
        method: 'post',
        url: 'https://api.rajaongkir.com/starter/cost',
        headers: {
            // 'content-type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'application/json',
            'key': '4ccc33e619fa1d7eb6232728898c3eaf'
            // 'key': process.env.REACT_APP_RAJAONGKIR_API_KEY
        },
        data: data
    }

    try {
        // Send POST request to RajaOngkir to get shipping cost
        const response = await axios.request(config);

        console.log("HASIL:  ", response.data);
        

        // Return the results to the frontend
        res.json(response.data.rajaongkir.results);
    } catch (error) {
        // console.error('Error fetching shipping cost:', error);
        res.status(500).send(error);
        // res.status(500).send('Error fetching shipping cost');
    }
};
