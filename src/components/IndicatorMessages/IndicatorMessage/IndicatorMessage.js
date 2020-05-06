import React from 'react';
import { Button, Row, Col, Badge } from "react-bootstrap";
import './IndicatorMessage.css';
import {linkify} from '../../../shared/utlity';

const IndicatorMessages = props => {
    const { id, attributes } = props.data;
    const riskScore = parseInt(attributes.risk_score.value);
    const color = riskScore >= 0 && riskScore <= 50 ? 'success' :
        (riskScore > 50 && riskScore <= 80 ? 'warning' : 'danger');
    const hrefVal = `/indicator_messages/${id}`;
    const createdDt = `Created on ${new Date(attributes.created_at).toLocaleDateString()}
    at ${new Date(attributes.created_at).toLocaleTimeString()} by system`;

    return (
        <Row>
            <Col sm={12}>
                <div className="Boxwidget">
                    <div className="box-left">
                        <div className="CardLeftFooter">
                            <p>{attributes.indicator_message_type}</p>
                        </div>
                        <div className="Cardblock">
                            <h5>
                                <Badge variant={color}>{riskScore}</Badge>
                            </h5>
                        </div>
                    </div>
                    <div className="box-right">
                        <div className="Cardblock">
                            <p dangerouslySetInnerHTML={{ __html: linkify(attributes.body) }} />
                            <p>{createdDt}</p>
                            <p>Source : {attributes.source}</p>
                            <b>Indicator : {attributes.subject}</b>
                        </div>
                        <div className="CardRightFooter mb-2">
                            <Button href={hrefVal} variant="primary" size="sm">
                                Details
                            </Button>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default IndicatorMessages;