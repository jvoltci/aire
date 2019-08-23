import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const polulate = {
    dummyData: [
        {
            index: 0,
            name: 'Jai',
            isAdded: true
        },
        {
            index: 1,
            name: 'John',
            isAdded: false
        },
        {
            index: 2,
            name: 'Jane',
            isAdded: false
        },
        {
            index: 3,
            name: 'Jia',
            isAdded: false
        },
    ]
}

const ListParticipants = () => {
    const classes = useStyles();
    const tempList = polulate.dummyData.map((unit, i) => {
        if(!unit.isAdded)
            return(
                <div key={i}>
                    <ListItem>
                        <SnackbarContent className={classes.snacker}
                          aria-describedby="client-snackbar"
                          message={
                            <span id="client-snackbar" className={classes.message}>
                                {`${unit.index+1} | ${unit.name}`}
                            </span>
                          }
                        />

                        <IconButton
                        aria-label="delete" 
                        size="small"
                        style={{ color: 'red' }}
                        >
                            <PersonAddDisabledIcon />
                        </IconButton>

                        <IconButton 
                        aria-label="delete" 
                        size="small"
                        style={{ color: 'blue' }}
                        >
                            <PersonAddIcon />
                        </IconButton>
                        
                    </ListItem>
                </div>
            )
        else return null
    } );
    return tempList;
}

const useStyles = makeStyles(theme => ({
  message: {
    display: 'flex',
  },
  snacker: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export default ListParticipants;