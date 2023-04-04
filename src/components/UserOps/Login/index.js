import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import { MDBCheckbox } from 'mdb-react-ui-kit';

import style from './Login.module.css';
import { useForm } from '../../Hooks/useForm';
import { AuthContext } from '../../Contexts/AuthContext';
import { Link } from 'react-router-dom';

function Login() {

  document.querySelectorAll("a.selected").forEach(a=>a.classList.remove("selected"));

  const { onLoginSubmit } = useContext(AuthContext);
  const {values, changeHandler, onSubmit} = useForm({
    email: '',
    password: ''
  }, onLoginSubmit);

  return (
    <Col md={6} style={{minHeight:"720px"}}>
    {
        <div className={style.loginFormContainer}>
        <img className={style.headImg} src="/images/login-banner.png" alt='login banner'/>
        <Form onSubmit={onSubmit} className={style.loginForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address<sup className="req"> *</sup></Form.Label>
                    <Form.Control type="email" name='email' value={values.email} onChange={changeHandler} placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password<sup className="req"> *</sup></Form.Label>
                <Form.Control type="password" name='password' value={values.password} onChange={changeHandler} placeholder="Password" />
            </Form.Group>
            
            <div className="d-grid gap-2">
                <Button type="submit" variant='success'>Sign in</Button>
            </div>

            <div className="text-center">
                <p>Not a member? <Link to="/register">Register</Link></p>{/*MARK! Change this to a link to register page*/}
            </div>
        </Form>
        </div>
    }                        
    </Col>
  );
}

export default Login;