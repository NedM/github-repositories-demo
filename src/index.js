import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import Repositories from './pages/Repositories';
import Repository from './pages/Repository';

const rootElement = document.getElementById('root')
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="repositories" element={<Repositories />} />
        <Route path="repositories/:repositoryId" element={<Repository />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Go back! There's nothing here.</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);
