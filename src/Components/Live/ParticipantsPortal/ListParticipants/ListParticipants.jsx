import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const ListParticipants = ({ listParticipants, handleInvite}) => {
    const classes = useStyles();
    const tempList = Object.keys(listParticipants).map((id, i) =>{
        if(listParticipants[id])
            return(
                <div key={i}>
                    <ListItem disabled onClick={() => handleInvite(true, i)} button>
                        <Chip 
                        className={classes.message}
                        label={`${Number(id)+1} | ${listParticipants[id]}`} 
                        color="primary" />
                    </ListItem>
                    <Divider />
                </div>
            )
        else
            return(
                <div key={i}>
                    <ListItem onClick={() => handleInvite(true, i)} button>
                        <Chip label={Number(id)+1} color="primary" />
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