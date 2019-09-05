import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducer from './reducer'

const persistConfig = {
  key: 'airPoll',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

  /*
const thunkMiddleware = store => next => action => {
  if (typeof action === 'function') {
    action(store.dispatch)
  } else {
    next(action)
  }
}
*/

export const store = createStore(persistedReducer, applyMiddleware(thunk))
export const persistor = persistStore(store)

