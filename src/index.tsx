import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './common/store';
import { App } from './common/containers/App';

import './styles/index.scss';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
