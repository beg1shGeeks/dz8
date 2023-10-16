import style from './aftoriztsiya.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { aftoriztsiyaApi } from '../../../store/postSlice';
import { useNavigate } from 'react-router-dom';

const AftoriztsiyaPge = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const aftoriztsiya = useSelector((state) => state.aftoriztsiya);
  const dataForm = (e) => {
    e.preventDefault();
    if (localStorage.length !== 0) {
      navigate('/AddPost');
    } else {
      const data = {
        username: e.target[0].value,
        password: e.target[1].value,
      };

      dispatch(aftoriztsiyaApi(data));
    }
  };
  return (
    <div className={style.container}>
      <form className={style.containerInner} onSubmit={(e) => dataForm(e)}>
        <input type="text" defaultValue="kminchelle" />
        <input type="text" defaultValue="0lelplR" />
        {aftoriztsiya ? (
          <div className={style.aftoriztsiya}>
            <p>вы успешно афторизовались </p>
            <button
              type="button"
              onClick={() => {
                navigate('/');
              }}
            >
              Вернуться на главный
            </button>
          </div>
        ) : (
          <button type="submit">Афторизоваться</button>
        )}
      </form>
    </div>
  );
};

export default AftoriztsiyaPge;
