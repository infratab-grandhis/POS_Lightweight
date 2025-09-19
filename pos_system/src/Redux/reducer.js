import React from "react";
import { combineReducers } from 'redux';
import initialState from "./state";
import { ADD_TASK, MODIFY_TASK, DELETE_TASK } from './action';


const taskReducer = (state = initialState, { type, payload }) => {
    return state;
}

const rootReducer = combineReducers({
    todoReducer: taskReducer
});

export default rootReducer;
