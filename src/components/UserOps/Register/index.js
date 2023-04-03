import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap';
import { MDBCheckbox } from 'mdb-react-ui-kit';

import style from './Register.module.css';
import { useForm } from '../../Hooks/useForm';
import { AuthContext } from '../../Contexts/AuthContext';

function Register() {
  document.querySelectorAll("a.selected").forEach(a=>a.classList.remove("selected"));
  
    const { onRegisterSubmit } = useContext(AuthContext);
    const {values, changeHandler, onSubmit} = useForm({
        email: '',
        username: '',
        pictureURL: '',
        password: '',
        passwordConfirm: ''
    }, onRegisterSubmit);

    return (
    <Col md={6} style={{minHeight:"720px"}}>
    {
        <div className={style.loginFormContainer}>
        <img className={style.headImg} src="/images/register-banner.png" alt='register banner'/>
        <Form className={style.loginForm} onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address<sup className="req"> *</sup></Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter email" 
                    name="email"
                    value={values.email} 
                    onChange={changeHandler}
                    required
                />
                    

                <Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>Username<sup className="req"> *</sup></Form.Label>
                <Form.Control 
                    type="text" 
                    name="username" 
                    placeholder="Enter username"
                    value={values.username} 
                    onChange={changeHandler}
                    required
                    />

            </Form.Group>

            <Form.Group className="mb-3" controlId="pImageUrl">
                <Form.Label>Profile picture URL</Form.Label>
                <Form.Control 
                    type="text" 
                    name="pictureURL" 
                    placeholder="Enter picture URL" 
                    value={values.pictureURL} 
                    onChange={changeHandler}
                    />

            <Form.Text className="text-muted">Leave empty for a default image.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password<sup className="req"> *</sup></Form.Label>
                <Form.Control 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={values.password} 
                    onChange={changeHandler}
                    required
                    />

            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                <Form.Label>Confirm password<sup className="req"> *</sup></Form.Label>
                <Form.Control 
                    type="password" 
                    name="passwordConfirm" 
                    placeholder="Confirm Password" 
                    value={values.passwordConfirm} 
                    onChange={changeHandler}
                    required
                    />

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

export default Register;