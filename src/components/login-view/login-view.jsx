import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password
    };

    fetch('https://cthulhuflix-2f8f4cc270b5.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className='mb-3' controlId='loginPassword'>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type='text'   
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength='3'
          placeholder='Username'
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='loginPassword'>
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength='6'
          placeholder='Password'
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Submit
      </Button>
    </Form>
  );
};