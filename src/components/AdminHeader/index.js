import React from 'react';
import PropTypes from 'prop-types';
import {Link} from '@reach/router';
import withAuth from 'src/modules/Login/hocs/withAuth';

const AdminHeaderBase = ({logout}) => (
  <nav>
    <Link to="/admin">Home</Link>
    <Link to="/admin/patterns">Patterns</Link>
    <button type="button" onClick={logout}>Logout</button>
  </nav>
);

AdminHeaderBase.propTypes = {
  logout: PropTypes.func,
};

const AdminHeader = withAuth(AdminHeaderBase);

export default AdminHeader;
