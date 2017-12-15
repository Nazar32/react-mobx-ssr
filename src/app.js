import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import ScrollMemory from 'react-router-scroll-memory';
import { Switch, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { renderRoutes } from 'react-router-config';
import routes from './routes/routes';
import RootStore from './stores/RootStore';
import { Container } from './styles/global';
import theme from './styles/theme';
import reset from './styles/reset'; // eslint-disable-line

const state = window.__INITIAL_STATE__; // eslint-disable-line
const store = new RootStore(state);

reset();
ReactDOM.hydrate(
  <BrowserRouter>
    <Provider {...store}>
      <ThemeProvider theme={theme}>
        <Container>
          <ScrollMemory />
          <Switch>{renderRoutes(routes)}</Switch>
        </Container>
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept();
}

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker
//       .register('/sw.js')
//       .then(registration => {
//         console.log('SW registered: ', registration); // eslint-disable-line
//       })
//       .catch(registrationError => {
//         console.log('SW registration failed: ', registrationError); // eslint-disable-line
//       });
//   });
// }
