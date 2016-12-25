import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './actions';
import rootReducer from './reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(rootReducer,
  applyMiddleware(epicMiddleware, createLogger({ collapsed: true }))
);

export default store;
