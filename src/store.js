import React from 'react';
import { rootSaga } from './src/common/sagas/RootSaga';
import reducer from './src/common/reducers/reducer';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import {composeWithDevTools} from 'redux-devtools-extension';


const sagas = createSagaMiddleware({});
const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagas)));

sagas.run(rootSaga);
