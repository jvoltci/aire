import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

const polulate = {
    dummyData: [
        {
            index: 0,
            name: 'John',
            isAdded: true
        },
        {
            index: 1,
            name: 'Kranthi',
            isAdded: false
        },
        {
            index: 2,
            name: 'Prateek',
            isAdded: false
        },
        {
            index: 3,
            name: 'Jai',
            isAdded: false
        },
    ]
}

const ListParticipants = () => {
    const classes = useStyles();
    const tempList = polulate.dummyData.map((unit, i) => {
        if(unit.isAdded)
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
                        <Icon
                        fontSize='large'
                        style={{ color: 'white'}}
                        >
                        </Icon>
                        <Icon
                        style={{ color: 'green' }}
                        >
                            <DoneOutlineIcon/>
                        </Icon>
                        <Icon
                        fontSize='large'
                        style={{ color: 'white'}}
                        >
                        </Icon>
                    </ListItem>
                </div>
            )
        else
            return null
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