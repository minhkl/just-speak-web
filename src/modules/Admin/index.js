import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router';

const Admin = ({children}) => (
  <div>
    <nav>
      <Link to="/admin">Home</Link>
      <Link to="/admin/patterns">Patterns</Link>
    </nav>
    {children}
  </div>
);

Admin.propTypes = {
  children: PropTypes.any,
};

export default Admin;
