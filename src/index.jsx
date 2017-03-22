import 'styles/vendors'

import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'

import { App } from "containers";
import { DevTools } from "containers";

import rootReducer from './reducers'

const enhancer = compose(
    DevTools.instrument()
);
const store = createStore( rootReducer, enhancer   )

render(
    <Provider store={store}>
        <div>
            <App/>
            {
            //<DevTools />
            }

        </div>
    </Provider>,
    document.getElementById("container")
);
