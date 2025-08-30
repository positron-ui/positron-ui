import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import Playground from "@/react-app/pages/Playground";
import Documentation from "@/react-app/pages/Documentation";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </Router>
  );
}
