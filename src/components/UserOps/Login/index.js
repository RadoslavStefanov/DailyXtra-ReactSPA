import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import { MDBCheckbox } from 'mdb-react-ui-kit';

import style from './Login.module.css';

function Login() {
  return (
    <Col md={6} style={{minHeight:"720px"}}>
    {
        <div className={style.loginFormContainer}>
        <img className={style.headImg} src="/images/login-banner.png"/>
        <Form className={style.loginForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <div className="d-flex justify-content-between mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
            </div>

            
            <div className="d-grid gap-2">
                <Button type="submit" variant='success'>Sign in</Button>
            </div>

            <div className="text-center">
                <p>Not a member? <a href="#!">Register</a></p>
            </div>
        </Form>
        </div>
    }                        
    </Col>
  );
}

export default Login;