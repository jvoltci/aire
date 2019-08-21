import React from 'react';

import { Centered } from '../../../useStyles.jsx';

import {Block} from 'baseui/block';

import Paper from '@material-ui/core/Paper';
import ButtonMaterialUI from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const ParticipantsTune = ({handleParticipants, classes, switchState, toggleSwitch, totalParticipants, handleFinal}) => {
	return(
        <div>
            <Paper>
                <Centered>
                    <TextField
                    id="outlined-number"
                    label="Participants"
                    onChange={(e) => handleParticipants(e)}
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                    autoFocus
                    />
                    <FormGroup>
                      <FormControlLabel
                        control={<Switch size="medium" checked={switchState} onClick={() => toggleSwitch()} />}
                        label="Secure"
                      />
                    </FormGroup>
                </Centered>
            </Paper>
            {/*Done Button on Page 2 Participants*/}
            <Centered>
                    <Block paddingTop="300px" />
                    <ButtonMaterialUI
                        onClick={() => {
                            if(totalParticipants > 1)
                                return handleFinal()
                        }}
                        variant="contained" 
                        color="primary" 
                        className={classes.buttonDone}>
                        Done
                    </ButtonMaterialUI>
                
            </Centered>
        </div>
	)
}

export default ParticipantsTune;