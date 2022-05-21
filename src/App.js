import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { light } from "./styles/Themes";
import { Routes, Route } from "react-router-dom";
import { Landing, Login, Register, Todo } from "./components/screens";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={light}>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* public routes */}
            <Route path='/' element={<Landing />} />
            <Route path='register' element={<Register />} />
            <Route path='login' element={<Login />} />

            {/* private routes */}

            <Route element={<RequireAuth />}>
              <Route path='todo' element={<Todo />} />
            </Route>

            {/* catch all*/}
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
