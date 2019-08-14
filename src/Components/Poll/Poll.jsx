import React from 'react';
import { Redirect } from 'react-router-dom';
import PrimaryDialog from './Atoms/PrimaryDialog/PrimaryDialog.jsx';
import SecondaryDialog from './Atoms/SecondaryDialog/SecondaryDialog.jsx';
 
import {useStyletron, styled} from 'baseui';
import {Block} from 'baseui/block';
import {Button, SHAPE} from 'baseui/button';
import Plus from 'baseui/icon/plus';
import {Heading, HeadingLevel} from 'baseui/heading';
import {StatefulList} from 'baseui/dnd-list';

import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import ButtonMaterialUI from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ThreeSixtyIcon from '@material-ui/icons/ThreeSixty';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

 
const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const Rightened = styled('div', {
  display: 'flex',
  float: 'right',
  height: '100%',
});
 
const initialState = {
            isPrimaryOpen: false,
            isSecondaryOpen: false,
            pollQuestions: [],
            homeClick: false,
            nextPage: false,
            isFinalClientPage: false,
            totalParticipants: 0,
            wantParticipant: false,
            participantName: '',
            participantsInterfaceSerial: [],
            switchState: false,
            currentParticipantClickSerial: -1,
        }

class Polle extends React.Component {
 
    constructor() {
        super();
        if(!localStorage.getItem('poll')) {
          localStorage.setItem('poll', JSON.stringify(initialState))
          this.state = initialState;
        }
        else {
          this.state = JSON.parse(localStorage.getItem('poll'));
        }
    }
 
    toggleDialog(surface, dialogSwitch) {
        if(surface === "primary") {
            this.setState({isPrimaryOpen: dialogSwitch}, () => {
                localStorage.setItem('poll', JSON.stringify(this.state));
            })
        }
        if(surface === "secondary") {
            this.setState({isSecondaryOpen: dialogSwitch}, () => {
                localStorage.setItem('poll', JSON.stringify(this.state));
            })
        }
    }
 
    updatePollQuestions(question) {
        const prevQ = this.state.pollQuestions;
        prevQ.push(question);
        this.setState({pollQuestions: prevQ}, () => {
            localStorage.setItem('poll', JSON.stringify(this.state))
        });
    }
 
