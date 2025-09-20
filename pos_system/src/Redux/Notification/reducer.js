import {
    ADD_NOTIFICATION,
    REMOVE_NOTIFICATION,
    CLEAR_ALL_NOTIFICATIONS
} from './actions';

const initialState = {
    notifications: []
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            return {
                ...state,
                notifications: [action.payload, ...state.notifications]
            };

        case REMOVE_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(
                    notification => notification.id !== action.payload
                )
            };

        case CLEAR_ALL_NOTIFICATIONS:
            return {
                ...state,
                notifications: []
            };

        default:
            return state;
    }
};

export default notificationReducer;
