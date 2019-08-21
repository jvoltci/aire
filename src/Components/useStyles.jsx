import React from 'react';

import {styled} from 'baseui';

import { makeStyles, withStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonDone: {
    margin: theme.spacing(1),
    fontSize: 25,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: "black",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxlength: 200,
  },
  icon: {
    margin: theme.spacing(0),
    fontSize: 40,
  },
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    width: '80%',
    maxHeight: 435,
  },
  warn: `
    color: red;
    padding: 0 30px;
  `,
  fab: {
    margin: theme.spacing(1),
  },
  pseudonym: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    color: "teal",
    fontFamily: "Roboto",
    fontSize: "3.7rem"
  },
  chipRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(3),
  },
  group: {
    margin: theme.spacing(1, 0),
  },
  message: {
    display: 'flex',
  },
  snacker: {
    backgroundColor: theme.palette.primary.main,
  }
}));

//export useStyles;
export default useStyles;
