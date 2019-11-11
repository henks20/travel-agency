import React from 'react';
import { Col, Row } from 'react-flexbox-grid';
import OrderSummary from '../OrderSummary/OrderSummary.js';
import PropTypes from 'prop-types';
import OrderOption from '../OrderOption/OrderOption.js';
import Pricing from '../../../data/pricing.json';

const OrderForm = (props) => {
  return (
    <Row>
      {Pricing.map((option) => (
        <Col md={4} key={option.id}>
          <OrderOption currentValue={props.options[option.id]} setOrderOption={props.setOrderOption} {...option} options={props.options} />
        </Col>
      ))}
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