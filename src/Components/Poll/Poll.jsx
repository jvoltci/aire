import React from 'react';
import { Redirect } from 'react-router-dom';
import './Poll.css'

import PositiveHead from './Atoms/Head/PositiveHead.jsx';
import Title from './Atoms/Body/Title.jsx';
import Questions from './Atoms/Body/Questions.jsx';
import ParticipantsTune from './Atoms/Body/ParticipantsTune.jsx';
import LiveFeed from '../Live/LiveFeed.jsx';
import ParticipantsPortal from './Atoms/Body/ParticipantsPortal.jsx';
import useStyles from  '../useStyles.jsx';

 
import {useStyletron} from 'baseui';
 
const initialState = {
            isPrimaryOpen: false,
            isSecondaryOpen: false,
            homeClick: false,
            totalParticipants: 0,
            wantParticipant: false,
            participantName: '',
            listParticipants: [], 
            listQnP: [],
            switchState: false,
            currentParticipantClickSerial: -1,
            warning: false,
            disabledParticipants: {},
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
        this.props.switchPage('flai', 0);
        localStorage.setItem('pseudonym', JSON.stringify(this.props.initialState));
        localStorage.setItem('poll', JSON.stringify(initialState));
        this.setState({homeClick: true});
    }
    handleParticipants(event) {
        this.setState({totalParticipants: event.target.value}, () => localStorage.setItem('poll', JSON.stringify(this.state)))
    }
    handleFinal() {
        
        const listSerials = [];
        for(let i = 0; i < this.state.totalParticipants; ++i) {
            listSerials.push(i)
        }
        this.setState({listParticipants: listSerials}, 
            () => {
                this.props.switchPage('', 3);
                localStorage.setItem('poll', JSON.stringify(this.state));
        });
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
        if(this.props.onPage === 0) return <Redirect to='/' />

        const { isPrimaryOpen, isSecondaryOpen } = this.state;

        return(
            <div>
                <PositiveHead classes={this.props.classes}
                toggleDialog={this.toggleDialog.bind(this)}
                handleHomeClick={this.handleHomeClick.bind(this)}
                handleWarningClick={this.handleWarningClick.bind(this)}
                warning={this.state.warning}
                onPage={this.props.onPage}
                switchPage={this.props.switchPage.bind(this)}
                />
                <div>
                {
                    this.props.onPage < 3 ?
                        <div>
                            {/*Heading Box | Home and Back Button*/}
                            <Title
                            pseudonym={this.props.pseudonym}
                            stylePseudonym={this.props.classes.pseudonym}
                             />
         
                        {
                            this.props.onPage === 1?

                        /*Main Poll page*/
                            /*List Questions and Poll*/
                            <Questions
                            myref={this.myRef}
                            listQnP={this.state.listQnP}
                            classes={this.props.classes}
                            removeItem={this.removeItem.bind(this)}
                            toggleDialog={this.toggleDialog.bind(this)}
                            space={this.props.space}
                            isPrimaryOpen={isPrimaryOpen}
                            isSecondaryOpen={isSecondaryOpen}
                            updatePollQuestions={this.updatePollQuestions.bind(this)}
                            listQnPLength={this.state.listQnP.length}
                            switchPage={this.props.switchPage.bind(this)}
                            />

                            :
                            /*Participant Tune*/
                            <ParticipantsTune
                            handleParticipants={this.handleParticipants.bind(this)}
                            classes={this.props.classes}
                            switchState={this.state.switchState}
                            toggleSwitch={this.toggleSwitch.bind(this)}
                            totalParticipants={this.state.totalParticipants}
                            handleFinal={this.handleFinal.bind(this)}
                            />
                        }
                        </div> : 
                        <div>
                            {
                                !this.state.switchState ?

                                /*Live Feed Page 4*/
                                <LiveFeed /> :

                                /*Participants List Page 3*/
                                <ParticipantsPortal
                                classes={this.props.classes}
                                listParticipants={this.state.listParticipants}
                                wantParticipant={this.state.wantParticipant}
                                handleInvite={this.handleInvite.bind(this)}
                                changeName={this.changeName.bind(this)}
                                participantName={this.state.participantName}
                                disableCurrentParticipant={this.disableCurrentParticipant.bind(this)}
                                disabledParticipants={this.state.disabledParticipants}
                                currentParticipantClickSerial={this.state.currentParticipantClickSerial}
                                />
                            }
                        </div>
                }
                </div>
            </div>
        )
    }
}

 
const Poll = ({pseudonym, initialState, onPage, switchPage}) => {
    const [useCss, theme] = useStyletron();
    const space = useCss({marginLeft: theme.sizing.scale1200});
    const classes = useStyles();
    return(
        <Polle 
        onPage={onPage} 
        switchPage={switchPage.bind(this)} 
        initialState={initialState} 
        classes={classes} 
        pseudonym={pseudonym} 
        space={space} />
    );
}
 
export default Poll;