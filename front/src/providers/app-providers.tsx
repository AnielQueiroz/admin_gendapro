import { Provider } from "react-redux";
import { store } from "@/store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const AppProviders = ({ children }: Props) => (
    <Provider store={store}>
        <ToastContainer 
            autoClose={3000}
        />
        {children}
    </Provider>
);

export default AppProviders;