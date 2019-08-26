import React from 'react';
import {Redirect} from 'react-router-dom';

import {Block} from 'baseui/block';

import LivePollHead from '../Head/LivePollHead.jsx';
import LiveHead from '../Head/LiveHead.jsx';
import ListPoll from './ListPoll/ListPoll.jsx';
import LiveFeed from './LiveFeed.jsx';
import MainSurvey from './MainSurvey/MainSurvey.jsx'
import ParticipantsPortal from './ParticipantsPortal/ParticipantsPortal.jsx';
import ParticipantsInvitation from './ParticipantsInvitation/ParticipantsInvitation.jsx'

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

class LivePollE extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pollResult: {},
		}
/*		this.props.socket.on('update pollResult', pollResult => {
			this.setState({pollResult: this.state.pollResult})
		})*/
	}
	handleInitialSubmit() {
		if(Object.keys(this.state.pollResult).length > 0)
			this.props.handleSubmit(this.state.pollResult);
	}
	handleRadio(e, i) {
		const tempResult = this.state.pollResult;
		tempResult[i] = e.target.value;
		this.setState({pollResult: tempResult});
	}
	render() {
		const {
			classes,
			currentParticipantClickSerial,
			disableCurrentParticipant,
			handleHomeClick, 
			handleInvite,
			handleWarningClick, 
			isAdmin,
			listParticipants,
			listQnP,
			onPage,
			participantNotify,
			polls,
			pseudonym, 
			switchPage,
			toggleDialog,
			wantParticipant,
			warning,
		} = this.props;
		if(onPage === 0) return <Redirect to={'/'} />

		return(
			<div>
				{
					onPage === -1 ?

					<div>
						<LivePollHead
						onPage={onPage}
						switchPage={switchPage.bind(this)}
						/> 
						
			            <React.Fragment>
			              <CssBaseline />
			              <Container maxWidth="sm">
			                <List component="nav" aria-label="main mailbox folders">
			                    <Block paddingTop="50px" />

			                        <ListPoll
			                        polls={polls}
			                        switchPage={switchPage.bind(this)}
			                        />

			                    <Block paddingTop="50px" />
			                </List>
			              </Container>
			            </React.Fragment>

					</div> :

					<div>
						{
							onPage === 3 ?

							<div>

								<LiveHead
					            handleHomeClick={handleHomeClick.bind(this)}
					            handleWarningClick={handleWarningClick.bind(this)}
					            isAdmin={isAdmin}
					            onPage={onPage}
					            participantNotify={participantNotify}
					            pseudonym={pseudonym}
					            switchPage={switchPage.bind(this)}
					            toggleDialog={toggleDialog.bind(this)}
					            warning={warning}
					            />

					            <ParticipantsInvitation
					            pseudonym={pseudonym}
					            />

							</div> :

							<div>
							{
								onPage === 4 ?

								<div>
									<LivePollHead
									onPage={onPage}
									switchPage={switchPage.bind(this)}
									/> 

			                        <ParticipantsPortal
			                        currentParticipantClickSerial={currentParticipantClickSerial}
			                        disableCurrentParticipant={disableCurrentParticipant.bind(this)}
			                        handleInvite={handleInvite.bind(this)}
			                        listParticipants={listParticipants}
			                        polls={polls}
			                        pseudonym={pseudonym}
			                        wantParticipant={wantParticipant}
			                        />
								</div> :

								<div>


									{
										onPage === 5 ?

										<MainSurvey 
										handleRadio={this.handleRadio.bind(this)}
										handleInitialSubmit={this.handleInitialSubmit.bind(this)}
										listQnP={listQnP}
										onPage={onPage}
										pseudonym={pseudonym}
										switchPage={switchPage.bind(this)}
										/> :

										<LiveFeed 
										classes={classes}
										handleHomeClick={handleHomeClick.bind(this)}
							            handleWarningClick={handleWarningClick.bind(this)}
							            isAdmin={isAdmin}
							            listQnP={listQnP}
							            onPage={onPage}
							            participantNotify={participantNotify}
							            pseudonym={pseudonym}
							            switchPage={switchPage.bind(this)}
							            toggleDialog={toggleDialog.bind(this)}
							            warning={warning}
										/>									
									}

								</div>
							}
							</div>
						}
					</div>
				}
			</div>
		)
	}
}
const useStyles = makeStyles(theme => ({
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
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const LivePoll  = ({
	currentParticipantClickSerial,
	disableCurrentParticipant,
	handleHomeClick, 
	handleInvite,
	handleSubmit,
	handleWarningClick, 
	isAdmin,
	listParticipants,
	listQnP,
	onPage,
	participantNotify,
	polls,
	pseudonym, 
	switchPage,
	toggleDialog,
	wantParticipant,
	warning,
}) => {
	const classes = useStyles();
	return(
		<LivePollE
		classes={classes}
		currentParticipantClickSerial={currentParticipantClickSerial}
		disableCurrentParticipant={disableCurrentParticipant.bind(this)}
		handleHomeClick={handleHomeClick.bind(this)}
		handleInvite={handleInvite.bind(this)}
		handleSubmit={handleSubmit.bind(this)}
		handleWarningClick={handleWarningClick.bind(this)}
		isAdmin={isAdmin}
		listParticipants={listParticipants}
		listQnP={listQnP}
		onPage={onPage}
		participantNotify={participantNotify}
		polls={polls}
		pseudonym={pseudonym}
		switchPage={switchPage.bind(this)}
		toggleDialog={toggleDialog.bind(this)}
		wantParticipant={wantParticipant}
		warning={warning}
		/>
	)
}

export default LivePoll;