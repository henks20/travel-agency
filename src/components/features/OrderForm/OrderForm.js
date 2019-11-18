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

const sendOrder = (options, tripCost) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
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
};

const OrderForm = (props) => {
  return (
    <Row>
      {Pricing.map((option) => (
        <Col md={4} key={option.id}>
          <OrderOption currentValue={props.options[option.id]} setOrderOption={props.setOrderOption} {...option} options={props.options} />
        </Col>
      ))}
      <Button onClick={() => sendOrder(props.options, props.tripCost)}>Order now!</Button>
      <Col xs={12}>
        <OrderSummary tripCost={props.tripCost} options={props.options} />
      </Col>
    </Row>
  );
};

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;