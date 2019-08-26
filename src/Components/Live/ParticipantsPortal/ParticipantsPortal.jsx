import React from 'react';

import {Centered} from  '../../Styles.jsx';
import ListParticipants from './ListParticipants/ListParticipants.jsx';

import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ButtonMaterialUI from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

class ParticipantsPortalE extends React.Component {
    constructor() {
        super();
        this.state = {
            tempParticipantName: '',
        }
    }

    tempChangeName(e) {
        this.setState({tempParticipantName: e.target.value});
    }
    
    render() {
        const {
            classes,
            currentParticipantClickSerial,
            disableCurrentParticipant,
            handleInvite,
            listParticipants,
            wantParticipant,
        } = this.props;

        return(
            <Centered>

                <List component="nav" className={classes.root} aria-label="mailbox folders">

                    <ListParticipants
                    listParticipants={listParticipants}
                    handleInvite={handleInvite.bind(this)}
                    />

                </List>

                <Dialog fullWidth open={wantParticipant} onClose={() => {
                      handleInvite(false);
                    }} 
                    aria-labelledby="form-dialog-title">
                    <DialogContent>
                      <TextField
                        required
                        id="outlined-multiline-flexible"
                        label="Name"
                        onChange={(e) => this.tempChangeName(e)}
                        margin="normal"
                        variant="outlined"
                        autoFocus
                      />
                    </DialogContent>
                    <DialogActions>
                      <ButtonMaterialUI 
                        onClick={() => handleInvite(false)}
                        color="primary">
                        Cancel
                      </ButtonMaterialUI>
                      <ButtonMaterialUI onClick={() => 
                                {   
                                    if(this.state.tempParticipantName) {
                                        handleInvite(false);
                                        disableCurrentParticipant(currentParticipantClickSerial, this.state.tempParticipantName);
                                    }
                                }
                            }
                                color="primary"
                                variant="contained"
                                >
                        Register
                      </ButtonMaterialUI>
                    </DialogActions>
                </Dialog>
            </Centered>
        )
    }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ParticipantsPortal = ({
    currentParticipantClickSerial,
    disableCurrentParticipant,
    handleInvite,
    listParticipants,
    wantParticipant,
}) => {
    const classes = useStyles();
    return(
        <ParticipantsPortalE
        classes={classes}
        currentParticipantClickSerial={currentParticipantClickSerial}
        disableCurrentParticipant={disableCurrentParticipant.bind(this)}
        handleInvite={handleInvite.bind(this)}
        listParticipants={listParticipants}
        wantParticipant={wantParticipant}
        />
    )
}

export default ParticipantsPortal;