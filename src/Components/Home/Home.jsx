import React from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from "react-redux";

import Footer from './Atoms/Footer';
import './Home.css';
import {Centered, Rightened} from  '../Styles.jsx';
import {switchPage, updatePseudonym} from '../../redux/actions';

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
const useStyles = makeStyles(theme => ({
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


class HomeE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pseudonym: this.props.pseudonym,
      inProgress: false,
      isDisable: false,
    }
  }
  changePseudonym(event) {
    this.setState({pseudonym: event.target.value});     
  }
  checkPseudonym = () => {
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
            if(flag) { 
              this.props.updatePseudonym(this.state.pseudonym);
              return this.props.switchPage(1);}
          }
        )
    }
  }

  render() {
    const {classes} = this.props;
    if(this.props.onPage === 1) return <Redirect to={'/unique'} />
    else if(this.props.onPage === -1) return <Redirect to={'/live'} />


    return (
      <div id="home" className="container">
        <ButtonMaterialUI onClick={() => this.props.switchPage(-1)}>
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

        <div className={classes.root} noValidate>
          <ValidationTextField fullWidth
            onChange={(e) => this.changePseudonym(e)}
            className={classes.margin}
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
                <CircularProgress className={classes.progress} />
              </Centered>
             :

            null
          }
        <Footer>
          ©{(new Date()).getFullYear()}
        <span>&nbsp;Copyright: &nbsp;</span> 
        <a style={{fontWeight: 'bold', color: 'black'}} target="_blank" rel="noopener noreferrer" href="https://ivehement.wordpress.com">IVehement, Inc.</a>
        </Footer>
      </div>
    );
  }
}



const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  switchPage: (payload) => dispatch(switchPage(payload)),
  updatePseudonym: (payload) => dispatch(updatePseudonym(payload)),
});

const Home = ({rootReducer, switchPage, updatePseudonym}) => {
  const classes = useStyles();
  return(
    <HomeE
    classes={classes}
    onPage={rootReducer.onPage}
    pseudonym={rootReducer.pseudonym}
    switchPage={switchPage}
    updatePseudonym={updatePseudonym}
    />
  )
}

const ConnectedLayer = connect(mapStateToProps, mapDispatchToProps)(Home);
export default ConnectedLayer;