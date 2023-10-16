import style from './addPost.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPostApi,
  addNewPost,
  editingPostApi,
} from '../../../store/postSlice';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddPost = () => {
  const navigation = useNavigate();
  const editablePost = useLocation();
  const dispatch = useDispatch();
  const [body, setBdoy] = useState(editablePost.state.body);
  const [title, setTitle] = useState(editablePost.state.title);

  const hendelAddPost = (e) => {
    e.preventDefault();
    const formData = {
      id: editablePost.state.id,
      title: title,
      body: body,
    };

    dispatch(editingPostApi(formData));
    navigation('/');
  };
  return (
    <div className={style.container}>
      <div className={style.containerInner}>
        <form className={style.form} onSubmit={(e) => hendelAddPost(e)}>
          <input
            type="text"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="body"
            onChange={(e) => setBdoy(e.target.value)}
            value={body}
          ></textarea>
          <button type="submit">Сохранить </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;
