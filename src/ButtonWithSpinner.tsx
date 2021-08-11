import React, {MouseEvent, PureComponent, ReactNode} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export interface PropsType extends React.ComponentPropsWithoutRef<Button> {
  disabled?: boolean;
  spinner?: ReactNode;
  spinnerProps?: unknown;
}

interface StateType {
  inProgress?: boolean;
}

export default class ButtonWithSpinner extends PureComponent<PropsType, StateType> {

  state: StateType = {
    inProgress: false,
  };

  handleClick = async (event: MouseEvent): Promise< unknown > => {
    const {onClick} = this.props;
    this.setState({inProgress: true});
    try {
      if (onClick) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const result: unknown = await onClick(event);
        return result;
      }
    } finally {
      this.setState({inProgress: false});
    }
  };

  render (): ReactNode {
    const {children, disabled, spinner, spinnerProps, ...etc} = this.props;
    const {inProgress} = this.state;

    const actualSpinner = inProgress && (spinner || <>
      <Spinner
        animation="border"
        aria-hidden="true"
        as="span"
        role="status"
        size="sm"
        {...spinnerProps} />
      {' '}
    </>);

    return <Button {...etc} disabled={disabled || inProgress} onClick={this.handleClick}>
      {actualSpinner}
      {children}
    </Button>;
  }

}
