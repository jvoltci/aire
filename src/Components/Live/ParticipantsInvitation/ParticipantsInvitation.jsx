import React from 'react';

import Title from '../../Poll/Body/Title.jsx'
import ListRequestedParticipants from './ListRequestedParticipants/ListRequestedParticipants.jsx';
import ListAddedParticipants from './ListAddedParticipants/ListAddedParticipants.jsx';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const ParticipantsInvitation = ({pseudonym}) => {
	const classes = useStyles();
	return(
		<div>

			<Title
			pseudonym={pseudonym}
			/>

			<Paper>
				<List component="nav" className={classes.root} aria-label="mailbox folders">

	                <ListRequestedParticipants
	                />

	            </List>
			</Paper>

			

			<Paper>
				<List component="nav" className={classes.root} aria-label="mailbox folders">

	                <ListAddedParticipants
	                />

	            </List>
			</Paper>

		</div>
	)
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: '360px',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default ParticipantsInvitation;