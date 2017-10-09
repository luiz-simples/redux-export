import {createStore, applyMiddleware, compose} from 'redux'
export const APP_START = 'APP_START:NOW'

const appReducer = (modules, state, action) => {
  const {type} = action
  let newState = {...state}

  modules
    .filter(({reducer}) => Boolean(reducer))
    .forEach(({reducer}) => {
      const isFunction = typeof reducer === 'function'
      if (isFunction) return (newState = reducer({...newState}, {...action}))

      const hasReduce = (typeof reducer === 'object') && reducer.hasOwnProperty(type)
      if (hasReduce) newState = reducer[type]({...newState}, {...action})
    })

  return newState
}

const appMiddleware = (modules) => modules.filter(({middleware}) => Boolean(middleware)).map(({middleware}) => {
  const isFunction = typeof middleware === 'function'
  if (isFunction) return middleware

  return store => next => action => {
    const {type} = action
    const hasMiddleware = middleware.hasOwnProperty(type)
    if (!hasMiddleware) return next(action)
    return middleware[type](store, next, action)
  }
})

const appEnhancers = (modules) => modules
  .filter(({enhancer}) => Boolean(enhancer))
  .map(({enhancer}) => enhancer)

const appInitialState = (modules, state) => modules
  .filter(({initialState}) => Boolean(initialState))
  .reduce((firstState, {initialState}) => ({...firstState, ...initialState}), state)

export default (modules = [], firstState = {}) => {
  const reducers = appReducer.bind(this, modules)
  const enhancers = appEnhancers(modules)
  const middlewares = applyMiddleware(...appMiddleware(modules))
  const composeStore = compose(middlewares, ...enhancers)
  const initialState = appInitialState(modules, firstState)
  const storeApp = createStore(reducers, initialState, composeStore)
  storeApp.dispatch({type: APP_START})
  return storeApp
}
