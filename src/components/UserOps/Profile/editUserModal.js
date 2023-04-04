import React, { useContext, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from '../../Hooks/useForm';
import { editUser } from '../../../services/usersService';

export default function EditUserModal
({ dxaUser })

{

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true); values.username = dxaUser.displayName; values.profile_picture=dxaUser.photoURL;}

  function onEditSubmit(data)
  { 
    editUser(data, dxaUser, handleClose); 
  }

  const [show, setShow] = useState(false);
  const {values, changeHandler, onSubmit} = useForm({
    username: dxaUser.displayName,
    profile_picture: dxaUser.photoURL
  }, onEditSubmit);
  
  return (
    <>
      <Button type="submit" variant='success' onClick={handleShow} style={{backgroundColor:"#4fbe1d"}}>📝 Edit</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        {dxaUser && dxaUser.displayName && (
            <Modal.Title>👤 <strong>Edditing:</strong> {dxaUser.displayName}</Modal.Title>
        )}
        </Modal.Header>
        <Modal.Body>
            { dxaUser.email && (
                <Form onSubmit={onSubmit} >
                    <Form.Text className="text-muted">
                        Please enter the new values you desire:
                    </Form.Text>

                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={dxaUser.email} onChange={changeHandler} disabled />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" value={values.username} onChange={changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Picture URL</Form.Label>
                        <Form.Control name="profile_picture" value={values.profile_picture} onChange={changeHandler} />
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