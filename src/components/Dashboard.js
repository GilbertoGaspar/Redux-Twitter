import React, { Component } from 'react'
import { connect } from 'react-redux'

import Tweet from './Tweet'

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h3 className='text-align-center'>Your Timeline</h3>
                <ul>
                    {this.props.tweetIds.map(id => <Tweet key={id} id={id}/>)}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = ({ tweets }) => {
    const tweetIds = Object.keys(tweets)
        .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp) 
    return {
        tweetIds
    }
}

export default connect(mapStateToProps)(Dashboard)