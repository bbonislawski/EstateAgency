import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Layout extends PureComponent {
  render () {
    return (
      <div className="view">
        {this.props.children}
        <footer className="text-center">
          <p>© 2017 Lukasz Slowinski</p>
        </footer>
      </div>
    );
  }
}