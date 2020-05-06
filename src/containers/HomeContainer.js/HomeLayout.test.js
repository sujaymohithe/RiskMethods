import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { store } from '../../store/store';
import HomeLayout from './HomeLayout';
import App from '../../App';

Enzyme.configure({ adapter: new Adapter() });

describe('<HomeLayout/> Container', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <HomeLayout />
        </Provider>
    );

    it('should render the HomeLayoutContainer', () => {
        expect(wrapper.length).toEqual(1);
    });

    const container = mount(
        <Provider store={store}>
                <HomeLayout isAuthenticated/>
        </Provider>
    );
    it('Should render the Message listings Page if authenticated', () => {
        expect(container.find('.app-body').length).toEqual(1);
    })
})