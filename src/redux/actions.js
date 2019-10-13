

// action creators
export const handleHomeClick = () => ({
  type: 'HOME_CLICK',
})
export const handleWarningClick = newContact => ({
  type: 'CLICK_WARN',
  payload: newContact,
})
export const handleLiveFeedUpdate = data => ({
  type: 'LIVE_FEED_UPDATE',
  payload: data,
})
export const removeItem = (surface, index) => ({
  type: 'REMOVE_ITEM',
  payload: {surface: surface, index: index}
})
export const submit = pollResult => ({
  type: 'SUBMIT',
  payload: pollResult,
})
export const switchPage = page => ({
  type: 'SWITCH_PAGE',
  payload: page
})
export const toggleDialog = (surface, dialogSwitch) => ({
  type: 'TOGGLE_DIALOG',
  payload: {surface, dialogSwitch}
})
export const toggleSwitch = () => ({
  type: 'TOGGLE_SWITCH'
})
export const updateAdmin = (total) => ({
  type: 'UPDATE_ADMIN',
  payload: total,
})
export const updateInvite = (want, idx='') => ({
  type: 'UPDATE_INVITE_SWITCHES',
  payload: {want: want, idx: idx},
})
export const updateLiveFeed = (feed) => ({
  type: 'UPDATE_FEED',
  payload: feed,
})
export const updateLivePolls = (polls) => ({
  type: 'LIVE_POLLS',
  payload: polls,
})
export const updateParticipants = list => ({
  type: 'UPDATE_LIST',
  payload: list,
})
export const updatePollResult = result => ({
  type: 'POLLRESULT',
  payload: result
})
export const updatePseudonym = (pseudonym) => ({
  type: 'PSEUDONYM',
  payload: pseudonym,
})
export const updateQ = list => ({
  type: 'UPDATE_Q',
  payload: list,
})
export const warnClick = () => ({
  type: 'WARN_CLICK',
})




// async action creator
/*export const logInUser = (username, password) => async dispatch => {
  dispatch({type: LOG_IN_SENT})
  try {
    const token = await login(username, password)
    dispatch({type: LOG_IN_FULFILLED, payload: token})
  } catch (err) {
    dispatch({type: LOG_IN_REJECTED, payload: err.message})
  }
}*/