    removeItem(index) {
        const prevQ = this.state.pollQuestions;
        prevQ.splice(index, 1);
        this.setState({pollQuestions: prevQ}, () => {
            localStorage.setItem('poll', JSON.stringify(this.state))
        });
    }
    handleHomeClick() {
        this.props.handleRedirect('', false);
        localStorage.setItem('pseudonym', JSON.stringify(this.props.initialState));
        localStorage.setItem('poll', JSON.stringify(initialState));
        this.setState({homeClick: true});
    }
    toggleNext(nextSwitch) {
        this.setState({nextPage: nextSwitch}, () => console.log(''))
    }
    handleParticipants(event) {
        this.setState({totalParticipants: event.target.value}, () => localStorage.setItem('poll', JSON.stringify(this.state)))
    }
    handleFinal() {
        
        const tempParticipantsInterfaceSerial = this.state.participantsInterfaceSerial;
        for(let i = 0; i < this.state.totalParticipants; ++i) {
            tempParticipantsInterfaceSerial.push(
                <div key={i}>
                    <Divider />
                    <ListItem data-txt={i} onClick={(e) => this.handleInvite(true, e)} button>
                        <ListItemText primary={i+1} />
                    </ListItem>
                </div>
            )
        }
        this.setState({participantsInterfaceSerial: tempParticipantsInterfaceSerial, isFinalClientPage: true});
    }
    handleInvite(inviteSwitch, e) {
        if(e)
            this.setState({wantParticipant: inviteSwitch, currentParticipantClickSerial: e.target.dataset.txt})
        else
            this.setState({wantParticipant: inviteSwitch})
    }
    changeName(event) {
        this.setState({participantName: event.target.value})
    }
    disableCurrentParticipant(index) {
        const tempParticipantsInterfaceSerial = this.state.participantsInterfaceSerial;
        tempParticipantsInterfaceSerial.filter((val, i) => {
            if(i === index) {
                return(
                    <div key={i}>
                        <Divider />
                        <ListItem disabled onClick={() => this.handleInvite(true)} button>
                            <ListItemText primary={i+1} />
                        </ListItem>
                    </div>
                )
            }
            else
                return(
                    <div key={i}>
                        <Divider />
                        <ListItem disabled onClick={() => this.handleInvite(true)} button>
                            <ListItemText primary={i+1} />
                        </ListItem>
                    </div>
                )
        })
        this.setState({participantsInterfaceSerial: tempParticipantsInterfaceSerial});
    }
    toggleSwitch() {
        this.setState({switchState: !this.state.switchState}, () => {
            localStorage.setItem('poll', JSON.stringify(this.state));
        })
    }
    render() {
        if(this.state.homeClick) {
            return (<Redirect to={'/'} />)
        }

        const { isPrimaryOpen, isSecondaryOpen, pollQuestions } = this.state;

        return(
            <div>
            {
                !this.state.isFinalClientPage ?
                    <div>
                    <Paper>
                        {!this.state.isFinalClientPage ?
                            <AppBar position="static">
                                <Toolbar>
                                    <Fab
                                        onClick={() => {this.handleHomeClick();}}
                                    >
                                        <HomeIcon 
                                            className={this.props.classes.iconHover} 
                                            color="error" 
                                            style={{ fontSize: 30 }} />
                                    </Fab>
                                    <Typography variant="h6" className={this.props.classes.title}>
                                        &nbsp; aire
                                    </Typography>
                                    <Rightened>
                                        <Fab>
                                            <Grid item xs={8}>
                                                <ThreeSixtyIcon 
                                                    onClick={() => this.toggleNext(false)}
                                                    color="error" 
                                                    className={this.props.classes.icon}
                                                />
                                            </Grid>
                                        </Fab>
                                    </Rightened>
                                </Toolbar>
                            </AppBar> : null
                           
                        }

                        <Centered>

                            <Block paddingTop="100px" />
         
                            <HeadingLevel>
                                <HeadingLevel>
                                </HeadingLevel>
                                <HeadingLevel>
                                    <Heading>{this.props.pseudonym}</Heading>
                                </HeadingLevel>
                            </HeadingLevel>
         
                        </Centered>
                    </Paper>
     
                    {
                        !this.state.nextPage ?
                            <div>
                                <Paper>
                                    <StatefulList
                                        removable
                                        initialState={{
                                          items: pollQuestions,
                                        }}
                                        overrides={{
                                          Label: {
                                            style: ({$isDragged, $theme}) => ({
                                              fontSize: $isDragged ? '20px' : null,
                                              color: $isDragged ? $theme.colors.warning : null,
                                            }),
                                          },
                                        }}
                                        onChange={(oldIndex, newIndex) => {this.removeItem(oldIndex)} }
                                      />
                                </Paper>
                        
                                <Centered>
                 
                                    <Block paddingTop="500px" />
                 
                                    <Button 
                                        overrides={
                                            {
                                                BaseButton: {
                                                    style: ({ $theme }) => {
                                                              return {
                                                                outline: `${$theme.colors.warning}`,
                                                                backgroundColor: $theme.colors.warning
                                                              };
                                                            }
                                                }
                                            }
                                        }
                                        shape={SHAPE.round}
                                        onClick={() => this.toggleDialog("primary", true)}
                                    >
                                        <Plus color={'white'} size={50} />
                                    </Button>
                 
                                    <PrimaryDialog space={this.props.space} isPrimaryOpen={isPrimaryOpen} toggleDialog={this.toggleDialog.bind(this)} />
                                    <SecondaryDialog 
                                        isSecondaryOpen={isSecondaryOpen} 
                                        toggleDialog={this.toggleDialog.bind(this)}
                                        updatePollQuestions={this.updatePollQuestions.bind(this)}
                                         />

                                    <ButtonMaterialUI
                                        onClick={() => this.toggleNext(true)}
                                        variant="contained" 
                                        color="primary" 
                                        className={this.props.classes.button}>
                                        Next
                                        <Icon className={this.props.classes.rightIcon}>send</Icon>
                                    </ButtonMaterialUI>
                                </Centered> 
                            </div> :

                            <div>
                                <Paper>
                                    <Centered>
                                        <TextField
                                        id="outlined-number"
                                        label="Participants"
                                        onChange={(e) => this.handleParticipants(e)}
                                        type="number"
                                        className={this.props.classes.textField}
                                        InputLabelProps={{
                                          shrink: true,
                                        }}
                                        margin="normal"
                                        variant="outlined"
                                        />
                                        <FormGroup>
                                          <FormControlLabel
                                            control={<Switch size="medium" checked={this.state.switchState} onClick={this.toggleSwitch.bind(this)} />}
                                            label="Secure"
                                          />
                                        </FormGroup>
                                    </Centered>
                                </Paper>
                                <Centered>
                                        <Block paddingTop="300px" />
                                        <ButtonMaterialUI
                                            onClick={() => this.handleFinal()}
                                            variant="contained" 
                                            color="primary" 
                                            className={this.props.classes.buttonDone}>
                                            Done
                                        </ButtonMaterialUI>
                                    
                                </Centered>
                            </div>
                    }
                </div> : 
                <Centered>

                    <List component="nav" className={this.props.classes.root} aria-label="mailbox folders">
                      {this.state.participantsInterfaceSerial}
                    </List>

                    <Dialog fullWidth open={this.state.wantParticipant} onClose={() => {
                          this.handleInvite(false);
                        }} 
                        aria-labelledby="form-dialog-title">
                        <DialogContent>
                          <TextField
                            id="outlined-multiline-flexible"
                            label="Name"
                            onChange={(e) => this.changeName(e)}
                            margin="normal"
                            variant="outlined"
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button 
                            onClick={() => this.handleInvite(false)}
                            color="primary">
                            Cancel
                          </Button>
                          <Button onClick={() => 
                                    {
                                        this.disableCurrentParticipant(this.state.currentParticipantClickSerial);
                                        this.handleInvite(false);
                                    }}
                                    color="primary"
                                    variant="contained"
                                    >
                            Ask
                          </Button>
                        </DialogActions>
                    </Dialog>
                </Centered>
            }
            </div>
        )
    }
}


const HomeIcon = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  buttonDone: {
    margin: theme.spacing(1),
    fontSize: 25,
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  iconHover: {
    margin: theme.spacing(2),
    '&:hover': {
      color: "black",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  icon: {
    margin: theme.spacing(0),
    fontSize: 40,
  },
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    flexGrow: 1,
  },
}));
 
const Poll = ({pseudonym, initialState, handleRedirect}) => {
    const [useCss, theme] = useStyletron();
    const space = useCss({marginLeft: theme.sizing.scale1200});
    const classes = useStyles();
    return(
        <Polle handleRedirect={handleRedirect} initialState={initialState} classes={classes} pseudonym={pseudonym} space={space} />
    );
}
 
export default Poll;