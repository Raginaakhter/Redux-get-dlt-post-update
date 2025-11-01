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

  try {
   const result = await response.json();

    return result;

  } catch (error) {
    return rejectWithValue(error)
  }

})


// Read action Get Api .....................................

export const showUser = createAsyncThunk("showUser", async (_, { rejectWithValue }) => {

  const response = await fetch("https://6901df4bb208b24affe40bb9.mockapi.io/crud");
  
  try {
const result = await response.json()
return result;

  }catch(error){

    return rejectWithValue (error)
  }
});



// Delete action  Api .....................................
export const deleteUser = createAsyncThunk("deleteUser", async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://6901df4bb208b24affe40bb9.mockapi.io/crud/${id}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      return id; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




// Update action  Api..................................
export const updateUser = createAsyncThunk( "updateUser", async (data, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://6901df4bb208b24affe40bb9.mockapi.io/crud/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), 
        }
      );

      const result = await response.json(); 
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);









// create slice........................................

const userDetail = createSlice({
  name: "user",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData:[],
  },
  reducers: {
    searchUser:(state,action)=>{

console.log(action.payload);
      state.searchData = action.payload

    }
  },


  extraReducers: (builder) => {
    // create user.........................
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
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

      // Delete user..........................

       builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        const {id} =action.payload;
        if(id){
         state.users = state.users.filter((ele) => ele.id !== action.payload);

        }
      })
      .addCase(deleteUser.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to create user";
      });
      // update user...............................
         builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
    state.users=state.users.map((ele)=>(
      ele.id === action.payload.id? action.payload :ele
    ));
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to create user";
      });
  },
});

export default userDetail.reducer;
export const {searchUser} =userDetail.actions;
