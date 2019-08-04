import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { withRouter } from 'react-router-dom'

class ComposeTweet extends Component {

    state = {
        text: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        if(this.props.replyingId !== undefined) {
            this.props.dispatch(handleAddTweet(this.state.text, this.props.authedUser, this.props.replyingId))
            .then(() => this.setState({text: ''}))
        }
        else {
            this.props.dispatch(handleAddTweet(this.state.text, this.props.authedUser, null))
            .then(() => {
                this.setState({text: ''})
                this.props.history.push('/')
            })
        }
        if(this.props.match.path !== '/tweet/:id') {
            
        }
    }

    render() {
        return (
            <div className='flex-hoz-center'>
                <h3 className='text-align-center'>Compose new Tweet</h3>
                <form className='tweet-new' onSubmit={this.handleSubmit}>
                    <textarea className='tweet-compose' required placeholder="What's happening?" 
                        value={this.state.text} onChange={(event) => this.setState({text: event.target.value})}/>
                    <button className='tweet-button-submit'>SUBMIT</button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(withRouter(ComposeTweet))