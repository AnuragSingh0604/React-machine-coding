const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const axios = require("axios");

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// Create async thunk
const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async () => {
    const response = await axios.get("YOUR_API_URL");

    return response.data.map((user) => user.id);
  }
);

// Create slice
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  }
});

// Export outside createSlice
module.exports = {
  reducer: userSlice.reducer,
  fetchUsers
};