import React from "react";
import Header from "./Header";
//import IsLoadingAndError from "./IsLoadingAndError";
import Footer from "./Footer";
import MyFavoriteBooks from "./MyFavoriteBooks";
import Profile from "./Profile";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import { withAuth0 } from "@auth0/auth0-react";


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    return (
      <>
        <Router>
          {/* <IsLoadingAndError> */}
            <Header />
            <Switch>
              <Route exact path="/">
                {isAuthenticated ? <MyFavoriteBooks /> : <Login />}
              </Route>
              {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
              <Route exact path="/Profile">
                {isAuthenticated && <Profile />}
              </Route>
            </Switch>
            <Footer />
          {/* </IsLoadingAndError> */}
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
