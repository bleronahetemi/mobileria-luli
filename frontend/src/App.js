import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Ballina from './components/Ballina';
import ShtoProdukt from './components/ShtoProdukt';
import RequireAuth from './components/RequireAuth';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Ballina />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route
          path="/shto"
          element={
            <RequireAuth adminOnly>
              <ShtoProdukt />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
