import React from 'react';

import { RedRadio, GreenRadio } from '../../../Styles.jsx';

import ListItem from '@material-ui/core/ListItem';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

const ListToAnswerQuestions = ({ listQnP, handleRadio }) => {
    
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
                                </span>
                              }
                            />
                    </ListItem>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <RadioGroup row
                        className={classes.group}
                        onChange={(e) => handleRadio(e, i)}
                        >
	                        <FormControlLabel
	                        value="1"
	                        control={ <GreenRadio/> }
	                        label="Yes"
	                        labelPlacement="end"
	                        />

	                        <FormControlLabel
	                        value="0"
	                        control={ <RedRadio/> }
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

export default ListToAnswerQuestions;