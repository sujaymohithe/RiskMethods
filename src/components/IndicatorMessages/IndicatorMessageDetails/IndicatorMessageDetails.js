import React, { useEffect } from 'react';
import * as actions from '../../../store/actions/index';
import { connect } from 'react-redux';
import { Container, Row, Col, Badge, ProgressBar } from "react-bootstrap";
import './IndicatorMessageDetails.css';
import { linkify } from '../../../shared/utlity';

const IndicatorMessageDetails = (props) => {
    if (!localStorage.token) {
        props.history.push('/auth');
    }
    let messageId = props.match.params.id;
    const { onInitIndicatorMessageDetails } = props;

    useEffect(() => {
        onInitIndicatorMessageDetails(messageId);
    }, [onInitIndicatorMessageDetails, messageId]);

    if (props.loading) {
        return (
            <div className="app-body">
                <Container>
                    <Row><h5>Please Wait ...</h5></Row>
                </Container>
            </div>)
    }
    else {
        const { attributes } = props.indicatorMessageData.data;
        const riskScore = attributes && parseInt(attributes.risk_score.value);
        const color = riskScore >= 0 && riskScore <= 50 ? 'success' :
            (riskScore > 50 && riskScore <= 80 ? 'warning' : 'danger');
        const createdDt = `Created on ${new Date(attributes.created_at).toLocaleDateString()}
            at ${new Date(attributes.created_at).toLocaleTimeString()} by system`;

        return (
            <div className="app-body">
                <Container>
                    <Row>
                        <Col sm={12}>
                            <h3>Indicator Message</h3>
                            <a href="/" className="navLink">Back to Indicator Messages</a><br /><br />
                            <div className="Boxwidget">
                                <div className="box-left">
                                    <div className="CardLeftFooter">
                                        <p>{attributes.name}</p>
                                    </div>
                                    <div className="Cardblock">
                                        <h5>
                                            <Badge variant={color}>{riskScore}</Badge>
                                        </h5>
                                        <h5>
                                            <ProgressBar className="progressive" animated variant={color} now={riskScore} />
                                        </h5>
                                        <h6>Risk Score already set</h6>
                                    </div>
                                </div>
                                <div className="box-right">
                                    <div className="Cardblock">
                                        <p><b>{attributes.subject}</b></p>
                                        <p>{createdDt}</p>
                                        <p className= "msg-body" dangerouslySetInnerHTML={{ __html: linkify(attributes.body) }} />
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        indicatorMessageData: state.indicatorMessage.messageData,
        loading: state.indicatorMessage.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onInitIndicatorMessageDetails: (messageId) =>
            dispatch(actions.InitIndicatorMessageDetails(messageId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndicatorMessageDetails);