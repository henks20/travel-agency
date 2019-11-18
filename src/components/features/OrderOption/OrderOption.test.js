import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';
// import DatePicker from './OrderOptionDate';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type='text' name='Text input' />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  it('should return component name equal to props name', () => {
    const expectedName = 'nameTest';
    const component = shallow(<OrderOption name={expectedName} type={'dropdown'} />);
    expect(component.find('.title').text()).toEqual(expectedName);
  });

});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate', // dodałem w date => options : {}; inaczej był undefined
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    { id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
    { id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: { currentValue: [mockProps.currentValue] },
  number: { currentValue: '1' },
  text: {},
  // dodałem options: {} bo inaczej undefined, moge dodac pusty obiekt albo jak w "tags &&" dodac w TripSummary
  date: { options: {} },
};

const testValue = mockProps.values[1].id;
const testValueNumber = '3';

for (let type in optionTypes) {
  describe(`Component OrderOption with type=${type}`, () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption; /* 1 */

    beforeEach(() => {
      mockSetOrderOption = jest.fn(); /* 2 */
      component = shallow(
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption} /* 3 */
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    // it('passes dummy test', () => {
    //  console.log(component.debug());
    //  expect(1).toBe(1);
    // });

    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'checkbox': {
        it('should render inputs with type checkbox', () => {
          const input = renderedSubcomponent.find('input');
          expect(input.at(0).prop('type')).toBe('checkbox');
        });

        it('should run setOrderOption function on change', () => {
          const input = renderedSubcomponent.find('input');
          expect(input.at(1).prop('value')).toBe(testValue);
          input.at(1).simulate('change', { currentTarget: { checked: true } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({
            [mockProps.id]: [mockProps.currentValue, testValue],
          });
        });
        break;
      }
      case 'icons': {
        it('contains div', () => {
          const mainDiv = renderedSubcomponent.find('div');
          expect(mainDiv).toBeTruthy();
        });
        // *** NIE DZIAŁA ***
        // nie moge zidenfytifkowac dlaczego nie dziala
        // oczekuje xyz a dostaje aaa, czyzby cos na indexach  => at(2), ale przy zmianie tez nie dzialalo
        it('should run setOrderOption function on click', () => {
          const mainDiv = renderedSubcomponent.find('div');
          mainDiv.find('div').at(2).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'number': {
        it('contains div and input', () => {
          const div = renderedSubcomponent.find('div');
          expect(div.length).toBe(1);

          const inputLength = div.find('input').length;
          expect(inputLength).toBe(1);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', { currentTarget: { value: testValueNumber } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }
      case 'text': {
        it('contains div and input', () => {
          const div = renderedSubcomponent.find('div');
          expect(div.length).toBe(1);

          const inputLength = div.find('input').length;
          expect(inputLength).toBe(1);

        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('input').simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'date': {
        it('contains DatePicker', () => {
          const datePicker = renderedSubcomponent.find('DatePicker');
          expect(datePicker).toBeTruthy();
        });
        // *** NIE DZIAŁA ***
        // nie moge doprowadzić żeby działał test na on change
        // probowałem DatePicker jako komponent nie string ale tez nie dzialalo
        it('should run setOrderOption function on change', () => {
          const datePicker = renderedSubcomponent.find('DatePicker');
          expect(datePicker).toBeTruthy();

          renderedSubcomponent.find('DatePicker').simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
    }
  });
}