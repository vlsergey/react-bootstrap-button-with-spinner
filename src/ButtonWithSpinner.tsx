import React, {MouseEvent, ReactNode, useCallback, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

export interface PropsType extends React.ComponentProps<Button> {
  disabled?: boolean;
  onClick?: React.ComponentProps<Button>['onClick'] | ((event: MouseEvent<HTMLElement>) => Promise<unknown>);
  spinner?: ReactNode;
  spinnerProps?: unknown;
}

const ButtonWithSpinner = ({
  children,
  disabled,
  onClick,
  spinner,
  spinnerProps,
  ...etc
}: PropsType) => {
  const [inProgress, setInProgress] = useState<boolean>(false);

  const handleClick = useCallback(async (event: MouseEvent<HTMLElement>): Promise< unknown > => {
    setInProgress(true);
    try {
      if (!onClick) return;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return await onClick(event);
    } finally {
      setInProgress(false);
    }
  }, [onClick, setInProgress]);

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

  return <Button {...etc} disabled={disabled || inProgress} onClick={handleClick}>
    {actualSpinner}
    {children}
  </Button>;
};

export default React.memo(ButtonWithSpinner);
