import { showLoading, hideLoading } from 'react-redux-loading'
import { saveLikeToggle, saveTweet } from '../utils/api'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_LIKE_TWEET = 'TOGGLE_LIKE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

export function receiveTweets (tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    }
}

function likeToggleTweet (tweetKey, authedUser, hasLiked) {
    return {
        type: TOGGLE_LIKE_TWEET,
        tweetKey,
        authedUser,
        hasLiked
    }
}

export function handleLikeToggleTweet (tweetKey, authedUser, hasLiked) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveLikeToggle({
            id: tweetKey,
            hasLiked, 
            authedUser
        })
            .then(() => {
                dispatch(likeToggleTweet(tweetKey, authedUser, hasLiked))
                dispatch(hideLoading())
            })
    }
}

function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet
    }
}

export function handleAddTweet(text, author, replyingTo = null) {
    return (dispatch) => {
        dispatch(showLoading())
        return saveTweet({text, author, replyingTo})
            .then((tweet) => {
                dispatch(addTweet(tweet))
                dispatch(hideLoading())
            })
    }
}
