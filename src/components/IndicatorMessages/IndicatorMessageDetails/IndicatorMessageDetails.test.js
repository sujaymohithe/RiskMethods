import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { store } from '../../../store/store';
import IndicatorMessageDetails from './IndicatorMessageDetails';

Enzyme.configure({ adapter: new Adapter() });

describe('<IndicatorMessageDetails/> component', () => {
    const component = shallow(
        <Provider store={store}>
            <IndicatorMessageDetails />
        </Provider>
    );

    it('should render the IndicatorMessageDetails component', () => {
        expect(component.length).toEqual(1);
    });
});