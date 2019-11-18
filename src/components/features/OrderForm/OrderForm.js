import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary.js';
import PropTypes from 'prop-types';
import OrderOption from '../OrderOption/OrderOption.js';
import Pricing from '../../../data/pricing.json';
import Button from '../../common/Button/Button';
import { calculateTotal } from '../../../utils/calculateTotal';
import { formatPrice } from '../../../utils/formatPrice';
import settings from '../../../data/settings';

const sendOrder = (options, tripCost, tripName, tripId, countryCode, name, country) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  if (name === '' || options.contact === '') {
    alert('Uzupelnij imie lub contact!');
  } else {
    const payload = {
      ...options,
      totalCost,
      tripName,
      tripId,
      countryCode,
      name,
      country,
    };

    const url = settings.db.url + '/' + settings.db.endpoint.orders;

    const fetchOptions = {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    };

    fetch(url, fetchOptions)
      .then(function (response) {
        return response.json();
      }).then(function (parsedResponse) {
        console.log('parsedResponse', parsedResponse);
      });
  }
};

const OrderForm = ({ options, tripCost, tripName, tripId, countryCode, name, country, setOrderOption }) => {
  return (
    <Row>
      {Pricing.map((option) => (
        <Col md={4} key={option.id}>
          <OrderOption currentValue={options[option.id]} setOrderOption={setOrderOption} {...option} options={options} />
        </Col>
      ))}
      <Button onClick={() => sendOrder(options, tripCost, tripName, tripId, countryCode, name, country.name)}>Order now!</Button>
      <Col xs={12}>
        <OrderSummary tripCost={tripCost} options={options} />
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
  name: PropTypes.string,
  country: PropTypes.object,
  tripName: PropTypes.string,
  tripId: PropTypes.string,
  countryCode: PropTypes.string,
};

export default OrderForm;