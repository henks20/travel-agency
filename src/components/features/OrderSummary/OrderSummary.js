import React from 'react';
import styles from './OrderSummary.scss';
import { calculateTotal } from '../../../utils/calculateTotal.js';
import { formatPrice } from '../../../utils/formatPrice.js';
import PropTypes from 'prop-types';


const OrderSummary = (props) => {
  const totalPrice = calculateTotal(props.tripCost, props.options);
  const priceformat = formatPrice(totalPrice);

  return (
    <h2 className={styles.component}>Total<strong>{priceformat}</strong></h2>
  );
};

OrderSummary.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderSummary;