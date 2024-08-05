import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    error: null,
    loading: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      signInStart: (state)=>{
        state.error = null,
        state.loading = true
      },
      signInSuccess: (state,action)=>{
        state.currentUser = action.payload;
        state.loading = false;
        state.error = null
      },
      signInFailure: (state,action)=>{
           state.loading = false;
           state.error = action.payload
      },
    }
})
export default userSlice.reducer;
export const {signInFailure,signInSuccess,signInStart} = userSlice.actions; 