// @flow

import * as Types from './PropsType';
import React, { PureComponent } from 'react';
import { boundMethod } from 'autobind-decorator';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

type StateType = {
  inProgress? : ?boolean,
};

export default class ButtonWithSpinner extends PureComponent<Types.PropsType, StateType> {

  state : StateType = {
    inProgress: false,
  };

  @boundMethod
  async handleClick( ) : any {
    const { onClick } = this.props;
    this.setState( { inProgress: true } );
    try {
      if ( onClick ) {
        return await onClick( ...arguments );
      }
    } finally {
      this.setState( { inProgress: false } );
    }
  }

  render() : any {
    const { children, disabled, spinner, spinnerProps, ...etc } = this.props;
    const { inProgress } = this.state;

    const actualSpinner = inProgress && ( spinner || <>
      <Spinner
        animation="border"
        aria-hidden="true"
        as="span"
        role="status"
        size="sm"
        {...spinnerProps} />
      {' '}
    </> );

    return <Button {...etc} disabled={disabled || inProgress} onClick={this.handleClick}>
      {actualSpinner}
      {children}
    </Button>;
  }

}
