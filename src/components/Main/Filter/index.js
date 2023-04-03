import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import React, { useState } from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import MultiCreatable from '../../../services/multiCreatable';

function Filter({getFilterConfig}) {

    const [filterResult, setFilter] = useState(
        {
            keywords: null,
            country: '',
            language: null,
            sortOrder: ''
        });

    const animatedComponents = makeAnimated();
    const languageOptions = [
        { value: 'eng', label: 'English' },
        { value: 'bul', label: 'Bulgarian' }
    ]
    const sortOptions = [
        { value: 'rel', label: 'Relevancy' },
        { value: 'date', label: 'Date' },
        { value: 'socialScore', label: 'Rank' }
    ]

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Add these filter options to your preferences
        </Tooltip>
    );

    const filterFormChangeHandler = (e, propName) => {
        if(propName === "language" || propName === "keywords")
            setFilter( state => ({...state, [propName]: e}))
        else
            setFilter( state => ({...state, [propName]: e.value}))
    }

    function sendFilterObj(e)
    {
        e.preventDefault();
        getFilterConfig(filterResult);
    }

    return (
        <>
            <Form onSubmit={sendFilterObj}>
                <Form.Group className="mb-3">
                    <Form.Label>Keywords</Form.Label>
                    <MultiCreatable name="keywords" filterFormChangeHandler={filterFormChangeHandler}/>
                    <Form.Text className="text-muted">
                        Keep in mind only the first 5 keywords will be used!
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label>Language</Form.Label>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={languageOptions}
                    onChange = {(event) => filterFormChangeHandler(event, 'language')}
                />
                <Form.Text className="text-muted">
                        Keep empty for all languages.
                </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Sort By</Form.Label>
                    <Select
                        closeMenuOnSelect={true}
                        components={animatedComponents}
                        options={sortOptions}
                        onChange = {(event) => filterFormChangeHandler(event, 'sortOrder')}
                    />
                    <Form.Text className="text-muted">
                        Keep empty for default sort by relevance.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3 d-flex justify-content-around">
                    <Button variant="outline-success" type="submit">
                        Apply 🔎
                    </Button>

                    <OverlayTrigger placement="top" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                        <Button type="submit" variant="outline-danger">Save ❤️</Button>
                    </OverlayTrigger>
                </Form.Group>
                
            </Form>
            <div className="dxa-delimiter"></div>
        </>
    
    );
}



export default Filter;