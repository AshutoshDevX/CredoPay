import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Toaster } from "@/components/ui/sonner";
import { CustomerTransactions } from "./Pages/CustomerTransaction";
import { BankerAccounts } from "./Pages/BankerAccounts";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/transactions" element={<CustomerTransactions />} />
        <Route path="/banker" element={<BankerAccounts />} />
      </Routes>
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  );
}

export default App;