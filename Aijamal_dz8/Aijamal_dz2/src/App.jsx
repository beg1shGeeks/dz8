import AddPost from './assets/Pages/addPost/AddPost';
import Post from './assets/Pages/post/Post';
import Layout from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import AftoriztsiyaPge from './assets/Pages/aftoriztsiyaPage/AftoriztsiyaPge';

import './index.css';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Post />} />
        <Route path="/AddPost" element={<AddPost />} />
        <Route path="/Aftoriztsiya" element={<AftoriztsiyaPge />} />
      </Route>
    </Routes>
  );
};

export default App;
