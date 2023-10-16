import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// get запрос на получение поста
export const getPosts = createAsyncThunk('posts/getPosts', async function () {
  const { data } = await axios.get('https://dummyjson.com/posts?limit=5');
  return data;
});

// post запрос на добавление поста
export const addPostApi = createAsyncThunk(
  'posts/addPostApi',
  async function (formData) {
    const { data } = await axios.post(
      `https://dummyjson.com/posts/add`,
      formData
    );
    return data;
  }
);

// delete запрос на удаление  поста
export const deletePostApi = createAsyncThunk(
  'posts/deletePostApi',
  async function (id) {
    const { data } = await axios.delete(`https://dummyjson.com/todos/${id}`);
    return data;
  }
);

// запрос на афторизацию
export const aftoriztsiyaApi = createAsyncThunk(
  'posts/aftoriztsiyaApi',
  async function (dataForm) {
    const { data } = await axios.post(
      `https://dummyjson.com/auth/login`,
      dataForm
    );
    return data;
  }
);
//  запрос на редактирование  поста

export const editingPostApi = createAsyncThunk(
  'posts/editingPostApi',
  async function (dataForm) {
    const token = JSON.parse(localStorage.getItem('avatar'));

    const { data } = await axios.put(
      `https://dummyjson.com/auth/posts/${dataForm.id}`,
      {
        title: dataForm.title,
        body: dataForm.body,
      },
      {
        headers: {
          Authorization: `Bearer ${token[0].token}`,
        },
      }
    );
    return data;
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loader: false,
    aftoriztsiya: false,
  },
  reducers: {
    deletPost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    addNewPost: (state, action) => {
      state.posts = [action.payload, ...state.posts];
      console.log(state.posts);
    },
  },

  extraReducers: (builder) => {
    // get обработка  полученых постов
    builder.addCase(getPosts.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.loader = false;
      state.posts = action.payload.posts;
    });
    builder.addCase(getPosts.rejected, (state, action) => {
      console.log(action.payload);
    });
    // builder.addCase(deletePostApi.pending, (state) => {
    //   console.log(state);
    // });

    // get обработка  удаления поста
    builder.addCase(deletePostApi.fulfilled, (state, action) => {
      // console.log(action.payload);
    });
    builder.addCase(deletePostApi.rejected, (state, action) => {
      console.log(action.payload);
    });
    // get обработка  добавление поста
    builder.addCase(addPostApi.fulfilled, (state, action) => {
      console.log(action.payload);
    });
    builder.addCase(addPostApi.rejected, (state, action) => {
      console.log(action.payload);
    });
    //  обработка  афторизаций
    builder.addCase(aftoriztsiyaApi.fulfilled, (state, action) => {
      if (localStorage.length == 0) {
        localStorage.setItem('avatar', JSON.stringify([action.payload]));
        state.aftoriztsiya = !state.aftoriztsiya;
      }
    });
    builder.addCase(aftoriztsiyaApi.rejected, (state, action) => {
      console.log(action.error.message);
    });

    // get обработка  редактирование поста
    builder.addCase(editingPostApi.fulfilled, (state, action) => {
      let newState = state.posts.filter(
        (post) => post.id !== action.payload.id
      );
      state.posts = [action.payload, ...newState];
      console.log([state.posts]);
    });
    builder.addCase(editingPostApi.rejected, (state, action) => {
      console.log(action);
    });
  },
});

export const { deletPost, addNewPost } = postSlice.actions;

export default postSlice.reducer;
