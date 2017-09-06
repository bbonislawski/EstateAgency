import React, { PureComponent } from 'react';
import { Link } from 'react-router';
import Estate from './Estate';
import AddEstatePanel from './AddEstatePanel';

export default class EstatesListManager extends PureComponent {

  render () {
    const {
      estates,
      searchBar,
      setSearchBar,
      toggleModal,
      deleteEstate,
      userName,
      logout
    } = this.props;

    return (
      <div className="container scrollable">
        <div className="row text-left">
          <AddEstatePanel logout={logout} userName={userName}/>
        </div>
        <div className="row">
          <input
            type="search" placeholder="Search by Name" className="form-control search-bar" onKeyUp={setSearchBar} />
        </div>
        <div className="row">
        {
          estates
            .filter(estate => estate.name.toLowerCase().includes(searchBar))
            .map((estate, i) => {
              return (
                <Estate  {...estate}
                  key={estate._id}
                  i={i}
                  toggleModal={toggleModal}
                  deleteEstate={deleteEstate}
                />
              );
            })
        }
        </div>
        <hr />
      </div>

    );
  }
}
