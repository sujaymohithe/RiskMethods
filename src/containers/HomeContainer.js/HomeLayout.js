import React from 'react';
import { Container, Row } from "react-bootstrap";
import IndicatorMessages from '../../components/IndicatorMessages/IndicatorMessages';
import './HomeLayout.css';

const HomeLayout = props => {
    //redirect to login if not authenticated
    if (!props.isAuthenticated) {
        props.history.push('/auth');
    }

    return (
        <div className="app-body">
            <Container>
                <Row className="justify-content-md-center">
                    {props.isAuthenticated && <IndicatorMessages />}
                </Row>
            </Container>
        </div>
    )
}

export default HomeLayout;