import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const ListParticipants = ({ listParticipants, handleInvite, disabledParticipants}) => {
    const classes = useStyles();
    const tempList = listParticipants.map((serial, i) =>{
        if(serial === -1)
        return(
            <div key={i}>
                <ListItem disabled onClick={() => handleInvite(true, i)} button>
                    <Chip 
                    className={classes.message}
                    label={`${i+1} | ${disabledParticipants[i]}`} 
                    color="primary" />
                </ListItem>
                <Divider />
            </div>
        )
    else
        return(
            <div key={i}>
                <ListItem onClick={() => handleInvite(true, i)} button>
                    <Chip label={i+1} color="primary" />
                </ListItem>
                <Divider />
            </div>
        )
    } );
    return tempList;
}

const useStyles = makeStyles(theme => ({
  message: {
    display: 'flex',
  },
}));

export default ListParticipants;