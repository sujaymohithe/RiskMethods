import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { store } from '../../../store/store';
import IndicatorMessage from './IndicatorMessage';

Enzyme.configure({ adapter: new Adapter() });

describe('<IndicatorMessage/> component', () => {

    const props = {
        data: {
            id: 1,
            attributes: {
                risk_score: { value: 50 }, 
                created_at: new Date(),
                indicator_message_type: 'location', 
                source: 'media', 
                subject: 'subject',
                body: 'body message'
            }
        }
    };

    const component = shallow(
        <IndicatorMessage {...props} />
    );

    it('should render the IndicatorMessage component', () => {
        expect(component.length).toEqual(1);
    });

    it('should render a message component using props', () => {
        expect(component.find('.Boxwidget').length).toEqual(1);
    });

    it('should display correct risk score from props', () => {
        const riskScore = component.find('Badge').text();
        expect(riskScore).toEqual('50');
    });
});