/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Tools from "./pages/Tools";
import Category from "./pages/Category";
import ToolView from "./pages/ToolView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools" element={<Tools />} />
          <Route path="category/:id" element={<Category />} />
          <Route path="tool/:id" element={<ToolView />} />
          {/* Placeholders for Well-Being and Security tabs */}
          <Route path="well-being" element={<Tools filterCategory="Well-Being" />} />
          <Route path="security" element={<Tools filterCategory="Security" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
