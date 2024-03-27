import { ReactQueryProvider } from './api/queryClient';
import { MainPage } from './pages/MainPage';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UsersPage } from './pages/UserPage';

function App() {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/users" element={<UsersPage />} />
        </Routes>
      </BrowserRouter>
    </ReactQueryProvider>
  );
}

export default App;
