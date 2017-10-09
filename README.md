# Redux Simple

Modular [Redux](http://redux.js.org) bootstrap.

## What is Redux Simple?

Minimal Gear using [Redux](http://redux.js.org) to develop modularized applications.

## Getting started

**Install**

```sh
yarn add redux-simple
```

**Basic Usage**

```js
const MY_ACTION = 'MY_ACTION_CONST'

const reducer = {  
  [MY_ACTION]: (state, {payload}) => ({
    ...state,
    foo: payload
  })
}

const middleware = {  
  [MY_ACTION]: (store, next, action) => {
    const state = store.getState();
    console.log(`passing ${MY_ACTION} with state`, {...state})
    return next(action)
  }
}

const initialState = {foo: 'HERE'}
const MyModuleFoo = {reducer, middleware, initialState}

export default MyModuleFoo
```

```js
const OTHER_ACTION = 'OTHER_ACTION_CONST'

const reducer = (state, {payload}) => ({
  ...state,
  bar: payload
})

const middleware = store => next => action => {
  if (action.type !== OTHER_ACTION) return next(action)

  const state = store.getState();
  console.log(`passing ${OTHER_ACTION} with state`, {...state})
  return next(action)
}

const initialState = {bar: 'other'}
const MyModuleBar = {reducer, middleware, initialState}

export default MyModuleBar
```

```js
import React from 'react'
import {render} from 'react-dom'
import reduxSimple from 'redux-simple'
import MyModuleFoo from './MyModuleFoo'
import MyModuleBar from './MyModuleBar'

const store = reduxSimple(MyModuleFoo, MyModuleBar)
const divRender = document.getElementById('devRender')

store.subscribe(() => {
  const state = store.getState()
  const {foo, bar} = state
  console.log({foo, bar})
})

render(
  <Provider store={store}>
    <App />
  </Provider>, divRender
)
```
