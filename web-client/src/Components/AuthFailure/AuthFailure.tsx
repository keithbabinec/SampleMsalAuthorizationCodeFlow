import React from 'react';
import IAuthFailureProps from './IAuthFailureProps';

class AuthFailure extends React.Component<IAuthFailureProps, {}> {
  render() {
    return (
      <div className="AuthFailure">
          <p>
              {this.props.errorMessage}
          </p>
      </div>
    );
  }
}

export default AuthFailure;