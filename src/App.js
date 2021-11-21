import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RequireAuth from './components/RequireAuth';
import Header from './components/Header';
import Books from './containers/Books';
import Login from './containers/Login';
import Register from './containers/Register';

function App() {
  const { isAuthenticated } = useSelector(({ authenticationState }) => authenticationState);

  return (
    <div>
      {isAuthenticated && (
        <Header />
      )}
      <Routes>
        <Route path="/" element={
          <RequireAuth>
            <Books />
          </RequireAuth>
        }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
