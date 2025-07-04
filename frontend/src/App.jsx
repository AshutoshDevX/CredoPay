import { Home } from "./pages/Home"
import { BrowserRouter, Routes, Route } from "react-router"
import { SignIn } from "./pages/SignIn"
import { SignUp } from "./pages/SignUp"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App


