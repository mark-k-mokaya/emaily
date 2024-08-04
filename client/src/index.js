import 'materialize-css/dist/css/materialize.min.css';

import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import {thunk} from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

const store = createStore(reducers, {}, applyMiddleware(thunk));

root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
