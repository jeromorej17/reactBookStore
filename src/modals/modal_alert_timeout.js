// modal_alert.js

import createReactClass from 'create-react-class';
import React from 'react';
import ReactDOM from 'react-dom';

var ModalAlertTimeout = createReactClass({

  componentDidMount(){
    setTimeout(()=> {
    let timeoutModal = this.refs.timeoutModal
      $(timeoutModal).modal('show');
      $(timeoutModal).on('hidden.bs.modal', this.unMountComponent);
    }, 100);
  },

  unMountComponent(){
      ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).parentNode);
  },

  render(){
    return (
      <div className="modal fade" ref="timeoutModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">x</span>
              </button>
              <h4 className="modal-title">Timeout</h4>
            </div>
            <div className="modal-body">
              <p>The cart has timed-out.  Please try again!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default ModalAlertTimeout;
