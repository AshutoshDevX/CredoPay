import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home.jsx";
import { SignIn } from "./pages/SignIn.jsx";
import { SignUp } from "./pages/SignUp.jsx";
import { Toaster } from "@/components/ui/sonner";
import { CustomerTransactions } from "./pages/CustomerTransaction.jsx";
import { BankerAccounts } from "./pages/BankerAccounts.jsx";
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