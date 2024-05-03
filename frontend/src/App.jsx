import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import Register from "./pages/Register";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Search from "./pages/SearchByTags";
import SearchUsingCategory from "./pages/SearchUsingCategory.jsx";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/blog/edit/:id" element={<EditBlog />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword" element={<ResetPassword />} />
        <Route path="/search/tags" element={<Search />} />
        <Route path="/search/category" element={<SearchUsingCategory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
