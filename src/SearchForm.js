import React from 'react';
import { Row, Col, Form, Dropdown, DropdownButton } from 'react-bootstrap';

function SearchForm({ params, onParamChange }) {
    console.log(params);
    return (
        <Form className='mb-4'>
            <Form.Row className='align-items-center'>
                {/* <Col> */}
                <Form.Group as={Col} lg={4} controlId='formSearchDescription'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        onChange={onParamChange}
                        value={params.description}
                        name='description'
                        type='text'
                        placeholder='Enter job details'
                        size='lg'
                    />
                </Form.Group>
                <Form.Group as={Col} lg={4}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        onChange={onParamChange}
                        value={params.location}
                        name='location'
                        as='select'
                        size='lg'>
                        <option></option>
                        <option>Remote</option>
                        <option>Home</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} lg={2}>
                    <Form.Label>Contract Length</Form.Label>
                    <Form.Control
                        onChange={onParamChange}
                        value={params.full_time}
                        name='full_time'
                        as='select'
                        size='lg'>
                        <option></option>
                        <option>Full Time</option>
                        <option>Part Time</option>
                    </Form.Control>
                </Form.Group>
                {/* <Form.Group as={Col} xs='auto' className='ml-2'>
                    <Form.Check
                        onChange={onParamChange}
                        value={params.full_time}
                        name='full_time'
                        label='Full Time'
                        type='checkbox'
                        className='mb-2'
                    />
                </Form.Group> */}
                {/* </Col> */}
            </Form.Row>
        </Form>
    );
}

export default SearchForm;
