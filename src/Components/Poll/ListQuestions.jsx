import React from 'react';

import ListItem from '@material-ui/core/ListItem';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';

const ListQuestions = ({ classes, listQnP, removeItem}) => {
    const { snacker, message, margin, formControl, group } = classes;
    const tempList = listQnP.map((data, i) => {
        return(
                <div key={i}>
                    <ListItem >
                            <SnackbarContent className={snacker}
                              aria-describedby="client-snackbar"
                              message={
                                <span id="client-snackbar" className={message}>
                                    <span>Q.{i+1} &nbsp;</span>
                                    {data}
                                    <IconButton onClick={() => removeItem("questionPolling", i)} 
                                        aria-label="delete" 
                                        className={margin} size="small">
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

export default ListQuestions;