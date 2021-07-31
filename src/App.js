import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import routes from 'routes';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          {routes.map(route => (
            <Route
              exact
              key={window.btoa(route.path)}
              path={route.path}
              render={props => (
                <route.component {...props} />
              )}
            />
          ))}
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
