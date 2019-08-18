import React from 'react';
import { Redirect } from 'react-router-dom';
import './Poll.css'

import PrimaryDialog from './Atoms/PrimaryDialog/PrimaryDialog.jsx';
import SecondaryDialog from './Atoms/SecondaryDialog/SecondaryDialog.jsx';
 
import {useStyletron, styled} from 'baseui';
import {Block} from 'baseui/block';
import {Heading, HeadingLevel} from 'baseui/heading';

import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import AddIcon from '@material-ui/icons/Add';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { green, red } from '@material-ui/core/colors';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
  },
  checked: {},
})(props => <Radio color="default" {...props} />);

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
            homeClick: false,
            onPage: 1,
            totalParticipants: 0,
            wantParticipant: false,
            participantName: '',
            listParticipants: [], 
            listQnP: [],
            switchState: false,
            currentParticipantClickSerial: -1,
            warning: false,
            disabledParticipants: {}
        }

const Head = ({classes, handleHomeClick, toggleDialog, handleWarningClick, warning, onPage, switchPage }) => {
    const {iconHover, warn, title, icon} = classes;
    return(
        onPage ?
            <AppBar position="static">
                <Toolbar>
                    <Fab
                        onClick={() => {handleHomeClick();}}
                    >
                        <HomeIcon 
                            className={iconHover} 
                            color="secondary" 
                            style={{ fontSize: 30 }} />
                    </Fab>
                    <Dialog
                        open={warning}
                        TransitionComponent={Transition}
                        keepMounted
                        aria-labelledby="alert-dialog-slide-title"
                    >
                        <DialogActions>
                            <DialogContentText>
                                <span className={warn}>
                                    Are you sure?
                                </span>
                            </DialogContentText>
                            <ButtonMaterialUI 
                            color="secondary"
                            variant="outlined"
                            onClick={() => toggleDialog("warn", false)}
                            >
                            Cancel
                            </ButtonMaterialUI>
                            <ButtonMaterialUI
                            onClick={() => {
                              handleWarningClick();
                            }}
                            color="secondary"
                            variant="contained"
                            >
                            Confirm
                            </ButtonMaterialUI>
                        </DialogActions>
                    </Dialog>
                    


                    <Typography variant="h6" className={title}>
                        &nbsp; aire
                    </Typography>
                    <Rightened>
                        <Fab>
                            <Grid item xs={8}>
                                <ThreeSixtyIcon 
                                    onClick={() => switchPage(onPage-1)}
                                    color="secondary" 
                                    className={icon}
                                />
                            </Grid>
                        </Fab>
                    </Rightened>
                </Toolbar>
            </AppBar> : null
    )
       
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
        this.myRef = React.createRef();
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
        if(surface === "warn")  {
            this.setState({warning: dialogSwitch}, () => {
                localStorage.setItem('poll', JSON.stringify(this.state));
            })
        }
    }
 
    updatePollQuestions(question) {
        const prevQ = this.state.listQnP;
        prevQ.push(question);
        this.setState({listQnP: prevQ}, () => {
            localStorage.setItem('poll', JSON.stringify(this.state))
        });
    }
 
    removeItem(surface, index) {
        console.log(index);
        if(surface === "questionPolling") {
            let temp = this.state.listQnP;
            temp.splice(Number(index), 1);
            this.setState({listQnP: temp}, () => localStorage.setItem('poll', JSON.stringify(this.state)))
        }
    }
    handleHomeClick() {
        this.setState({warning: true}, () => {
            localStorage.setItem('poll', JSON.stringify(this.state));
        })
    }
    handleWarningClick() {
        this.props.handleRedirect('flai', false);
        localStorage.setItem('pseudonym', JSON.stringify(this.props.initialState));
        localStorage.setItem('poll', JSON.stringify(initialState));
        this.setState({homeClick: true});
    }
    switchPage(pageSerial) {
        if(pageSerial > 0)
            this.setState({onPage: pageSerial}, () => localStorage.setItem('poll', JSON.stringify(this.state)))
    }
    handleParticipants(event) {
        this.setState({totalParticipants: event.target.value}, () => localStorage.setItem('poll', JSON.stringify(this.state)))
    }
    handleFinal() {
        
        const listSerials = [];
        for(let i = 0; i < this.state.totalParticipants; ++i) {
            listSerials.push(i)
        }
        this.setState({listParticipants: listSerials, onPage: 3}, 
            () => localStorage.setItem('poll', JSON.stringify(this.state)));
    }
    handleInvite(inviteSwitch, index) {
        if(index >= 0)
            this.setState({wantParticipant: 
                inviteSwitch, participantName: '', 
                currentParticipantClickSerial: index}, () =>  localStorage.setItem('poll', JSON.stringify(this.state)))
        else
            this.setState({wantParticipant: inviteSwitch, participantName: ''}, () => localStorage.setItem('poll', JSON.stringify(this.state)))
    }
    changeName(event) {
        this.setState({participantName: event.target.value})
    }
    disableCurrentParticipant(index) {
        const listSerials = this.state.listParticipants;
        const disabledParticipants = this.state.disabledParticipants;
        disabledParticipants[index] = this.state.participantName;
        for(let i = 0; i < this.state.totalParticipants; ++i)
            if(index === i) 
                listSerials[i] =  -1;
        this.setState({listParticipants: listSerials, 
            disabledParticipants: disabledParticipants}, () => localStorage.setItem('poll', JSON.stringify(this.state)));
    }
    toggleSwitch() {
        this.setState({switchState: !this.state.switchState}, () => {
            localStorage.setItem('poll', JSON.stringify(this.state));
        })
    }
    componentDidMount() {
        window.scrollTo(0, this.myRef.offsetTop);
    }
    render() {
        if(this.state.homeClick) {
            return (<Redirect to={'/'} />)
        }

        const { isPrimaryOpen, isSecondaryOpen } = this.state;

    /*List Participants*/
        const listParticipants = this.state.listParticipants.map((serial, i) => {
            if(serial === -1)
                return(
                    <div key={i}>
                        <ListItem disabled onClick={() => this.handleInvite(true, i)} button>
                            <Chip label={`${i+1} | ${this.state.disabledParticipants[i]}`} color="primary" />
                        </ListItem>
                        <Divider />
                    </div>
                )
            else
                return(
                    <div key={i}>
                        <ListItem onClick={() => this.handleInvite(true, i)} button>
                            <Chip label={i+1} color="primary" />
                        </ListItem>
                        <Divider />
                    </div>
                )
        });

    /*List Questions*/
        const listQnP = this.state.listQnP.map((data, i) => {
            return(
                <div key={i}>
                    <ListItem >
                            <SnackbarContent className={this.props.classes.snacker}
                              aria-describedby="client-snackbar"
                              message={
                                <span id="client-snackbar" className={this.props.classes.message}>
                                    <span>Q.{i+1} &nbsp;</span>
                                    {data}
                                    <IconButton onClick={() => this.removeItem("questionPolling", i)} 
                                        aria-label="delete" 
                                        className={this.props.classes.margin} size="small">
                                      <DeleteIcon id="trash" fontSize="small" />
                                    </IconButton>
                                </span>
                              }
                            />
                    </ListItem>
                    <FormControl component="fieldset" className={this.props.classes.formControl}>
                        <RadioGroup row
                          className={this.props.classes.group}
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

        return(
            <div>
                <Head classes={this.props.classes} 
                toggleDialog={this.toggleDialog.bind(this)}
                handleHomeClick={this.handleHomeClick.bind(this)}
                handleWarningClick={this.handleWarningClick.bind(this)}
                warning={this.state.warning}
                onPage={this.state.onPage}
                switchPage={this.switchPage.bind(this)}
                />
                <div>
                {
                    this.state.onPage < 3 ?
                        <div>
                        <Paper>
                            {/*Heading Box | Home and Back Button*/}
                            <Centered>

                                <Block paddingTop="100px" />
             
                                <HeadingLevel>
                                    <HeadingLevel>
                                    </HeadingLevel>
                                    <HeadingLevel>
                                        <Heading>
                                            <Typography className={this.props.classes.pseudonym}>
                                                {this.props.pseudonym}
                                            </Typography>
                                        
                                        </Heading>
                                    </HeadingLevel>
                                </HeadingLevel>
             
                            </Centered>
                        </Paper>
         
                        {
                            this.state.onPage === 1?
                        /*Main Poll page*/
                                <div>

                                    {/*List Questions and Poll*/}
                                    <Paper>
                                        <List component="nav" aria-label="main mailbox folders">
                                        {listQnP}
                                        </List>
                                    </Paper>
                            
                                    <Centered>
                                        
                                        {/*Add Button*/}
                                        <Block paddingTop="500px" />
                                        <div id="scroll" myref={this.myRef}>
                                            <Fab 
                                            size="large" 
                                            onClick={(e) => this.toggleDialog("primary", true) }
                                            color="secondary" 
                                            aria-label="add" 
                                            className={this.props.classes.fab}
                                            >
                                                <AddIcon />
                                            </Fab>
                                        </div>
                                        
                                        {/*Question or Poll Dialog Box*/}
                                        <PrimaryDialog space={this.props.space} isPrimaryOpen={isPrimaryOpen} toggleDialog={this.toggleDialog.bind(this)} />

                                        {/*Enter Poll Question Dialog Box*/}
                                        <SecondaryDialog 
                                            isSecondaryOpen={isSecondaryOpen} 
                                            toggleDialog={this.toggleDialog.bind(this)}
                                            updatePollQuestions={this.updatePollQuestions.bind(this)}
                                             />

                                        
                                    </Centered> 

                                    {/*Next Button on page 1*/}
                                    <Centered>
                                        <ButtonMaterialUI
                                            onClick={() => {
                                                if(this.state.listQnP.length > 0)
                                                    this.switchPage(2)
                                            }}
                                            variant="contained" 
                                            color="primary" 
                                            className={this.props.classes.button}>
                                            Next
                                            <Icon className={this.props.classes.rightIcon}>send</Icon>
                                        </ButtonMaterialUI>
                                    </Centered>
                                </div> :
                            /*Participant Tune*/
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
                                    {/*Done Button on Page 2 Participants*/}
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
                    <div>
                        {
                            this.state.onPage === 4 ?
                            <div>
                                <Paper>

                                </Paper>

                                <Paper>
                                    
                                </Paper>
                            </div> :
                            /*Participants List Page 3*/
                            <Centered>

                                <List component="nav" className={this.props.classes.root} aria-label="mailbox folders">

                                  {listParticipants}

                                </List>

                                <Dialog fullWidth open={this.state.wantParticipant} onClose={() => {
                                      this.handleInvite(false);
                                    }} 
                                    aria-labelledby="form-dialog-title">
                                    <DialogContent>
                                      <TextField
                                        required
                                        id="outlined-multiline-flexible"
                                        label="Name"
                                        onChange={(e) => this.changeName(e)}
                                        margin="normal"
                                        variant="outlined"
                                      />
                                    </DialogContent>
                                    <DialogActions>
                                      <ButtonMaterialUI 
                                        onClick={() => this.handleInvite(false)}
                                        color="primary">
                                        Cancel
                                      </ButtonMaterialUI>
                                      <ButtonMaterialUI onClick={() => 
                                                {   
                                                    if(this.state.participantName) {
                                                        this.disableCurrentParticipant(this.state.currentParticipantClickSerial);
                                                        this.handleInvite(false);
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
                        }
                    </div>
                }
                </div>
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
    maxlength: 200,
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
  paper: {
    width: '80%',
    maxHeight: 435,
  },
  warn: `
    color: red;
    padding: 0 30px;
  `,
  fab: {
    margin: theme.spacing(1),
  },
  pseudonym: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    color: "teal",
    fontFamily: "Roboto",
    fontSize: "3.7rem"
  },
  chipRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
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
  }
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