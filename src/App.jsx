import SignInForm from './components/SignInForm/index.jsx';
import RegisterForm from './components/RegisterForm/index.jsx';
import Layout from './components/Layout/index.jsx';
import Dashboard from './components/Dashboard/index.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>} />
      <Route path='/login' element={<SignInForm/>} />
      <Route path='/register' element={<RegisterForm/>} />
      <Route path='/dashboard' element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;