import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import PurchaseEntry from "./pages/PurchaseEntry";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import PurchaseReports from "./pages/PurchaseReports";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50">
        <Navbar />

        <main className="mx-auto max-w-7xl px-6 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/purchase" element={<PurchaseEntry />} />
            <Route path="/purchase/success" element={<PurchaseSuccess />} />
            <Route path="/reports" element={<PurchaseReports />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
