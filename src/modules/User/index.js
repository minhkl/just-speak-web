import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router';

const User = ({children}) => (
  <div>
    <nav>
      <Link to="#">Patterns</Link>
    </nav>
    {children}
  </div>
);

User.propTypes = {
  children: PropTypes.any,
};

export default User;
