import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Layout = lazy(() => import("./components/Layout/Layout"));
const UpdateTodo = lazy(() => import("./pages/UpdateTodo"));
const MainPage = lazy(() => import("./pages/index"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index path="/" element={<MainPage />} />
            <Route path="/update/:id" element={<UpdateTodo />} />
          </Route>
        </Routes>
      </Router>
    </Suspense>
  );
};

export default App;
