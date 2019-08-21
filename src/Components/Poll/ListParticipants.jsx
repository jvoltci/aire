import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';

const ListParticipants = ({ listParticipants, handleInvite, disabledParticipants}) => {
    const tempList = listParticipants.map((serial, i) =>{
        if(serial === -1)
        return(
            <div key={i}>
                <ListItem disabled onClick={() => handleInvite(true, i)} button>
                    <Chip label={`${i+1} | ${disabledParticipants[i]}`} color="primary" />
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

export default ListParticipants;