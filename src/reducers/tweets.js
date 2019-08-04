import { RECEIVE_TWEETS, TOGGLE_LIKE_TWEET, ADD_TWEET } from '../actions/tweets'

export default function tweets (state = {}, action) {
    switch(action.type) {
        case RECEIVE_TWEETS:
            return {
                ...state,
                ...action.tweets
            }
        case TOGGLE_LIKE_TWEET:
            return {
                ...state,
                    [action.tweetKey] : {
                        ...state[action.tweetKey],
                        likes: action.hasLiked 
                                ? state[action.tweetKey].likes.filter(name => name !== action.authedUser)
                                : state[action.tweetKey].likes.concat([action.authedUser])
                    }
            }
        case ADD_TWEET:
            if(action.tweet.replyingTo !== null) {
                return {
                    ...Object.assign(state, {[action.tweet.id]: action.tweet}),
                    [action.tweet.replyingTo]: {
                        ...state[action.tweet.replyingTo],
                        replies: state[action.tweet.replyingTo].replies.concat(action.tweet.id)
                    } 
                }
            }
            else {
                return {
                    ...Object.assign(state, {[action.tweet.id]: action.tweet})
                }
            }
        default:
            return state
    }
}