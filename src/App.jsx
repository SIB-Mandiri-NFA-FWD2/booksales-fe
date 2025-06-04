import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import PublicLayout from './layouts/public'
import Home from './pages/public'
import Books from './pages/public/books'
import Login from './pages/auth/login'
import Register from "./pages/auth/register"
import AdminLayout from "./layouts/admin"
import AdminBooks from './pages/admin/books'
import BookCreate from './pages/admin/books/create'
import AdminGenres from './pages/admin/genres'
import GenreCreate from './pages/admin/genres/create'
import AdminAuthors from './pages/admin/authors'
import AuthorCreate from './pages/admin/authors/create'
import BookEdit from './pages/admin/books/update'
import AuthorEdit from './pages/admin/authors/update'
import GenreEdit from './pages/admin/genres/update'
import ShowBook from './pages/public/books/show'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* public */}
          <Route element={<PublicLayout />}>
            <Route index path="home" element={<Home />} />

            <Route path="books">
              <Route index element={<Books />} />
              <Route path="show/:id" element={<ShowBook />} />
            </Route>
          </Route>

          {/* auth */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* admin */}
          <Route path="admin" element={<AdminLayout />}>
            <Route path="books">
              <Route index element={<AdminBooks />} />
              <Route path="create" element={<BookCreate />} />
              <Route path="edit/:id" element={<BookEdit />} />
            </Route>
            <Route path="genres">
              <Route index element={<AdminGenres />} />
              <Route path="create" element={<GenreCreate />} />
              <Route path="edit/:id" element={<GenreEdit />} />
            </Route>
            <Route path="authors">
              <Route index element={<AdminAuthors />} />
              <Route path="create" element={<AuthorCreate />} />
              <Route path="edit/:id" element={<AuthorEdit />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
