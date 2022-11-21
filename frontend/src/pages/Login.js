import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        if (data.status === true) {
            console.log(`frontend: login successful`);
            console.log(`backend: ${data.message}`);
            console.log(data);
            navigate('/');
        } else {
            console.log(`frontend: login failed`);
            console.log(`backend: ${data.message}`);
            console.log(data);
            setUsername(''); setPassword('');
        }
    }

    return (
        <div className="header">
            <h1>[LOGIN]</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">submit</button>
            </form>
        </div>
    );
}

export default Login;