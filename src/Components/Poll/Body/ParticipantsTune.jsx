import React from 'react';
import Socket from '../../../redux/Socket';

import { Centered } from '../../Styles.jsx';

import {Block} from 'baseui/block';

import Paper from '@material-ui/core/Paper';
import ButtonMaterialUI from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

const initialState = {
    tempTotalParticipants: 0,
}

class ParticipantsTuneE extends React.Component {
    constructor() {
        super();
        if(!localStorage.getItem('tempTotalParticipants')) {
          localStorage.setItem('tempTotalParticipants', JSON.stringify(initialState))
          this.state = initialState;
        }
        else {
          this.state = JSON.parse(localStorage.getItem('tempTotalParticipants'));
        }
    }

    handleFinal(totalParticipants) {
        this.props.updateAdmin(totalParticipants);
        this.props.switchPage(6);
        Socket.emit('le poll', {
            isSecure: this.props.secureState,
            pseudonym: this.props.pseudonym,
            questions: this.props.listQnP,
            totalParticipants: totalParticipants,
        })
      }

    handleParticipants(event) {
      this.setState({tempTotalParticipants: event.target.value}, () => {
        this.props.updateAdmin(this.state.tempTotalParticipants);
      })
    }

    render() {
        return(
            <div>
                <Paper>
                    <Centered>
                        <TextField
                        id="outlined-number"
                        label="Participants"
                        onChange={(e) => this.handleParticipants(e)}
                        type="number"
                        className={this.props.classes.textField}
                        defaultValue={0}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        autoFocus
                        />
                        <FormGroup>
                          <FormControlLabel
                            control={
                                <Switch size="medium" 
                                checked={this.props.secureState} 
                                onClick={() => this.props.toggleSwitch()} 
                                />}
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
                                if(this.state.tempTotalParticipants > 1)
                                    return this.handleFinal(this.state.tempTotalParticipants)
                            }}
                            variant="contained" 
                            color="primary" 
                            className={this.props.classes.buttonDone}>
                            Done
                        </ButtonMaterialUI>
                    
                </Centered>
            </div>
        )
    }
}

const useStyles = makeStyles(theme => ({
  buttonDone: {
    margin: theme.spacing(1),
    fontSize: 25,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxlength: 200,
  },
}));

const ParticipantsTune =({ pseudonym, listQnP, secureState, totalParticipants, switchPage, toggleSwitch, isSecure, updateAdmin}) => {
    const classes = useStyles();
    return(
        <ParticipantsTuneE
        classes={classes}
        isSecure={isSecure}
        pseudonym={pseudonym}
        listQnP={listQnP}
        secureState={secureState}
        switchPage={switchPage}
        totalParticipants={totalParticipants}
        toggleSwitch={toggleSwitch}
        updateAdmin={updateAdmin}
        />
    )
}

export default ParticipantsTune;