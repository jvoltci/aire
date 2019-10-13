import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

/*const polulate = {
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
}*/

const ListParticipants = ({listParticipants, handleApproval}) => {
    const classes = useStyles();
    const tempList = Object.keys(listParticipants).map((index, i) => {
        if(listParticipants[index]["isAdded"] === "neutral" && listParticipants[index]["name"])
            return(
                <div key={i}>
                    <ListItem>
                        <SnackbarContent className={classes.snacker}
                          aria-describedby="client-snackbar"
                          message={
                            <span id="client-snackbar" className={classes.message}>
                                {`${Number(index)+1} | ${listParticipants[index]["name"]}`}
                            </span>
                          }
                        />

                        <IconButton
                        aria-label="delete" 
                        size="small"
                        style={{ color: 'red' }}
                        onClick={null}//() => handleApproval("no", index)} --->>> TODO
                        >
                            <PersonAddDisabledIcon />
                        </IconButton>
                        <Icon
                        fontSize='large'
                        style={{ color: 'white'}}
                        >
                        </Icon>
                        <IconButton 
                        aria-label="delete" 
                        size="small"
                        style={{ color: 'blue' }}
                        onClick={() => handleApproval("yes", index)}
                        >
                            <PersonAddIcon/>
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