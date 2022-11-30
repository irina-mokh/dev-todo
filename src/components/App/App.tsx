import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Project } from '../Project/Project';
import { Layout } from '../Layout/Layout';
import { Home } from '../Home/Home';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<Project />} />
        </Route>
      </Routes>
      <div id="modal-root"></div>
    </BrowserRouter>
  );
};
