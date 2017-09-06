import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import userAuthenticated from '../utils/authWrapper';

class AddEstatePanel extends PureComponent {
  render () {
    const { userName, logout } = this.props;
    return (
      <div className="add-estate-panel">
        <h5>Welcome back {userName}, <span className="btn btn-link" onClick={logout}>Logout</span></h5>
        <Link to="/estates/add" className="btn btn-primary">Add a new Estate!</Link>
      </div>
    );
  }
}

const options = {
  authSelector: state => state.get('auth'),
  predicate: auth => auth.get('isAuthenticated'),
  wrapperDisplayName: 'authAddEstate',
  FailureComponent: () => {
    return (
      <div className="btn-group" role="group" aria-label="...">
        <Link to="/auth/signup" className="btn btn-primary">Sign Up</Link>
        <Link to="/auth/login" className="btn btn-danger">Login</Link>
      </div>
    );
  }
};

export default userAuthenticated(options)(AddEstatePanel);
