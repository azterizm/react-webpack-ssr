import { createSlice } from "@reduxjs/toolkit"
import { User, AddUser } from "./User"

export const initialState: User = {
  name: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    assignUser: (state: User, action: AddUser) => {
      const { name } = action.payload
      state.name = name
    },
    clearUser: (state: User) => {
      state.name = ''
    }
  }
})

export const { assignUser, clearUser } = userSlice.actions

export default userSlice.reducer

