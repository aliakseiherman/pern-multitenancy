import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { logoutSaga, loginSaga } from './sagas'

export const SET_TENANT = 'SET_TENANT'
export const SET_USER = 'SET_USER'
export const LOGOUT = 'LOGOUT'

const sagaMiddleware = createSagaMiddleware()

function data(state = {}, action) {
  switch (action.type) {
    case SET_TENANT:
      return {
        ...state,
        tenantId: action.tenantId
      }
    case SET_USER:
      return {
        ...state,
        userId: action.userId
      }
    case LOGOUT:
      return {
        ...state,
        userId: null
      }
    default:
      return state
  }
}

const reducer = combineReducers({ data })

const store = createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(logoutSaga)
sagaMiddleware.run(loginSaga)

export default store