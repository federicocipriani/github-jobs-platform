import React from 'react';
import { Form } from 'react-bootstrap';

function SearchForm({ params, onParamChange }) {
    return (
        <Form className='mb-4'>
            <Form.Row className='align-items-end'>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        onChange={onParamChange}
                        value={params.description}
                        name='descrition'
                        type='text'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        onChange={onParamChange}
                        value={params.description}
                        name='location'
                        type='text'
                    />
                </Form.Group>
                <Form.Group xs='auto' className='ml-2'>
                    <Form.Check
                        onChange={onParamChange}
                        value={params.full_time}
                        name='full_time'
                        label='Only Full Time'
                        type='checkbox'
                        className='mb-2'
                    />
                </Form.Group>
            </Form.Row>
        </Form>
    );
}

export default SearchForm;