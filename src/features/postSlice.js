import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// GET
export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async () => {
    const url = `${process.env.REACT_APP_LINK}/posts`
    const response = await fetch(url);
    const data = await response.json()
    return data;
  }
);

// POST
export const addPost = createAsyncThunk(
  'posts/addPost',
  async ({ newPost }) => {
    const url = `${process.env.REACT_APP_LINK}/posts/`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        title: newPost.title,
        body: newPost.detail,
        userId: 1
      })
    });
    const data = await response.json()
    return data;
  }
);
//PUT
export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async ({ id, title, body }) => {
    const url = `${process.env.REACT_APP_LINK}/posts/${id}`
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        title: title,
        body: body,
        userId: 1
      })
    });
    const data = await response.json()
    console.log(data);
    return data;
  }
);

//DELETE
export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async ({ id }) => {
    const url = `${process.env.REACT_APP_LINK}/posts/${id}`
    const response = await fetch(url, {
      method: "DELETE"
    });
    const data = await response.json()
    return data;
  }
);

const initialState = {
  posts: [],
  addedPost: {},
  updatedPost: {},
  deleteText: '',
  loading: false,
  isEdit: false,
  showUpdated:false,
  showAddedPost:false
};

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    removeDeleteText: (state) => { state.deleteText = '' },
    changeEdit: (state,action) => {state.isEdit = action.payload}
  },

  extraReducers: {
    //GET
    [getPosts.pending]: (state) => {
      state.loading = true
    },
    [getPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload
    },
    [getPosts.rejected]: (state) => {
      state.loading = false;
    },
    //POST
    [addPost.pending]: (state) => {
      state.loading = true
    },
    [addPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.addedPost = action.payload;
      state.showAddedPost= true
    },
    [addPost.rejected]: (state) => {
      state.loading = false;
    },
    //UPDATE
    [updatePost.pending]: (state) => {
      state.loading = true
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.updatedPost = action.payload
      state.showUpdated = true
    },
    [updatePost.rejected]: (state) => {
      state.loading = false;
    },
    //DELETE
    [deletePost.pending]: (state) => {
      state.loading = true
    },
    [deletePost.fulfilled]: (state) => {
      state.loading = false;
      state.deleteText = 'Post Slindi'
    },
    [deletePost.rejected]: (state) => {
      state.loading = false;
    }
  },
});

export const { removeDeleteText,changeEdit } = postSlice.actions;

export default postSlice.reducer;