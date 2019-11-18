import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const OrderOptionDate = ({ setOptionValue, options }) => (
  // <div>
  <DatePicker
    // selected={options && options.startDate || new Date()} lub options isrequired do proptypes
    selected={options.startDate || new Date()}
    onChange={date => setOptionValue(date)}
  />
  // </div>
);

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
  options: PropTypes.object,
  // powinienem dodac tutaj options jako isrequired
};

export default OrderOptionDate;