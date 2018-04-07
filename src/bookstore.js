// src/bookstore.js

require('jquery');
require('bootstrap');
require('bootstrap-webpack');
import React from 'react';
import ReactDOM from 'react-dom';
import createReactClass from 'create-react-class';
import DeliveryDetails from './delivery_details';
import ShippingDetails from './shipping_details';
import BookList from './booklist';
import Confirmation from './confirmation';
import Success from './success';
import SetIntervalMixin from './mixins/set_interval_mixin';
import CartTimeoutMixin from './mixins/cart_timeout_mixin';
import ModalAlertTimeout from './modals/modal_alert_timeout';
import "object-assign";

var timeout = 60 * .5;

// BoodStore component
var BookStore = createReactClass({

    getInitialState(){
        return({currentStep: 1, formValues: {}, cartTimeout:timeout});
    },

    componentDidUpdate(){
      if(this.state.cartTimeout === 0){
        this.state.cartTimeout = timeout;
      }
    },

    updateCartTimeout(timeout){
      this.setState({cartTimeout: timeout});
    },

    updateFormData(formData){
        console.log("current step in updateFormData function:", this.state.currentStep);
        var formValues = Object.assign({}, this.state.formValues, formData);
        var nextStep = this.state.currentStep + 1;
        console.log('current form values:', formValues);
        this.setState({currentStep: nextStep, formValues: formValues});
        console.log(formData);
    },

    alertCartTimeout(){
      ReactDOM.render(<ModalAlertTimeout />, document.getElementById('modalAlertTimeout'));
      this.setState({currentStep: 1, formValues: {}, cartTimeout: 1});
    },

    render(){
        console.log("current step in render function:", this.state.currentStep);
        switch (this.state.currentStep) {
            case 1:
              return <BookList updateFormData={this.updateFormData} />;
            case 2:
              return <ShippingDetails updateFormData={this.updateFormData}
                                      cartTimeout={this.state.cartTimeout}
                                      updateCartTimeout={this.updateCartTimeout}
                                      alertCartTimeout={this.alertCartTimeout}
              />;
            case 3:
              return <DeliveryDetails updateFormData={this.updateFormData}
                                      cartTimeout={this.state.cartTimeout}
                                      updateCartTimeout={this.updateCartTimeout}
                                      alertCartTimeout={this.alertCartTimeout}
              />;
            case 4:
              return <Confirmation data={this.state.formValues}
                                   updateFormData={this.updateFormData}
                                   cartTimeout={this.state.cartTimeout}
              />;
            case 5:
              return <Success data={this.state.formValues} cartTimeout={this.state.cartTimeout} />;
          //  case 10:
              /*  Hand the case of Cart Timeout */
              return <div><h2>Your cart timed out, Please try again!</h2></div>;
            default:
              return <BookList updateFormData={this.updateFormData} />;
        }
    }
});

export default BookStore;
