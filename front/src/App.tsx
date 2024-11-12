import AppProviders from "./providers/app-providers"; 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { protectedRoutes, publicRoutes } from "./routes/routes";
import "./App.css";

function App() {
  return (
    <AppProviders>
      <Router>
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
    </AppProviders>
  );
}

export default App;
