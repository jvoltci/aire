import React from 'react';

import {Centered} from  '../../Styles.jsx';
import ListParticipants from './ListParticipants/ListParticipants.jsx';
import Socket from '../../../redux/Socket';

import List from '@material-ui/core/List';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ButtonMaterialUI from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

class ParticipantsPortalE extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempParticipantName: '',
            index: -1,
            isApproval: false,
            flag: 0,
        }
        this.props = props;
    }
    componentDidUpdate() {
      if(this.state.index > -1) {
        if(!this.state.flag) this.toggleApproval();
        if(this.props.listParticipants[this.state.index].isAdded === "yes") {
        this.fetchQuestions();
        //console.log(this.props.listParticipants[this.state.index].isAdded);
      }

      if(this.props.listParticipants[this.state.index].isAdded === "no") {
        if(!this.state.flag) this.toggleApproval(); //ToDo
        this.props.listParticipants[this.state.index].isAdded = "neutral";

        Socket.emit('update serverListParticipants', {
            pseudonym: this.props.pseudonym,
            index: this.state.index,
            isAddedAs: 'neutral'
        });
        //console.log(this.props.listParticipants[index]["isAdded"]);
      }
      }
    }

    tempChangeName(e) {
        this.setState({tempParticipantName: e.target.value});
    }

    toggleApproval() {
      this.setState(prevState => ({isApproval: !prevState.isApproval}));
      if(!this.state.flag) this.setState({flag: 1});
    }

    disableCurrentParticipant(index, name) {
      this.toggleApproval();
      this.setState({index: index});
      const listParticipants = this.props.listParticipants;
      listParticipants[index]["name"] = name;
      

      if(this.props.polls[this.props.pseudonym]) {
        Socket.emit('update serverListParticipants', {
            pseudonym: this.props.pseudonym,
            index: index,
            name: name
        })
        this.props.updateParticipants(listParticipants);

        
        //this.handleInvitation(index);
      }
      else {
        Socket.emit('update serverListParticipants', {
            pseudonym: this.props.pseudonym,
            index: index,
            name: name
        });
        this.props.updateParticipants(listParticipants);

        this.fetchQuestions();
      }
      
    }

    fetchQuestions() {
      fetch('https://n-ivehement.herokuapp.com/fetchq', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            pseudonym: this.props.pseudonym
          })
        })
          .then(response => response.json())
          .then(list => {
            this.props.updateQ(list);
            this.props.switchPage(5);
          });
    }

    /*handleInvitation(index) {
      if(this.props.listParticipants[index]["isAdded"] == "yes") {
        this.fetchQuestions();
        console.log(this.props.listParticipants["isAdded"]);
      }

      if(this.props.listParticipants["isAdded"] == "no") {

        this.props.listParticipants["isAdded"] = "neutral";

        Socket.emit('update serverListParticipants', {
            pseudonym: this.props.pseudonym,
            index: index,
            name: name,
            isAddedAs: 'neutral'
        });
        console.log(this.props.listParticipants["isAdded"]);
      }
    }*/
    
    render() {
        const {classes} = this.props;
        return(
            <Centered>

                <List component="nav" className={classes.root} aria-label="mailbox folders">

                    <ListParticipants
                    listParticipants={this.props.listParticipants}
                    updateInvite={this.props.updateInvite}
                    />

                </List>

                <Dialog fullWidth open={this.props.wantParticipant} onClose={() => {
                        this.props.updateInvite(false)
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
                        onClick={() => this.props.updateInvite(false)}
                        color="primary">
                        Cancel
                      </ButtonMaterialUI>
                      <ButtonMaterialUI onClick={() => 
                                {   
                                    if(this.state.tempParticipantName) {
                                        this.disableCurrentParticipant(this.props.currentParticipantClickSerial, this.state.tempParticipantName);
                                        this.props.updateInvite(false)
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

                <Dialog fullWidth open={this.state.isApproval}
                    aria-labelledby="form-dialog-title">
                    <DialogContent>
                      <Centered>
                        <div>
                          {"Waiting for approval..."}
                        </div>
                      </Centered>
                    </DialogContent>
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

const ParticipantsPortal = ({currentParticipantClickSerial, listParticipants, polls, pseudonym, switchPage, updateQ, updateInvite, wantParticipant, updateParticipants}) => {
    const classes = useStyles();
    return(
        <ParticipantsPortalE
        classes={classes}
        currentParticipantClickSerial={currentParticipantClickSerial}
        listParticipants={listParticipants}
        polls={polls}
        pseudonym={pseudonym}
        wantParticipant={wantParticipant}

        switchPage={switchPage}
        updateQ={updateQ}
        updateInvite={updateInvite}
        updateParticipants={updateParticipants}
        />
    )
}

export default ParticipantsPortal;