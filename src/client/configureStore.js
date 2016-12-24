import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './actions';
import rootReducer from './reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

const store = createStore(rootReducer,
  applyMiddleware(epicMiddleware)
);

export default store;
