import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppProvider } from 'src/contexts';
import {
  HomePage,
  LogInPage,
  CountPage,
  ComparePage,
  VerifiedPage,
  ReputationPage,
} from 'src/pages';
import { GlobalStyle } from 'src/styles';

function App() {
  return (
    <AppProvider>
      <GlobalStyle />
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LogInPage} />
            <Route path="/verified" component={VerifiedPage} />
            <Route path="/home/:topic" component={HomePage} />
            <Route path="/count/:topic" component={CountPage} />
            <Route path="/compare/:topic" component={ComparePage} />
            <Route path="/reputation/:topic" component={ReputationPage} />
          </Switch>
        </BrowserRouter>
      </div>
    </AppProvider>
  );
}

export default App;
