import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.scss';
import Icon from '../../common/Icon/Icon';
import { formatPrice } from '../../../utils/formatPrice.js';

const OrderOptionIcon = ({ values, setOptionValue, options }) => {
  return (
    <div className={styles.icon}>
      <div name='null' key='null' onClick={() => setOptionValue('')} className={styles.icon, options.accommodation === '' ? styles.iconActive : ''}>
        <Icon name={'times-circle'} />
        <span>{'None'}</span>
      </div>
      {values.map(value => (
        <div className={styles.icon, options.accommodation === value.id ? styles.iconActive : ''} key={value.id} name={value.id} onClick={() => setOptionValue(value.id)}>
          <Icon name={value.icon} />
          <span>{value.name} {formatPrice(value.price)}</span>
        </div>
      ))}
    </div>
  );
};

OrderOptionIcon.propTypes = {
  values: PropTypes.array,
  setOptionValue: PropTypes.func,
  required: PropTypes.bool,
  options: PropTypes.object,
};

export default OrderOptionIcon;