import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Login() {
    const navigate = useNavigate();

    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    return (
        <div style={{ background: '#eee', height: '500px', display: 'flex', justifyContent: 'center' }} >
            <div>

                <h5> LOGIN TO SHOP KART </h5>
                <div>
                    <input value={user} type="text"
                        placeholder="USER NAME"
                        onChange={(e) => {
                            setUser(e.target.value)
                        }} />
                </div>
                <div>
                    <input type="text" placeholder="PASSWORD"
                        value={pass}
                        onChange={(e) => {
                            setPass(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <button
                        onClick={() => {
                            console.log({ username: user, password: pass });
                            fetch('https://dummyjson.com/auth/login', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                    username: user,
                                    password: pass,
                                })
                            })
                                .then(res => res.json())
                                .then((res) => {
                                    console.log(res)
                                    if (res.message == 'Invalid credentials') {
                                        alert('Unknown user.')
                                    }
                                    if (res && res.token) {
                                        localStorage.setItem('token', res.token);
                                        localStorage.setItem('id', res.id);
                                        navigate('/')
                                    }
                                });
                        }} >
                        SUBMIT </button>
                </div>
            </div>

        </div>

    )
}

export default Login;