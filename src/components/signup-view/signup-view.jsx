import { useState } from 'react';
import { Button, Form, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [ birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    };

    fetch('https://cthulhuflix-2f8f4cc270b5.herokuapp.com/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        if (response.ok) {
          alert('Signup successfull');
          window.location.reload();
        } else {
          alert('Signup failed');
        }
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
              <Card.Title>
                New User Registration
              </Card.Title>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className='mb-3' controlId='signupUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength='3'
                      placeholder='Username'
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='signupPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength='6'
                      placeholder='Password'
                    />
                    <Form.Text className='text-muted text-sm'>
                      Minimum length: 6 characters
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='signupEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='Enter email'
                    />
                    <Form.Text className='text-muted text-sm'>
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='signupBirthday'>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type='date'
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant='primary' type='submit'>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};