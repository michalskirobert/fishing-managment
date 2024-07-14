"use client";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { store } from "@redux/store";

export default function Providers({ children }: { children: JSX.Element }) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        {...{
          theme: "colored",
          hideProgressBar: false,
          newestOnTop: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
        }}
      />
    </Provider>
  );
}
