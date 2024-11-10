import { Provider } from "react-redux";
import { store } from "./store/store";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import LoginScreen from "./components/login-screen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./middlewares/protect-route";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LoginScreen />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <h1>Home</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
