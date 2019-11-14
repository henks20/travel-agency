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

  // *** NIE DZIAŁA ***
  // option zawiera w sobie wiele atrybutów a ja chce przekazać 1 z wielu i tylko ten 1 sprawdzić
  // powinienem kilka przekazać, czy jakoś to obejść?
  it('should return component name equal to props name', () => {
    const expectedName = 'nameTest';
    const expectedOptions = { [name]: expectedName };
    const component = shallow(<OrderOption option={expectedOptions} />);
    // console.log(component.debug());
    expect(component.find('h3')).toEqual(expectedName);
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
      // *** NIE DZIAŁA *** ,  Wywala błąd dla icons bo nie może znalezc zagnieżdżenia ale nie rozumiem dlaczego
      // komponent owrapowany jest divem i powinien działać
      renderedSubcomponent = subcomponent.dive();
    });
    /* common tests */
    it('passes dummy test', () => {
      // console.log(component.debug());
      expect(1).toBe(1);
    });

    // *** NIE DZIAŁA ***
    // Wywala błąd dla icons, to samo co wyżej bo nie moge znalezc subcomponent dla icons
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
      // *** Musze sam dalej rozkminić ***
      //
      // case 'checkbox': {
      //   it('contains labels and inputs', () => {
      //     const labels = renderedSubcomponent.find('label');
      //     expect(labels.length).toBe(mockProps.values.length);

      //     const inputs = select.find('input');
      //     expect(inputs.length).toBe(mockProps.values.length);
      //   });

      //   it('should run setOrderOption function on change', () => {
      //     renderedSubcomponent.find('input').simulate('change', { currentTarget: { checked: true } });
      //     expect(mockSetOrderOption).toBeCalledTimes(1);
      //     expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
      //   });
      //   break;
      // }
      case 'icons': {
        // *** NIE DZIALA ***
        // wywala błąd z tego samego powodu co wyzej, nie moze znalezc w renderedSubcompoennt div
        it('contains labels and inputs', () => {
          const mainDiv = renderedSubcomponent.find('div');
          // console.log(mainDiv.debug());
          expect(mainDiv.length).toBe(1);

          const emptyDiv = mainDiv.find('div[name="null"]').length;
          expect(emptyDiv).toBe(1);

          const divs = mainDiv.find('div').not('[name="null"]');
          expect(divs.length).toBe(mockProps.values.length);
        });

        it('should run setOrderOption function on change', () => {
          // console.log(renderedSubcomponent.debug());
          const mainDiv = renderedSubcomponent.find('div');
          // console.log(mainDiv.debug());
          const divIcons = mainDiv.find('div').not('div[name="null"]');
          divIcons.find('div').at(mockProps.values.length - 1).simulate('change');
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }
      case 'number': {
        it('contains select and options', () => {
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
        it('contains select and options', () => {
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
      // case 'date': {

      // }
    }
  });
}