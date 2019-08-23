import React from 'react';

import {Doughnut} from 'react-chartjs-2';

import ListItem from '@material-ui/core/ListItem';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initialState = () => ({
  labels: [
    'Neutral',
    'Yes',
    'No'
  ],
  datasets: [{
    data: [getRandomInt(50, 200), getRandomInt(100, 150), getRandomInt(150, 250)],
    backgroundColor: [
    '#CCC',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
});

class ListLiveQuestionsResultE extends React.Component {
      constructor() {
        super();
        this.state = {
          data: initialState
        }
      }

    render() {
      const lisLivetQnPResult = this.props.listQnP.map((data, i) => {
        return(
                  <Paper key={i}>
                      <ListItem >
                              <SnackbarContent className={this.props.classes.snacker}
                                aria-describedby="client-snackbar"
                                message={
                                  <span id="client-snackbar" className={this.props.classes.message}>
                                      <span>Q.{i+1} &nbsp;</span>
                                      {data}
                                  </span>
                                }
                              />
                      </ListItem>
                      <Doughnut data={this.state.data} />
                      <Divider />
                  </Paper>
              )
      })
      return lisLivetQnPResult;
    }
}

const useStyles = makeStyles(theme => ({
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
  },
}));

const ListLiveQuestionsResult = ({ listQnP }) => {
  const classes = useStyles();
  return(
    <ListLiveQuestionsResultE
    classes={classes}
    listQnP={listQnP}
    />
  )
}

export default ListLiveQuestionsResult;