import {Backdrop, CircularProgress} from '@mui/material';
import * as React from 'react';

interface ILoading {
  isLoading: boolean;
}

export function Loading({isLoading}: ILoading): JSX.Element {
  return isLoading ? (
    <Backdrop
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        color: '#fff',
        zIndex: theme => theme.zIndex.tooltip + 1,
      }}
      open>
      <CircularProgress
        sx={{
          zIndex: theme => theme.zIndex.tooltip + 2,
        }}
        color="primary"
      />
    </Backdrop>
  ) : (
    <></>
  );
}
