import { ThemeProvider } from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import { light } from "./styles/Themes";
import { Routes, Route, Navigate } from "react-router-dom";
import { Landing, Login, Register, Todo } from "./components/screens";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import { UserAuth } from "./context/AuthContext";

function App() {
  const { user } = UserAuth();

  return (
    <>
      <GlobalStyles />
      <ThemeProvider theme={light}>
        <Routes>
          <Route path='/' element={<Layout />}>
            {/* public routes */}
            <Route
              path='/'
              element={user ? <Navigate to='/todo' /> : <Landing />}
            />
            <Route
              path='register'
              element={user ? <Navigate to='/todo' /> : <Register />}
            />
            <Route
              path='login'
              element={user ? <Navigate to='/todo' /> : <Login />}
            />

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
