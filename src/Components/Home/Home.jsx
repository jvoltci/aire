import React from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';
import {Centered, Rightened} from  '../Styles.jsx';

import {Block} from 'baseui/block';

import ButtonMaterialUI from '@material-ui/core/Button';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CircularProgress from '@material-ui/core/CircularProgress';


const ValidationTextField = withStyles({
  root: {
    '& input:valid + fieldset': {
      borderColor: 'green',
      borderWidth: 2,
    },
    '& input:invalid + fieldset': {
      borderColor: 'red',
      borderWidth: 2,
    },
    '& input:valid:focus + fieldset': {
      borderLeftWidth: 6,
      padding: '4px !important', // override inline-style
    },
  },
})(TextField);

class HomeI extends React.Component {
  constructor() {
    super();
    this.state = {
      pseudonym: 'flai',
      inProgress: false,
      isDisable: false,
    }
  }
  changePseudonym(event) {
    this.setState({pseudonym: event.target.value});     
  }
  checkPseudonym() {
    if(this.state.pseudonym) {
      this.setState({inProgress: true, isDisable: true});
      fetch('https://n-ivehement.herokuapp.com/pseudonym', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          pseudonym: this.state.pseudonym
        })
      })
        .then(response => response.json())
        .then(check => {
            let flag = 0;
            this.setState({inProgress: false, isDisable: false}, () => {
              if(check.isAvailable)
                flag = 1;
            })
            if(flag)
              return this.props.switchPage(this.state.pseudonym, 1)
          }
        )
    }
  }

  render() {
    if(this.props.onPage === 1) return <Redirect to={'/unique'} />
    else if(this.props.onPage === -1) return <Redirect to={'/live'} />
    return (
      <div id="home" className="container">
        <ButtonMaterialUI onClick={() => this.props.switchPage('', -1)}>
            <AssignmentIcon
                style={{ fontSize: 30, color: 'green' }} />
                
            
        </ButtonMaterialUI>

        <Rightened>
        <ButtonMaterialUI>
        
          <a style={{display: "table-cell"}}  rel="noopener noreferrer" href="https://github.com/jvoltci/aire/blob/master/README.md" target="_blank">
              <ErrorOutlineIcon/>
          </a>
        
        </ButtonMaterialUI>
        </Rightened>

        <h3 id="u1">
          <span id="u11">a</span>
          <span id="u12">i</span>
          <span id="u13">r</span>
          <span id="u14">e</span>
        </h3>

        <div className={this.props.classes.root} noValidate>
          <ValidationTextField fullWidth
            onChange={(e) => this.changePseudonym(e)}
            className={this.props.classes.margin}
            label="Survey name"
            required
            variant="outlined"
            defaultValue={this.props.pseudonym}
            id="validation-outlined-input"
          />
        </div>

        <Centered>
          <Block paddingTop="210px" />
          <ButtonMaterialUI size="large" 
            disabled={this.state.isDisable}
            color="primary" 
            variant="contained" 
            onClick={() => this.checkPseudonym()}
            >
            Lets Get Started
          </ButtonMaterialUI>
        </Centered>
        <Block />
        {
            this.state.inProgress ?

            
              <Centered>
                <CircularProgress className={this.props.classes.progress} />
              </Centered>
             :

            null
          }
        

      </div>
    );
  }
}

const Home = ({switchPage, onPage, pseudonym}) => {
  const classes = useStyles();
  return(
    <HomeI onPage={onPage} 
    pseudonym={pseudonym} 
    switchPage={switchPage.bind(this)} 
    classes={classes} />
  )
}

const useStyles = makeStyles(theme => ({
/*  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },*/
  margin: {
    margin: theme.spacing(1),
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

export default Home;