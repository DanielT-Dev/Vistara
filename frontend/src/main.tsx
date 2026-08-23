import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import "./styles/animations.css";

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AuthInitializer from "./components/AuthInitializer";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthInitializer>
        <ChakraProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ChakraProvider>
      </AuthInitializer>
    </Provider>
  </StrictMode>,
)
