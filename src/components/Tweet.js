import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatDate, formatTweet } from '../utils/helpers'
import { handleLikeToggleTweet } from '../actions/tweets'

function Tweet(props) {
    const { id, avatar, name, timestamp, parent, text, replies, likes, hasLiked, authedUser } = props

    const handleReplyLink = (e) => {
        e.preventDefault()
        props.history.push(`/tweet/${parent.id}`)
    }
    const handleToggleLike = (e) => {
        e.preventDefault()
        props.dispatch(handleLikeToggleTweet(id, authedUser, hasLiked))
    }
    const likedHeartSVG = <svg onClick={handleToggleLike} className='tweet-button tweet-button-heart' preserveAspectRatio="xMidYMid meet" height="18pt" width="18pt" viewBox="0 0 40 40">
                              <g><path d="m3.7 15.7c0 2.1 0.3 5.5 3.3 8.5 2.7 2.6 11.5 8.6 11.8 9 0.4 0.1 0.7 0.3 1 0.3s0.7-0.2 1-0.3c0.4-0.4 9.2-6.2 11.9-9 3-3 3.3-6.4 3.3-8.5 0-5-4-9-9-9-2.7 0-5.3 1.5-7 3.8-1.7-2.3-4.3-3.8-7.3-3.8-4.9 0-9 4-9 9z"></path></g>
                          </svg>
    const unlikedHeartSVG = <svg onClick={handleToggleLike} className='tweet-button' preserveAspectRatio="xMidYMid meet" height="18pt" width="18pt" viewBox="0 0 40 40">
                              <g><path d="m20 33.3c-0.3 0-0.7-0.1-0.9-0.3-0.4-0.2-9.2-6.2-11.9-8.9-3.1-3.1-3.4-6.3-3.4-8.5 0-4.9 4-8.9 8.9-8.9 3 0 5.7 1.5 7.3 3.7 1.6-2.2 4.3-3.7 7.3-3.7 4.9 0 9 4 9 8.9 0 2.2-0.4 5.4-3.5 8.5-2.7 2.7-11.5 8.7-11.9 8.9-0.2 0.2-0.6 0.3-0.9 0.3z m-7.3-23.3c-3.1 0-5.6 2.5-5.6 5.6 0 1.8 0.3 4 2.4 6.1 2 2.1 8.2 6.3 10.5 7.9 2.4-1.6 8.5-5.8 10.5-7.9 2.1-2.1 2.4-4.3 2.4-6.1 0-3.1-2.5-5.6-5.6-5.6s-5.6 2.5-5.6 5.6c0 0.9-0.8 1.7-1.7 1.7s-1.7-0.8-1.7-1.7c0-3.1-2.5-5.6-5.6-5.6z"></path></g>
                            </svg>

    return (
        <Link className='tweet-link' to={`/tweet/${id}`}>
            <div className='tweet' >
                <img className='tweet-img' src={avatar} alt={`Avatar of ${name}`}/>
                <div className='tweet-info'>
                    <h4 className='tweet-author'>{name}</h4>
                    <p className='tweet-grey'>{formatDate(timestamp)}</p>
                    {parent ? <div className='tweet-grey tweet-reply' onClick={handleReplyLink}>Replying to @{parent.author}</div> : null}
                    <p className='tweet-text'>{text}</p>
                    <div className='tweet-button-section'>
                        <svg  className='tweet-button' preserveAspectRatio="xMidYMid meet" height="18pt" width="18pt" viewBox="0 0 40 40"><g><path d="m31.9 32.6c-2.7-4.2-6.1-5.5-10.2-5.8v2.4c0 0.9-0.4 1.7-1 2.3-1.3 1.3-3.5 1.3-4.7 0l-10.5-10.3c-0.3-0.3-0.5-0.8-0.5-1.2s0.2-0.9 0.5-1.2l10.5-10.3c1.2-1.3 3.4-1.3 4.7 0 0.6 0.6 1 1.4 1 2.3v2.9c7.7 1.5 13.3 8.3 13.3 16.3v1.7c0 0.7-0.5 1.4-1.2 1.6-0.1 0-0.3 0-0.5 0-0.5 0-1-0.2-1.4-0.7z m-11.9-9.2c3.7 0 7.8 0.6 11.3 3.5-1.3-5.4-5.8-9.5-11.5-10.1-0.8-0.1-1.5-0.1-1.5-0.1v-5.9l-9.3 9.2 9.3 9.2v-5.9s1.3 0.1 1.7 0.1z"></path></g></svg>
                        <p className='tweet-button-text'>{replies > 0 ? replies : null}</p>
                        {hasLiked ? likedHeartSVG : unlikedHeartSVG }
                        <p className='tweet-button-text'>{likes > 0  ? likes : null}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

const mapStateToProps = ({ tweets, users, authedUser }, { id }) => {
    const tweet = tweets[id]
    return formatTweet(tweet, users[tweet.author], authedUser, tweets[tweet.replyingTo])
}
export default connect(mapStateToProps)(withRouter(Tweet))