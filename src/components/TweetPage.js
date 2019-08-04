import React from 'react'
import { connect } from 'react-redux';
import Tweet from './Tweet'
import ComposeTweet from './ComposeTweet'
import NotFound from './NotFound'

function TweetPage (props) {
    if(props.replies === undefined) {
        return <NotFound />
    }
    return(
        <div >
            <Tweet id={props.match.params.id}/>
            <ComposeTweet replyingId={props.match.params.id}/>
            <div>
                <h3 className='text-align-center'>Replies</h3>
                {props.replies.length === 0 
                    ? <div className='text-align-center'>No replies!</div>
                    : <ul>
                        {props.replies.map(({ id }) => <Tweet key={id} id={id}/>)}
                    </ul>}
            </div>
        </div>
    )
}

function mapStateToProps ({tweets}, {match}) {
    if(tweets[match.params.id] === undefined) {
        return { 
            replies: undefined
        }
    }
    else {
        return {
            replies: tweets[match.params.id].replies.map(tweetId => tweets[tweetId]) 
                        .sort((a, b) => tweets[b.id].timestamp - tweets[a.id].timestamp) 
        }
    }
}

export default connect(mapStateToProps)(TweetPage)