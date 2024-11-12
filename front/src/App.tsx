import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { protectedRoutes, publicRoutes } from "./routes/routes";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Routes>
          {/* Rotas públicas */}
          {publicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          {/* Rotas privadas */}
          {protectedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
