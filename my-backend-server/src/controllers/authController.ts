import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Simulate authentication
    if (username === 'admin' && password === 'password') {
        res.json({ token: 'sample-token', message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};
