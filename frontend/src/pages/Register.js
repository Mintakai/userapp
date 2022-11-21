import { useState } from 'react';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}newuser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password, email })
        });

        const data = await response.json();
        if (data.status === true) {
            console.log(`frontend: user created succesfully`);
            console.log(`backend: ${data.message}`);
            console.log(data);
        } else {
            console.log(`frontend: user creation failed`);
            console.log(`backend: ${data.message}`);
            console.log(data);
        }

        setUsername(''); setPassword(''); setEmail('');
    }

    return (
        <div className="header" >
            <h1>[REGISTER]</h1>
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="email" placeholder="email (optional)" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit">submit</button>
            </form>
        </div >
    );
};

export default Register;