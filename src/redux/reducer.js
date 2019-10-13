import {combineReducers} from 'redux'
import Socket from './Socket';

const merge = (prev, next) => Object.assign({}, prev, next)

const initialState = {
      currentParticipantClickSerial: -1,
      isHomeClick: false,
      isAdmin: 0,
      isPrimaryOpen: false,
      isSecondaryOpen: false,
      listParticipants: {}, 
      listQnP: [],
      liveFeedUpdate: {},
      onPage: 0,
      participantName: '',
      participantNotify: false,
      password: '',
      polls: {},
      pollResult: {},
      pseudonym: 'flai',
      secureState: false,
      totalParticipants: 0,
      total: 0,
      wantParticipant: false,
      warning: false,
    }

const rootReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CLICK_WARN':
      return merge(state, {
        liveFeedUpdate: {},
        onPage: 0,
        isAdmin: 0,
      })

    case 'HOME_CLICK':
      return merge(state, {warning: true})

    case 'LIVE_FEED_UPDATE':
      return merge(state, {
        liveFeedUpdate: action.payload.update,
        total: action.payload.total,
      })

    case 'LIVE_POLLS':
      return merge(state, {polls: action.payload})

    case 'POLLRESULT':
      return merge(state, {pollResult: action.payload})

    case 'PSEUDONYM':
      Socket.emit('update pseudonym', action.payload)
      return merge(state, {pseudonym: action.payload})

    case 'REMOVE_ITEM':
      let newQ = state.listQnP;
      newQ.splice(Number(action.payload.index), 1);
      return merge(state, {listQnP: newQ})

    case 'SUBMIT':
      return handleSubmit(state, action);

    case 'SWITCH_PAGE':
      return merge(state, {onPage: action.payload})

    case 'TOGGLE_DIALOG':
      return handleToggle(state, action.payload.surface, action.payload.dialogSwitch);

    case 'TOGGLE_SWITCH':
      return merge(state, {secureState: !state.secureState})

    case 'UPDATE_ADMIN':
      return merge(state, {isAdmin: 1, totalParticipants: action.payload})

    case 'UPDATE_INVITE_SWITCHES':
      return merge(state, {
        wantParticipant: action.payload.want,
        currentParticipantClickSerial: (action.payload.idx >= 0? action.payload.idx: state.currentParticipantClickSerial),
      })

    case 'UPDATE_FEED':
      return merge(state, {liveFeedUpdate: action.payload})

    case 'UPDATE_LIST':
      return merge(state, {listParticipants: action.payload})

    case 'UPDATE_Q':
      return merge(state, {listQnP: action.payload})

    case 'WARN_CLICK':
      return handleWarningClick(state);

    default:
      return state
  }
}

const handleSubmit = (state, action) => {
  Socket.emit('update pollResult', {pseudonym: state.pseudonym, pollResult: action.payload})
  return merge(state, {pollResult: action.payload});
}

const handleToggle = (state, surface, dialogSwitch) => {
  if(surface === "primary") {
    return merge(state, {isPrimaryOpen: dialogSwitch})
  }
  if(surface === "secondary") {
    return merge(state, {isSecondaryOpen: dialogSwitch})
  }
  if(surface === "warn")  {
    return merge(state, {warning: dialogSwitch})
  }
}
const handleWarningClick = (state) => {
  Socket.emit('unpoll', state.pseudonym);
  return merge(state, {
    onPage: 0,
    warning: false,
    isAdmin: 0,
    liveFeedUpdate: {},
    listParticipants: {},
    totalParticipants: 0,
  })
}

const reducer = combineReducers({
  rootReducer: rootReducer,
})

export default reducer
