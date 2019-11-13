import React from 'react';
import { shallow } from 'enzyme';
import Hero from './Hero';

describe('Component Hero', () => {
  it('should render without crashing', () => {
    const component = shallow(
      <Hero titleText='Lorem ipsum' imageSrc='abcdef' />
    );
    expect(component).toBeTruthy();
  });

  // *** wywala błąd ***
  // Również ten test będzie miał wynik pozytywny – jak już wcześniej sprawdziliśmy, 
  // wywołanie <Hero /> bez propsów wyrzuca błąd (z ang. throws an error). Stosujemy tutaj funkcję strzałkową, 
  // aby funkcja expect mogła bez zwracania błędu wykonać kod shallow(<Hero />), który powinien zwrócić błąd.
  // wyrzuca błąd -> powinien bo sa propsy required
  // moge oczekiwac ze jakas funkcja zwroci error i jest dobrze bo musi zwrocic error jak czegos nie dostanie komponent
  it('should throw error without required props', () => {
    const component = shallow(<Hero />);
    console.log(component.debug());
    expect(() => shallow(<Hero />)).toThrow();
    expect(shallow(<Hero />)).toThrow();
  }); // nie dziala !

  it('should render correct title', () => {
    const expectedTitle = 'Lorem ipsum';
    const component = shallow(<Hero titleText={expectedTitle} />);
    const renderedTitle = component.find('.title').text();
    expect(renderedTitle).toEqual(expectedTitle);
  });

  it('should render correct title and image', () => {
    const expectedTitle = 'Lorem ipsum';
    const expectedImage = 'image.jpg';
    const component = shallow(
      <Hero titleText={expectedTitle} imageSrc={expectedImage} />
    );

    const renderedTitle = component.find('.title').text();
    expect(renderedTitle).toEqual(expectedTitle);
    expect(component.find('.image').prop('src')).toEqual(expectedImage);
  });

  it('renders correct classNames', () => {
    const mockVariants = 'small dummy';
    const component = shallow(
      <Hero titleText='Lorem' imageSrc='image.jpg' variant={mockVariants} />
    );
    // console.log(component.debug());
    expect(component.hasClass('component')).toBe(true);
    expect(component.hasClass('small')).toBe(true);
    expect(component.hasClass('dummy')).toBe(true);
  });
});
