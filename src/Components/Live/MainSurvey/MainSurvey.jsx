import React from 'react';

import {Centered} from '../../Styles.jsx';
import LivePollHead from '../../Head/LivePollHead.jsx';
import Title from '../../Poll/Body/Title.jsx'
import ListToAnswerQuestions from './ListToAnswerQuestions/ListToAnswerQuestions.jsx'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const MainSurvey = ({
	handleRadio,
	handleSubmit,
	listQnP,
	onPage,
	pseudonym,
	switchPage,
}) => {
	const classes = useStyles();

	return(
		<div>
			<LivePollHead
			onPage={onPage}
			switchPage={switchPage.bind(this)}
			/> 

			<Title
			pseudonym={pseudonym}
			/>

			<ListToAnswerQuestions
			handleRadio={handleRadio.bind(this)}
			listQnP={listQnP}
			/>

			<Centered>
                <Button
                    onClick={() => handleSubmit()}
                    variant="contained" 
                    color="primary" 
                    className={classes.button}>
                    Submit
                </Button>
            </Centered>
		</div>
	)
}

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default MainSurvey;