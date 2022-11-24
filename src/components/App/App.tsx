import { Project } from '../Project/Project';
import { Layout } from '../Layout/Layout';
import { Home } from '../Home/Home';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home/>} />
          <Route path="/project/:id" element={<Project/>} />
        </Route>
      </Routes>
      <div className="app"></div>
      <div id="modal-root"></div>
    </BrowserRouter>
  );
}
