import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { store } from '../../store/store';
import Sidebar from './Sidebar';

Enzyme.configure({ adapter: new Adapter() });

describe('<Sidebar/> component', () => {
    const component = shallow(
        <Sidebar />
    );

    it('renders the sidebar component', () => {
        expect(component.length).toEqual(1);
    });

    it('should render form fields', () => {
        expect(component.find('FormCheck').length).toEqual(1);
        expect(component.find('Button').length).toEqual(2);
        expect(component.find('FormControl[type="range"]').length).toEqual(2);
    });

    it('test button click event', () => {
        const mockCallBack = jest.fn();
        const button = shallow((<input type="button" onClick={mockCallBack}>Ok!</input>));
        button.simulate('click');
    });

    it('set range slider min default to 0', () => {
        expect(component.find('FormControl[type="range"]').first().prop('value')).toEqual(
            0,
        );
    });

    it('set range slider max default to 100', () => {
        expect(component.find('FormControl[type="range"]').at(1).prop('value')).toEqual(
            100,
        );
    });

    it('should set the checkbox value on change event', () => {
        component.find('FormCheck[type="checkbox"]').simulate('change', {
            target: {
                checked: true,
            },
        });
        expect(component.find('FormCheck[type="checkbox"]').prop('checked')).toEqual(
            true,
        );
    });

})