import React, {Component, PropTypes} from "react";
import ReactDOM from 'react-dom';
import {Meteor} from "meteor/meteor";
import {createContainer} from "meteor/react-meteor-data";

import { Items } from '../api/items.js';

import AgregarItem from './AgregarItem.jsx';
import ListarItems from './ListarItems.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';

export class App extends Component {

  updateItemsList() {
    this.listarItemsChild.updateItemsList();
  }

  render() {
    return(
      <div>

        <div className="row">
          <nav className="navbar navbar-default">
        	  <div className="container-fluid">
        	    <div className="navbar-header">
        	      <a className="navbar-brand" href="#">&emsp;&emsp;&emsp;&emsp; Planeador Para Papas</a>
        	    </div>

        	    <div className="collapse navbar-collapse">
        	      <ul className="nav navbar-nav">
        	        <li className="active"><a href="#">Home <span className="sr-only">(current)</span></a></li>
        	      </ul>
        	      <ul className="nav navbar-nav navbar-right">
                  {/* Componente: Accounts */}
        	        <li><AccountsUIWrapper /> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</li>
        	      </ul>
        	    </div>
        	  </div>
        	</nav>
        </div>

        <div className="row">
          <div className="col-md-1"></div>

          <div className="col-md-10">

            <div className="row">
              <div className="col-md-2">
                <img src="/images/ppp.png" alt="Logo de Planeador Para Papas" width="100%" height="100%"></img>
              </div>
              <div className="col-md-10">
                <h3>
                  <p>
                    En PPP te ayudamos a tener el control sobre los pagos periódicos que debe hacer <br />
                    un adulto en Colombia. Puedes seleccionar los elementos que te apliquen y tener <br />
                    recordatorios cada vez que se acerce el momento del pago.
                  </p>
                  <p>
                    ¡Empieza a agregar!
                  </p>
                </h3>
              </div>
            </div>

            <br/>

            <div className="row">

              {/* Componente: Listar Items */}
              <div className="col-md-8 col-xs-12">
                <ListarItems items = {this.props.items.filter(item => item.creator === this.props.currentUser._id)} ref={(input) => { this.listarItemsChild = input; }} user={this.props.currentUser && this.props.currentUser._id} />
              </div>

              {/* Componente: Agregar Item */}
              <div className="col-md-4 col-xs-12 custyle">
                <AgregarItem user={this.props.currentUser && this.props.currentUser._id} updateItemsList={this.updateItemsList.bind(this)} />
              </div>

            </div>

          </div>

          <div className="col-md-1"></div>
        </div>

      </div>
    );
  }
}


App.propTypes = {
  items: PropTypes.array.isRequired,
  currentUser: PropTypes.object
};


export default AppContainer = createContainer(()=>{
  Meteor.subscribe('items');
  return {
    items: Items.find({}).fetch(),
    currentUser: Meteor.user()
  };
}, App);
