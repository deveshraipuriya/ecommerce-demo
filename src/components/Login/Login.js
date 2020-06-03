import React from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import '../styles.css';
import { signin } from '../../store/actions/loginActions';
export default function Login(props) {
    const [user, setUser] = React.useState("");
    const [password, setPassword] = React.useState("");
    const loginHandler = (e) => {
        e.preventDefault();
        signin(user, password).then((isAdmin) => {
            console.log("Login Success");
            sessionStorage.setItem('userData', JSON.stringify({ user, isAdmin }))
            isAdmin ? props.history.push('/admin') : props.history.push('/home');
        }).catch(() => {
            console.log("Login Failed");
        })
        setUser("");
        setPassword("");
    }
    React.useEffect(() => {
        sessionStorage.clear();
        localStorage.clear();
    }, [])
    return (
        <Form className="loginformSize" onSubmit={loginHandler}>
            <Form.Group controlId="formBasicUser">
                <Form.Label>UserId</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter user"
                    value={user}
                    onChange={(e) => { setUser(e.target.value) }}
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
}
