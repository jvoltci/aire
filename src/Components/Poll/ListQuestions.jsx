import React from 'react';

import { RedRadio, GreenRadio } from '../useStyles.jsx';

import ListItem from '@material-ui/core/ListItem';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
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
                    <FormControl component="fieldset" className={formControl}>
                        <RadioGroup row
                          className={group}
                          value="1"
                        >
                        <FormControlLabel
                        value="1"
                        control={
                            <GreenRadio
                            checked={'a' === 'c'}
                            value="c"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'C' }}
                            />
                        }
                        label="Yes"
                        labelPlacement="end"
                        />

                        <FormControlLabel
                        value="0"
                        control={
                            <RedRadio
                            checked={'b' === 'c'}
                            value="c"
                            name="radio-button-demo"
                            inputProps={{ 'aria-label': 'C' }}
                            />
                        }
                        label="No"
                        labelPlacement="end"
                        />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                </div>
            )
    })
    return tempList;
}

export default ListQuestions;