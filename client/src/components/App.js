import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../AuthFrontend/auth.js";
import HomePage from "./pages/HomePage/HomePage.js";
import LoginPage from "./pages/Login/LoginPage.js";
import RegisterPage from "./pages/Signup/SignUpPage.js";
import NavBar from "./pages/Navbar/Navbar.js";
import MovieDetail from "./pages/MovieDetails/MovieDetails.js";
import FavoritePage from "./pages/Favorites/FavoritePage.js";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(HomePage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/movie/:movieId"
            component={Auth(MovieDetail, null)}
          />
          <Route exact path="/favorite" component={Auth(FavoritePage, true)} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
