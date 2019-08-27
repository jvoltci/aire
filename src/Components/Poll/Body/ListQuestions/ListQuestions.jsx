import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const ListQuestions = ({ listQnP, removeItem}) => {
    
    const classes = useStyles();
    const tempList = listQnP.map((data, i) => {
        return(
                <div key={i}>
                    <ListItem >
                            <SnackbarContent className={classes.snacker}
                              aria-describedby="client-snackbar"
                              message={
                                <span id="client-snackbar" className={classes.message}>
                                    <span>Q.{i+1} &nbsp;</span>
                                    {data}
                                    <IconButton onClick={() => removeItem("questionPolling", i)} 
                                        aria-label="delete" 
                                         size="small">
                                      <DeleteIcon id="trash" fontSize="small" />
                                    </IconButton>
                                </span>
                              }
                            />
                    </ListItem>
                    <Divider />
                </div>
            )
    })
    return tempList;
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
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default ListQuestions;