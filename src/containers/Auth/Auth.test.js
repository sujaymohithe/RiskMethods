import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import App from '../../App';
import { store } from '../../store/store';
import AuthContainer from './Auth';

Enzyme.configure({ adapter: new Adapter() });


describe('<Auth/> Container', () => {
    const wrapper = shallow(
        <Provider store={store}>
            <AuthContainer />
        </Provider>
    );

    it('should render the AuthContainer', () => {
        expect(wrapper.length).toEqual(1);
    });

    const container = mount(
        <Provider store={store}>
            <AuthContainer />
        </Provider>
    );
    it('should have 2 input fields', () => {
        expect(container.find('input').length).toEqual(2);
    });
    
    it('renders the Auth form submit button successfully', () => {
        expect(container.find('button').length).toEqual(1);
    })

    it('should set the password value on change event', () => {
        container.find('input[type="password"]').simulate('change', {
            target: {
                value: 'somenewpassword',
            },
        });
        expect(container.find('input[type="password"]').prop('value')).toEqual(
            'somenewpassword',
        );
    });

    it('should have proper props for email field', () => {
        expect(container.find('input[type="username"]').prop('placeholder')).toEqual(
            'Enter your email address'
        );
    });

    it('test button click event', () => {
        const mockCallBack = jest.fn();
        const button = shallow((<input type="button" onClick={mockCallBack}>Ok!</input>));
        button.simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    })
})