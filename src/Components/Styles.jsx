import React from 'react';

import {styled} from 'baseui';

import { withStyles } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import Slide from '@material-ui/core/Slide';

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

export const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

export const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

export const Rightened = styled('div', {
  display: 'flex',
  float: 'right',
  height: '100%',
});
