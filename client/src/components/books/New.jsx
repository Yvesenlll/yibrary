import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const New = function () {

    const [inputs, setInputs] = useState({
        title: '',
        author: '',
        detail: ''
    });

    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async event => {
      event.preventDefault();
      console.log (inputs);
      try {
          
      const resp = await Axios.post('/api/books', inputs);

        
      if(resp.status === 200){
        toast("The book was created successfully",{
            type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      }else{
          toast("There was an issue creating the book", {
          type: toast.TYPE.ERROR
          });
      }
    } catch (error) {
        toast("There was an issue creating the book", {
            type: toast.TYPE.ERROR
        });
        console.log(error);
    }
    
    };

    const handleInputChange = async event => {
        event.persist();

        const { name, value } = event.target;

        setInputs(inputs =>({
            ...inputs,
            [name]: value
        }));
    };

    if(redirect) return (<Redirect to="/books"/>);

    return(
        <Container className="my-5">
            <header>
                <h1>New Book</h1>
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
                        <Form.Label>Details:</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="detail"
                            onChange={handleInputChange}
                            value = {inputs.details}
                        />
                    </Form.Group>
                    
                    <Form.Group>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </Form.Group>
                </Form>
            </div>
        </Container>
    )

};

export default New;


