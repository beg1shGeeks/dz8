import { Link, Outlet } from 'react-router-dom';
import style from './layout.module.css';
import { useNavigate } from 'react-router-dom';

const Layout = () => {
  const localStorageAvatar = localStorage.getItem('avatar');
  const parseLocalStorageAvatar = JSON.parse(localStorageAvatar);
  // console.log(parseLocalStorageAvatar);

  const navigate = useNavigate();
  // const validate = () => {
  //   return localStorage.length == 0
  //     ? navigate('Aftoriztsiya')
  //     : navigate('AddPost');
  // };
  return (
    <div>
      {parseLocalStorageAvatar == null ? (
        <header>
          <nav>
            <Link to="/">Посты</Link>
            <Link to="Aftoriztsiya">Афторизация</Link>
            {/* <div>Афторизация</div> */}
          </nav>
        </header>
      ) : (
        parseLocalStorageAvatar.map((data) => (
          <header key={data.id}>
            <nav>
              <Link to="/">Посты</Link>
              <div className={style.avatarInner}>
                <span>{data.firstName}</span>
                <span>{data.username}</span>
                <img src={data.image} alt="avatar" />
              </div>
            </nav>
          </header>
        ))
      )}

      <Outlet />
    </div>
  );
};

export default Layout;
