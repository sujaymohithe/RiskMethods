import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { store } from '../../store/store';
import Header from './Header';

Enzyme.configure({ adapter: new Adapter() });

describe('<Header/> component', () => {

    it('renders without parent component', () => {
        const component = shallow(<Header />);
        expect(component).toMatchSnapshot();
    });

    const component = mount(
        <Provider store={store} >
            <Header isAuthenticated/>
        </Provider>);

    it('renders Header Component with logo', () => {
        const wrapper = component.find(Header).find(`[data-test='Logo']`);
        expect(wrapper.text() == "RISK METHODS");
    })

    it('Should render the logout and welcome sign if authenticated', () => {
        expect(component.find('.divProfile').length).toEqual(1);
    })

    const header = mount(
        <Provider store={store} >
            <Header />
        </Provider>);

    it('Should not render the logout and welcome sign if not authenticated', () => {
        expect(header.find('.divProfile').length).toEqual(0);
    })
})