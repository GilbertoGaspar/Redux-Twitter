import { RECEIVE_USERS } from '../actions/users'
import { ADD_TWEET } from '../actions/tweets'

export default function users (state = {}, action) {
    switch(action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_TWEET: 
            return {
                ...state,
                [action.tweet.author]: {
                    ...state[action.tweet.author],
                    tweets: state[action.tweet.author].tweets.concat(action.tweet.id)
                }
            }
        default:
            return state
    }
}