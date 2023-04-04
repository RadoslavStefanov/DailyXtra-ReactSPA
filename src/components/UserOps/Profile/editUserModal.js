import { render } from '@testing-library/react';
import React, { useContext, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from '../../Hooks/useForm';
import { AuthContext } from '../../Contexts/AuthContext';
import { editUser } from '../../../services/usersService';

export default function EditUserModal
({ userDetails, dxaUser })

{

  const handleClose = () => {setShow(false); values.username=""; values.profile_picture="";};
  const handleShow = () => setShow(true);

  function onEditSubmit(data)
  { editUser(data, userDetails, dxaUser, handleClose); }

  const [show, setShow] = useState(false);
  const {values, changeHandler, onSubmit} = useForm({
    username: "",
    profile_picture: ""
  }, onEditSubmit);

  
  return (
    <>
      <Button type="submit" variant='success' onClick={handleShow} style={{backgroundColor:"#4fbe1d"}}>📝 Edit</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        {userDetails && userDetails.username && (
            <Modal.Title>👤 <strong>Edditing:</strong> {userDetails.username}</Modal.Title>
        )}
        {console.log(dxaUser)}
        </Modal.Header>
        <Modal.Body>
            {userDetails && dxaUser && (
                <Form onSubmit={onSubmit} >
                    <Form.Text className="text-muted">
                        Please enter the new values you desire:
                    </Form.Text>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={userDetails.email} onChange={changeHandler} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" value={values.username} onChange={changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Picture URL</Form.Label>
                        <Form.Control name="imageURL" value={values.profile_picture} onChange={changeHandler} />
                        <Form.Text className="text-muted">
                            Leave empty for default picture.
                        </Form.Text>
                    </Form.Group>

                    <Modal.Footer>
                        <Button variant="Secondary" onClick={handleClose}>
                            ❌ Close
                        </Button>
                        <Button variant="success" style={{backgroundColor:"#4fbe1d"}} type='submit'>
                            ✍️ Save Changes
                        </Button>
                    </Modal.Footer>
                </Form>
            )}
        </Modal.Body>        
      </Modal>
    </>
  );
}