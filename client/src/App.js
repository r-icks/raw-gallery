import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Gallery, MetaData, SharedLayout } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>

      <Route path="/" element={<SharedLayout/>}>
        <Route index element={<Gallery />}/>
        <Route path="/:id" element={<MetaData />}/>
      </Route>
      <Route path="*" element={<p>404</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;