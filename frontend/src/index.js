import './App.css';
import App from './App';
import { createRoot } from 'react-dom/client'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/rootReducer';

const myStore = createStore(rootReducer, applyMiddleware(thunk))

const root = createRoot(document.getElementById('root'))

root.render(
    <Provider store={myStore}>
        <App />
    </Provider>
)