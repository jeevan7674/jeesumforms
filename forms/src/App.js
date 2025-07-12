import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {FormViewer} from "./pages/formviewer"
import { VisibleFormsPage } from "./pages/registration"
import { DynamicFormBuilder } from "./pages/createform";
import { FormAdderPage } from "./pages/formadder";
import { EditFormPage } from "./pages/update"
import { ResponsesPage } from "./pages/response"
import { ChakraProvider } from "@chakra-ui/react";
import LandingPage from "./pages/landingpage";
import InteractiveAuthPage from "./pages/login page";
import { SignupPage } from "./pages/signup";

export default function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/login" element={<InteractiveAuthPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/registration" element={< VisibleFormsPage />} />
          <Route path="/form/:formId" element={<FormViewer />} />
          <Route path="/registrationform" element={<FormAdderPage />} />
          <Route path='/responses/:id' element={<ResponsesPage />} />
          <Route path="/createform" element={<DynamicFormBuilder />} />
          <Route path="/editform/:id" element={<EditFormPage />} />
        </Routes>
      </Router>
      </ChakraProvider>
  );
}