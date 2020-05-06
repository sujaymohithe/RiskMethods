import React from 'react';
import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from "react-redux";
import { store } from '../../store/store';
import IndicatorMessages, { mapStateToProps, mapDispatchToProps }
    from './IndicatorMessages';

Enzyme.configure({ adapter: new Adapter() });

describe('<IndicatorMessages/> component', () => {
    const component = shallow(
        <Provider store={store}>
            <IndicatorMessages />
        </Provider>
    );

    it('should render the IndicatorMessages component', () => {
        expect(component.length).toEqual(1);
    });

    const wrapper = mount(
        <Provider store={store}>
            <IndicatorMessages />
        </Provider>
    );
    it('renders side bar inside parent', () => {
        expect(wrapper.find('Sidebar').length).toEqual(1);
    });

    it('renders messages list container box inside parent', () => {
        expect(wrapper.find('Container').length).toEqual(1);
    });

    const initialProps = {
        loading: true,
        indicatorMessagesList: { data: [{ attributes: {}, id: 1 }] }
    };

    const wrapperLoading = mount(
        <Provider store={store}>
            <IndicatorMessages {...initialProps} />
        </Provider>
    );

    it('initial loading should not render message list', () => {
        expect(wrapperLoading.find('IndicatorMessage').length).toEqual(0);
    });

    it('should show previously loading value', () => {        
        const initialState = {
            indicatorMessage: { messages: [], loading: true, metaData: {} }
        };
        expect(mapStateToProps(initialState).loading).toEqual(true);
    });

});

