import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

  const id = props.location.state.id; // found in docs for react router

  const [inputs, setInputs] = useState({
    title: '',
    author: '',
    detail: ''
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const bookResp = await Axios.get(`/api/books/${id}`);
      if (bookResp.status === 200) setInputs(bookResp.data);
    })();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      console.log(inputs)
      const resp = await Axios.post('/api/books/update', inputs);

      if (resp.status === 200)  {
        toast("The book was updated successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue updating the book", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue updating the book", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/books"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Edit Book</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name="title"
              onChange={handleInputChange}
              value={inputs.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Author:</Form.Label>
            <Form.Control
              name="author"
              onChange={handleInputChange}
              value={inputs.author}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Detail:</Form.Label>
            <Form.Control
              as="textarea"
              name="detail"
              onChange={handleInputChange}
              value = {inputs.detail}
              />
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Update</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default Edit;