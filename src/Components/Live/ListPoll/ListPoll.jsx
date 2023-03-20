import React from 'react';



import ListItem from '@material-ui/core/ListItem';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';

const ListPoll = ({polls, switchPage, updatePseudonym, updateParticipants}) => {
	const classes = useStyles();
	if(!polls) return null;

	const data = Object.keys(polls).map((pseudonym, i) => {
		return(
			<ListItem key={i} >
		            <SnackbarContent
		            className={classes.snacker}
		              aria-describedby="client-snackbar"
		              message={
		                <Badge 
		                className={classes.margin}
		                invisible={!polls[pseudonym]}
		                color='secondary'
		                variant="dot" 
		                >
					        <Typography className={classes.padding}>
					        {pseudonym}
					        </Typography>
					    </Badge>
		              }
		            />
		            <Button
		            onClick={() => {
		            	fetch('https://aire-api.onrender.com/listparticipants', {
				        method: 'post',
				        headers: {'Content-Type': 'application/json'},
				        body: JSON.stringify({
				          pseudonym: pseudonym
				        })
				      })
				        .then(response => response.json())
				        .then(list => {
				        	updatePseudonym(pseudonym);
				        	updateParticipants(list);

				        	if(list) switchPage(4);
				        })
		            }}
		            className={classes.margin} size="small">
	                	Enter
	                </Button>


		    </ListItem>
		)
	})
	return data;
}

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
   padding: {
    padding: theme.spacing(0, 2),
  },
  snacker: {
  	backgroundColor: 'teal',
  }
}));


export default ListPoll;