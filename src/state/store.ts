import {  createStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'

interface User {
  name: string
}

export default function configureStore(preloadedState: User | any = {}) {
  return createStore(
    userReducer,
    preloadedState,
  )
};
