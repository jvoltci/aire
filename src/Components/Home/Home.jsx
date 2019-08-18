import React from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';

import {styled} from 'baseui';
import {Block} from 'baseui/block';

import ButtonMaterialUI from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, makeStyles } from '@material-ui/core/styles';

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

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

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

class HomeI extends React.Component {
  constructor() {
    super();
    this.state = {
      pseudonym: 'flai'
    }
  }
  changePseudonym = (event) => {
    this.setState({pseudonym: event.target.value});     
  }
  render() {
    if(this.props.redirect) return <Redirect to={'/unique'} />
    return (
      <div id="home" className="container">
      
        <h3 id="u1">
          <span id="u11">a</span>
          <span id="u12">i</span>
          <span id="u13">r</span>
          <span id="u14">e</span>
        </h3>

        <React.Fragment className={this.props.classes.root} noValidate>
          <ValidationTextField fullWidth
            onChange={(e) => this.changePseudonym(e)}
            className={this.props.classes.margin}
            label="Survey name"
            required
            variant="outlined"
            defaultValue={this.props.pseudonym}
            id="validation-outlined-input"
          />
        </React.Fragment>
        <Centered>
          <Block paddingTop="300px" />
          <ButtonMaterialUI size="large" 
            color="primary" 
            variant="contained" 
            onClick={() => 
              {
                if(this.state.pseudonym) {
                  this.props.handleRedirect(this.state.pseudonym, true)
                }
              }
            }>
            Lets Get Started
          </ButtonMaterialUI>
        </Centered>

      </div>
    );
  }
}

const Home = ({handleRedirect, redirect, pseudonym}) => {
  const classes = useStyles();
  return(
    <HomeI pseudonym={pseudonym} redirect={redirect} handleRedirect={handleRedirect} classes={classes} />
  )
}

export default Home;