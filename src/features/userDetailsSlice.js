import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// create action Post Api..................................

export const createUser = createAsyncThunk("createUser", async (data, { rejectWithValue }) => {
  const response = await fetch("https://6901df4bb208b24affe40bb9.mockapi.io/crud", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  // Error handling ....................................

  try {
    const result = response.json();
    return result;

  } catch (error) {
    return rejectWithValue(error)
  }

})


// Read action Get Api .....................................

export const showUser = createAsyncThunk("showUser",async(rejectWithValue)=>{
  const response = await fetch("https://6901df4bb208b24affe40bb9.mockapi.io/crud");
  
  try {
const result = await response.json()
return result;

  }catch(error){

    return rejectWithValue (error)
  }
});



// create slice........................................

const userDetail = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},


  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.message);
      })
      .addCase(createUser.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to create user";
      });
      // Show user........................
      builder
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to create user";
      });
  },
});

export default userDetail.reducer;
