import React, { useEffect, useState } from 'react';
import IndicatorMessage from './IndicatorMessage/IndicatorMessage';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Container, Col, Pagination } from "react-bootstrap";
import Sidebar from '../Sidebar/Sidebar';
import { NO_RESULTS } from '../../AppConstants';

const IndicatorMessages = props => {
    const { onInitIndicatorMessages } = props;
    let [active, setActive] = useState(1);
    let [fromRange, setFromRange] = useState('0');
    let [toRange, setToRange] = useState('100');
    let [eventChecked, setEventChecked] = useState(false);
    let items = [];

    useEffect(() => {
        onInitIndicatorMessages();
    }, [onInitIndicatorMessages]);

    const renderMessage = (message, index) => {
        return (
            <IndicatorMessage data={message} key={index} />
        )
    }

    const onFiterIndicatorMessages = (isEventsChecked, fromRange, toRange) => {
        setActive(1);
        setEventChecked(isEventsChecked);
        setFromRange(fromRange);
        setToRange(toRange);
        onInitIndicatorMessages(1, isEventsChecked, fromRange, toRange);
    }

    const onResetIndicatorMessages = () => {
        setActive(1);
        setEventChecked(false);
        setFromRange(0);
        setToRange(100);
        onInitIndicatorMessages(1, false, 0, 100);
    }

    if (props.metaData) {
        for (let number = 1; number <= props.metaData.total_pages; number++) {
            items.push(
                <Pagination.Item key={number} active={number === active} >
                    {number}
                </Pagination.Item>,
            );
        }
    }

    return (
        <>
            <Col sm="3">
                <Sidebar
                    onFiterIndicatorMessages={onFiterIndicatorMessages}
                    onResetIndicatorMessages={onResetIndicatorMessages} />
            </Col>
            <Col sm="9">
                <Container>
                    <h4>Indicator Messages</h4>
                    <div className="floaterR">
                        <Pagination onClick={event => {
                            setActive(parseInt(event.target.text));
                            onInitIndicatorMessages(event.target.text,
                                eventChecked, fromRange, toRange);
                        }}>{items}</Pagination>
                    </div>
                    {props.loading && <h5>Please wait ...</h5>}

                    {!props.loading && props.indicatorMessagesList &&
                        props.indicatorMessagesList.data &&
                        props.indicatorMessagesList.data.map((message, index) =>
                            renderMessage(message, index))}

                    {!props.loading && props.indicatorMessagesList &&
                        props.indicatorMessagesList.data &&
                        props.indicatorMessagesList.data.length === 0 &&
                        <h4>{NO_RESULTS}</h4>}
                </Container>
            </Col>
        </>
    )
}

// export - making public to run test case
// method that copies part of the state to the props of this component.
export const mapStateToProps = state => {
    return {
        indicatorMessagesList: state.indicatorMessage.messages,
        metaData: state.indicatorMessage.messages.meta,
        loading: state.indicatorMessage.loading
    };
};

//these functions will be accessible via props in child components
export const mapDispatchToProps = dispatch => {
    return {
        onInitIndicatorMessages: (page, isEventsChecked, fromRange, toRange) =>
            dispatch(actions.InitIndicatorMessages(page, isEventsChecked, fromRange, toRange))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(IndicatorMessages);