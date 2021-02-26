import { useState } from  'react';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(email,password);
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input 
                    value={email} 
                    className="form-control"
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input 
                    value={password}
                    className="form-control"
                    onChange={e => setPassword(e.target.value)}
                />
            </div>
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
}

export default Signup;