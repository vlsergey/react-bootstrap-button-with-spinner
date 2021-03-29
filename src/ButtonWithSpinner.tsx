import React, { MouseEvent, PureComponent, ReactNode } from 'react';
import { boundMethod } from 'autobind-decorator';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface PropsType {
  children? : ReactNode,
  disabled? : boolean,
  onClick? : ( event: MouseEvent ) => unknown,
  spinner? : ReactNode,
  spinnerProps? : unknown,
}

type StateType = {
  inProgress? : boolean,
};

export default class ButtonWithSpinner extends PureComponent<PropsType, StateType> {

  state : StateType = {
    inProgress: false,
  };

  @boundMethod
  async handleClick( event: MouseEvent ) : Promise<unknown> {
    const { onClick } = this.props;
    this.setState( { inProgress: true } );
    try {
      if ( onClick ) {
        return await onClick( event );
      }
    } finally {
      this.setState( { inProgress: false } );
    }
  }

  render() : ReactNode {
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
