import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import App from './views/App';
import appState from './store/app-state';
import { AppContainer } from 'react-hot-loader';// eslint-disable-line
// react热更新
const root = document.getElementById('root');
// const render = Component => {
//   return ReactDom.hydrate(
//     <AppContainer>
//       <Component/>
//     </AppContainer>,
//     root)
// };

// render(<App/>);
ReactDom.render(
  <AppContainer>
    <Provider appState={appState}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </AppContainer>,
  root,
);
if (module.hot) {
  module.hot.accept('./views/App.js', () => {
    const NextApp = require('./views/App.js').default;// eslint-disable-line
    ReactDom.render(
      <AppContainer>
        <Provider appState={appState}>
          <BrowserRouter>
            <NextApp />
          </BrowserRouter>
        </Provider>
      </AppContainer>,
      root,
    );
  })
}

