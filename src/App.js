import React from 'react'
import './App.css'
import HomePage from './pages/HomePage'
import ToursPage from './pages/ToursPage'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import Header from './components/HeaderComponent/Header'
import Footer from './components/FooterComponent/Footer'
import NavBar from './components/NavBarComponent/NavBar'
import PageNotFound from './components/PageNotFoundComponent/PageNotFound'
import LoginPage from './pages/LoginPage'
import TourDetailPage from './pages/TourDetailPage'
import SearchResultPage from './pages/SearchResultPage'
import NavFooter from './components/NavFooterComponent/NavFooter'
import CommingSoon from './components/CommingSoonComponent/CommingSoon'
import UserDetailPage from './pages/UserDetailPage'
import BackToTop from "react-back-to-top-button"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp} from "@fortawesome/free-solid-svg-icons"
import StatisticalPage from './pages/StatisticalPage'
import NewsPage from './pages/NewsPage'
import NewsDetailPage from './pages/NewsDetailPage'

function App() {

  return (
    <Router>
      <div className="App">
          <Header />
          <NavBar/>
          
          <Switch>
            <Route exact path="/" component={HomePage} />

            <Route exact path="/tours" component={ToursPage} />

            <Route exact path="/tours/detail/:id/" component={TourDetailPage} />

            <Route exact path="/services" component={CommingSoon} />

            <Route exact path="/news" component={NewsPage} />

            <Route exact path="/news/detail/:id/" component={NewsDetailPage} />

            <Route exact path="/login">
              <LoginPage type='login' />
            </Route>

            <Route exact path="/register">
              <LoginPage type='register' />
            </Route>

            <Route exact path="/user-detail/" component={UserDetailPage} />

            <Route exact path="/statistical/" component={StatisticalPage} />

            <Route exact path="/search" component={SearchResultPage} />

            <Route exact path="/suggestion" component={CommingSoon} />

            <Route exact path="/404" component={PageNotFound} />

            <Route exact path="/admin" render={() => window.location = "http://127.0.0.1:8000/admin"} />

            <Route exact path="*" component={PageNotFound} />
          
          </Switch>

          <Footer/>
          <NavFooter />
          <BackToTop
            showAt={100}
            speed={1}
            easing="easeInOutQuint"
          >
            <span className="go-on-top"><FontAwesomeIcon icon={faArrowUp} /></span>
          </BackToTop>

      </div>
    </Router>
  );
}

export default App
