import { asyncThunkCreator } from '@reduxjs/toolkit';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

export const ADD_TASK = 'add_task';
export const DELETE_TASK = 'delete_task';
export const MODIFY_TASK = 'modify_task';

export const addTask = (name) => ({
    type: ADD_TASK,
    payload: {
        id: uuidv4(),
        name: name,
        isCompleted: false
    }
});

export const deleteTask = (taskId) => ({
    type: DELETE_TASK,
    payload: taskId
});

export const modifyTask = ({ taskId, isCompleted }) => ({
    type: MODIFY_TASK,
    payload: {
        taskId,
        isCompleted
    }
});

export const addTaskAscyn = (name) => {
    return async (dispatch, getState) => {
        const data = await fetch('https://jsonplaceholder.typicode.com/users');
        const json = await data.json();
        console.log("State is", getState().todoReducer.todoLists)
        dispatch({
            type: ADD_TASK,
            payload: {
                id: uuidv4(),
                name: name,
                isCompleted: false,
                data: json
            }
        })
    }
}

