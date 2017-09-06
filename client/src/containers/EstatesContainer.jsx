import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'immutable';
import { Modal, EstatesListManager } from '../components';
import * as estatesActionCreators from '../actions/estates';
import * as authActionCreators from '../actions/auth';
import { toastr } from 'react-redux-toastr';

class EstatesContainer extends Component {
  constructor (props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.deleteEstate = this.deleteEstate.bind(this);
    this.setSearchBar = this.setSearchBar.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount () {
    this.getEstates();
  }

  toggleModal (index) {
    this.props.estatesActions.showSelectedEstate(this.props.estates[index]);
    $('#estate-modal').modal();
  }

  getEstates () {
    this.props.estatesActions.getEstates();
  }

  deleteEstate (id) {
    this.props.estatesActions.deleteEstate(id);
  }

  setSearchBar (event) {
    this.props.estatesActions.setSearchBar(event.target.value.toLowerCase());
  }

  logout () {
    this.props.authActions.logoutUser();
    toastr.success('Retroestates archive', 'Your are now logged out');
    localStorage.removeItem('token');
  }

  render () {
    const { estates, selectedEstate, searchBar, userName, authActions } = this.props;
    return (
      <div>
        <Modal estate={selectedEstate} />
        <EstatesListManager
          estates={estates}
          searchBar={searchBar}
          setSearchBar={this.setSearchBar}
          toggleModal={this.toggleModal}
          deleteEstate={this.deleteEstate}
          userName={userName}
          logout={this.logout}
        />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    estates: state.getIn(['estates', 'list'], Immutable.List()).toJS(),
    searchBar: state.getIn(['estates', 'searchBar'], ''),
    selectedEstate: state.getIn(['estates', 'selectedEstate'], Immutable.List()).toJS(),
    userName: state.getIn(['auth', 'name'])
  }
}

function mapDispatchToProps (dispatch) {
  return {
    estatesActions: bindActionCreators(estatesActionCreators, dispatch),
    authActions: bindActionCreators(authActionCreators, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EstatesContainer);
