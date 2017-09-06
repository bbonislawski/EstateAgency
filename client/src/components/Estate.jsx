import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import userAuthenticated from '../utils/authWrapper';

const options = {
  authSelector: state => state.get('auth'),
  predicate: auth => auth.get('isAuthenticated'),
  wrapperDisplayName: 'authDeleteEstate',
  FailureComponent: null
};

const DeleteButton = userAuthenticated(options)(
  (props) => <button className="btn btn-danger btn-block" role="button" onClick={() => props.deleteEstate(props.id)}>Delete</button>
);

export default class Estate extends PureComponent {
  render () {
    const { _id, i, name, description, picture, toggleModal, deleteEstate } = this.props;
    return (
      <div className="col-md-4">
        <div className="thumbnail">
          <div className="thumbnail-frame">
            <img src={picture} alt="..." className="img-responsive thumbnail-pic" />
          </div>
          <div className="caption">
            <h5>{name}</h5>
            <p className="description-thumbnail">{`${description.substring(0, 150)}...`}</p>
            <div className="btn-group" role="group" aria-label="...">
              <button className="btn btn-default btn-block" role="button" onClick={() => toggleModal(i)}>View</button>
              <DeleteButton deleteEstate={deleteEstate} id={_id} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
