import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should get id prop equal to Router param', () => {
    const expectedLink = '/trip/123';
    const expectedId = '123';
    const component = shallow(<TripSummary id={expectedId} />);
    expect(component.find('Link').prop('to').toEqual(expectedLink));
  });

  it('should render correct image with alt', () => {
    const expectedImage = 'image.jpg';
    const expectedName = 'imageAlt';
    const component = shallow(<TripSummary image={expectedImage} name={expectedName} />);

    expect(component.find('img').prop('src')).toEqual(expectedImage);
    expect(component.find('img').prop('alt')).toEqual(expectedName);
  });

  it('should render without crashing', () => {
    const component = shallow(<TripSummary name='Lorem ipsum' cost='$123456' days={6} />);
    expect(component).toBeTruthy();
  });

  it('should render without props', () => {
    const component = shallow(<TripSummary />);
    expect(component).toBeTruthy();
  });

  it('should render tags in desc order', () => {
    const expectedTags = ['bbb', 'aaa', 'ccc'];
    const component = shallow(<TripSummary tags={expectedTags} />);
    expect(component.find('.tag').at(0).props().tag).toEqual('ccc');
    expect(component.find('.tag').at(1).props().tag).toEqual('bbb');
    expect(component.find('.tag').at(2).props().tag).toEqual('aaa');
  });

  it('should not render div with tags', () => {
    const expectedEmptyTags = [];
    const componentWithEmptyTags = shallow(<TripSummary tags={expectedEmptyTags} />);
    const componentWithoutTags = shallow(<TripSummary />);
    expect(componentWithEmptyTags.hasClass('tags')).toBe(false);
    expect(componentWithoutTags.hasClass('tags')).toBe(false);
  });

});