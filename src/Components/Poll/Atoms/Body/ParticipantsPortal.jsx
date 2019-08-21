import React from 'react';

import {Centered} from  '../../../useStyles.jsx';
import ListParticipants from '../../ListParticipants.jsx';

import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ButtonMaterialUI from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const ParticipantsPortal = ({classes, listParticipants, wantParticipant, handleInvite, changeName, participantName, disableCurrentParticipant, disabledParticipants, currentParticipantClickSerial}) => {
	return(
        <Centered>

            <List component="nav" className={classes.root} aria-label="mailbox folders">

                <ListParticipants
                listParticipants={listParticipants}
                handleInvite={handleInvite.bind(this)}
                disabledParticipants={disabledParticipants}
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
                    onChange={(e) => changeName(e)}
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
                                if(participantName) {
                                    disableCurrentParticipant(currentParticipantClickSerial);
                                    handleInvite(false);
                                }
                            }
                        }
                            color="primary"
                            variant="contained"
                            >
                    Enter
                  </ButtonMaterialUI>
                </DialogActions>
            </Dialog>
        </Centered>
	)
}

export default ParticipantsPortal;