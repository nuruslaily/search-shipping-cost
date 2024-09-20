import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';
import { useForm } from "react-hook-form"

type FormValues = {
    username: string
    password: string
}

const Login: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    const navigate = useNavigate();

    const location = useLocation();
    const state = location.state as { message: string };

    const handleLogin = (e: any) => {
        localStorage.setItem('authToken', 'sample-token');
        navigate('/search');
    };

    useEffect(() => {
        if (state?.message) {
            alert(state.message);
        }
    }, []);
    

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(handleLogin)}>

                <label>Username</label>
                <input
                    {...register("username", { required: 'Username is required' })}
                    type="text"
                    placeholder='username'
                />
                {errors?.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
                <label>Password</label>
                <input
                    {...register("password", { required: 'Password is required' })}
                    type="password"
                    placeholder='password'
                />
                {errors?.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                <button type="submit">Login</button>
                <button>Register</button>
            </form>
        </div>
    );
};

export default Login;
