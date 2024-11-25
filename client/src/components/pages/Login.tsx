import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import './Style.css';

const Login: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post<{ token: string }>('/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setMessage('Login successful!');
        } catch (err) {
            setMessage('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="auth-title">Welcome Back User - we can change this later</h2>
                {message && <p className="auth-message">{message}</p>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn auth-button">Log In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
