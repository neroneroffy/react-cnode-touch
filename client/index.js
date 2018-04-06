import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { AppContainer } from 'react-hot-loader';
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
    <App />
  </AppContainer>,
  root,
);
if (module.hot) {
  module.hot.accept('./App.js', () => {
    const NextApp = require('./App.js').default;// eslint-disable-line
    ReactDom.render(
      <AppContainer>
        <NextApp />
      </AppContainer>,
      root,
    );
  })
}
