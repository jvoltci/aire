import React from 'react';

import { Centered } from '../../Styles.jsx';
import PrimaryDialog from './PrimaryDialog/PrimaryDialog.jsx';
import SecondaryDialog from './SecondaryDialog/SecondaryDialog.jsx';
import ListQuestions from './ListQuestions/ListQuestions.jsx';

import {Block} from 'baseui/block';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import ButtonMaterialUI from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';



const Questions = ({myref, listQnP, removeItem, toggleDialog, space, isPrimaryOpen, isSecondaryOpen, updatePollQuestions, listQnPLength, switchPage}) => {

    const classes = useStyles();
	return(
        <React.Fragment>

            
            <Paper>
                <List component="nav" aria-label="main mailbox folders">

                    <ListQuestions
                    listQnP={listQnP}
                    removeItem={removeItem.bind(this)}
                    />

                </List>
            </Paper>
    
            <Centered>
                
                {/*Add Button*/}
                <Block paddingTop="500px" />
                <div id="scroll" myref={myref}>
                    <Fab 
                    size="large" 
                    onClick={(e) => toggleDialog("primary", true) }
                    color="secondary" 
                    aria-label="add" 
                    className={classes.fab}
                    >
                        <AddIcon />
                    </Fab>
                </div>
                
                {/*Question or Poll Dialog Box check*/}
                <PrimaryDialog space={space} 
                isPrimaryOpen={isPrimaryOpen} 
                toggleDialog={toggleDialog.bind(this)} />

                {/*Enter Poll Question Dialog Box*/}
                <SecondaryDialog 
                    isSecondaryOpen={isSecondaryOpen} 
                    toggleDialog={toggleDialog.bind(this)}
                    updatePollQuestions={updatePollQuestions.bind(this)}
                     />

                
            </Centered> 

            {/*Next Button on page 1*/}
            <Centered>
                <ButtonMaterialUI
                    onClick={() => {
                        if(listQnPLength > 0)
                            switchPage('', 2)
                    }}
                    variant="contained" 
                    color="primary" 
                    className={classes.button}>
                    Next
                    <Icon className={classes.rightIcon}>send</Icon>
                </ButtonMaterialUI>
            </Centered>
        </React.Fragment> 
	)
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
  fab: {
    margin: theme.spacing(1),
    /*position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',*/
  }
}));

export default Questions;