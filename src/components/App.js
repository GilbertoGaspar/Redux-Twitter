import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import ComposeTweet from './ComposeTweet'
import TweetPage from './TweetPage'
import LoadingBar from 'react-redux-loading'
import NavBar from './NavBar'
import NotFound from './NotFound'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <LoadingBar />
        {this.props.loading === true 
            ? null 
            :<div className='container'>
              <NavBar />
              <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/new' component={ComposeTweet} />
                <Route path='/tweet/:id' component={TweetPage} />
                <Route component={NotFound} />
              </Switch>
            </div>}
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)