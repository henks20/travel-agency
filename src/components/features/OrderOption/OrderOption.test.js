import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type='text' name='Text input' />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);
    expect(component).toEqual({});
  });

  // test sprawdzający sam komponent OrderOption: test, który upewni się, że w tytule wyświetla się zawartość propsa name
  // nie rozumiem polecenia....
  // it('should return component name equal to props name', () => {
  //   const component = shallow(<OrderOption name="test" />);
  //   console.log(component.debug());
  // })

});

const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  // wywala błąd jeśli usune z mockPropsForType => date => options : {}
  date: 'OrderOptionDate',
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
  number: { currentValue: 1 },
  text: {},
  // dodałem options: {} bo inaczej undefined
  date: { options: {} },
};

const testValue = mockProps.values[1].id;
// never used -> eslint
// const testValueNumber = 3;

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
      console.log(subcomponent.debug());
      renderedSubcomponent = subcomponent.dive();
    });
    /* common tests */
    it('passes dummy test', () => {
      console.log(component.debug());
      expect(1).toBe(1);
    });

    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
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
        /* tests for checkbox */
        // it('contains labels and inputs', () => {
        //   const labels = renderedSubcomponent.find('label');
        //   expect(labels.length).toBe(mockProps.values.length);

        //   const inputs = select.find('input');
        //   expect(inputs.length).toBe(mockProps.values.length);
        // });

        // it('should run setOrderOption function on change', () => {
        //   renderedSubcomponent.find('input').simulate('change', { currentTarget: { value: testValue } });
        //   expect(mockSetOrderOption).toBeCalledTimes(1);
        //   expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        // });
        break;
      }
      case 'icons': {
        /* tests for icons */

        break;
      }
      case 'number': {
        // it('contains labels and inputs', () => {
        //   const labels = renderedSubcomponent.find('label');
        //   expect(labels.length).toBe(mockProps.values.length);

        //   const inputs = select.find('input');
        //   expect(inputs.length).toBe(mockProps.values.length);
        // });

        // it('should run setOrderOption function on change', () => {
        //   renderedSubcomponent.find('input').simulate('change', { currentTarget: { value: testValue } });
        //   expect(mockSetOrderOption).toBeCalledTimes(1);
        //   expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        // });
      }
    }
  });
}

// ???????
// Do przetestowania np. OptionOrderDropdown nie wystarczy nam jednak informacja, że OptionOrder go wykorzystuje. 
// Musimy wyrenderować również ten subkomponent. Chcemy jednak upewnić się, że testujemy tylko ten jeden subkomponent – jeśli 
// OptionOrder zawiera jakiekolwiek inne (np. Col czy Icon), chcemy aby pozostały jako kod JSX. Dlatego nie użyjemy mount 
// (o którym wspominaliśmy wcześniej) zamiast shallow – lepiej będzie skorzystać z metody .dive!

// https://airbnb.io/enzyme/docs/api/ShallowWrapper/dive.html


// Method “dive” is meant to be run on 1 node. 0 found instead.
// 78 |       subcomponent = component.find(optionTypes[type]);
// 79 |       console.log(subcomponent.debug());
// > 80 |       renderedSubcomponent = subcomponent.dive();
//    |                                           ^
// 81 |     });
// 82 |     /* common tests */
// 83 |     it('passes dummy test', () => {