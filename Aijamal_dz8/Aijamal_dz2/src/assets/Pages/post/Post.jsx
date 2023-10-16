import style from './post.module.css';
import { useEffect } from 'react';
import { deletPost, deletePostApi, getPosts } from '../../../store/postSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Post = () => {
  const posts = useSelector((state) => state.posts);
  const loader = useSelector((state) => state.loader);
  const naviget = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <div className={style.container}>
      {loader ? (
        <div>load.....</div>
      ) : (
        posts.map((post) => (
          <div key={post.id} className={style.post_container}>
            <h2>{post.title}</h2>
            <div>{post.body}</div>
            <div className={style.btnContainer}>
              <button
                type="button"
                onClick={() => {
                  localStorage.length == 0
                    ? naviget('Aftoriztsiya')
                    : naviget('AddPost', { state: post });
                }}
              >
                редактировать
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch(deletPost(post.id));
                  dispatch(deletePostApi(post.id));
                }}
              >
                Удалить
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Post;
