import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import FormViewer from "./registration/formviewer";
import { VisibleFormsPage } from "./registration/registrationpage"
import { DynamicFormBuilder } from "./registration/create";
import { FormAdderPage } from "./registration/formadder";
import { EditFormPage } from "./registration/update"
import { ResponsesPage } from "./registration/responses"

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
            <Route path="/registration" element={< VisibleFormsPage />} />
            <Route path="/form/:formId" element={<FormViewer />} />
          <Route path="/registrationform" element={<FormAdderPage />} />
          <Route path='/responses/:id' element={<ResponsesPage />} />
          <Route path="/createform" element={<DynamicFormBuilder />} />
          <Route path="/editform/:id" element={<EditFormPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}