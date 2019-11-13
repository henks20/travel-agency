import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

/*
* Musiałem dodać expectedTags = [], bo inaczej tags.length wywalał błąd, że undefined
* ale już naprawiłem dodając do TriSummary tags && .....
*/

// Test Suites: 2 failed, 1 passed, 3 total -> 3 pliki, z czego 2 udane, 1 fail
// Tests:       1 failed, 3 passed, 4 total -> 4 testy w sumie
// Snapshots:   0 total
// Time:        8.136s
// Ran all test suites related to changed files.

describe('Component TripSummary', () => {

  it('should get id prop equal to Router param', () => {
    const expectedLink = '/trip/123';
    const expectedTags = [];
    const expectedId = '123';
    const component = shallow(<TripSummary id={expectedId} tags={expectedTags} />);
    // console.log(component.find('Link').debug()); // nie moge dodawac prop('to') bo wtedy wywala blad
    // console.log(expect()) -> mogę zobaczyć jakie funkcje moge wywolac na expect
    expect(component.find('Link').prop('to')).toEqual(expectedLink);
  });

  it('should render correct image with alt', () => {
    const expectedImage = 'image.jpg';
    const expectedName = 'imageAlt';
    const expectedTags = []; // musze dodawac tags? -> sa required -> już teraz moge usunac bo dalem w tripsummary tags && ....
    const component = shallow(<TripSummary image={expectedImage} name={expectedName} tags={expectedTags} />);

    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(expectedName);
  });

  it('should render without crashing', () => {
    const expectedTags = [];
    const component = shallow(<TripSummary name='Lorem ipsum' cost='$123456' days={6} tags={expectedTags} />);
    expect(component).toBeTruthy();
  });

  it('should render without props', () => {
    const expectedTags = [];
    const component = shallow(<TripSummary tags={expectedTags} />);
    expect(component).toBeTruthy();
  });

  it('should render tags in desc order', () => {
    const expectedTags = ['ccc', 'aaa', 'bbb'];
    const component = shallow(<TripSummary tags={expectedTags} />);
    // console.log(component.debug());
    expect(component.find('.tag').at(0).text()).toEqual('ccc');
    expect(component.find('.tag').at(1).text()).toEqual('aaa');
    expect(component.find('.tag').at(2).text()).toEqual('bbb');
  });

  it('should not render div with tags', () => {
    const expectedEmptyTags = [];
    const componentWithEmptyTags = shallow(<TripSummary tags={expectedEmptyTags} />);
    const componentWithoutTags = shallow(<TripSummary />);
    expect(componentWithEmptyTags.hasClass('tags')).toBe(false);
    expect(componentWithoutTags.hasClass('tags')).toBe(false);
    // didCatch -> metoda alternatywna, gdybym usunął "tags &&"" w TripSummary
    // dodałem w TripSummary tags && .... dlatego nie wywala mi błedu undefined i test działa prawidłowo
  });

});