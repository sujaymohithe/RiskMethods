import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap";
import './Sidebar.css';
import toastr from 'toastr';

const Sidebar = props => {
    const [fromRange, setFromRange] = useState(0);
    const [toRange, setToRange] = useState(100);
    const [eventChecked, setEventChecked] = useState(false);

    const submitHandler = event => {
        event.preventDefault();
        if (fromRange > toRange) {
            toastr.warning('Min score should be smaller than max score');
        }
        else {
            props.onFiterIndicatorMessages(eventChecked, fromRange, toRange);
        }
    };

    const resetHandler = () => {
        setEventChecked(false);
        setFromRange(0);
        setToRange(100);
        props.onResetIndicatorMessages();
    };

    return (
        <div className="frmFilter">
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="ControlInput">
                    <Form.Label><b>EVENTS (RISK SCORE 100)</b></Form.Label>
                    <Form.Check aria-label="option 1" checked={eventChecked}
                        onChange={event => {
                            setEventChecked(event.target.checked);
                        }} />
                </Form.Group>
                <Form.Group controlId="ControlSelect">
                    <Form.Label><b>RISK SCORE</b></Form.Label>
                    <Form.Group controlId="formRange">
                        <Form.Label>From : {fromRange}</Form.Label>
                        <Form.Control type="range" value={fromRange} onChange={event => {
                            setFromRange(parseInt(event.target.value));
                        }} />
                    </Form.Group>
                    <Form.Group controlId="toRange">
                        <Form.Label>To : {toRange}</Form.Label>
                        <Form.Control type="range" value={toRange} onChange={event => {
                            setToRange(parseInt(event.target.value));
                        }} />
                    </Form.Group>
                </Form.Group><br /><br />
                <Form.Group controlId="ControlSubmit">
                    <div className="mb-2">
                        <Button variant="primary" type="submit" size="sm">
                            Submit
                        </Button>{' '}
                        <Button variant="secondary" size="sm" onClick={resetHandler}>
                            Reset
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    )
}

export default Sidebar;