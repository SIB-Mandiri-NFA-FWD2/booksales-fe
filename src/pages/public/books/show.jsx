import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBooks } from "../../../_services/books";
import { bookImageStorage } from "../../../_api";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";

export default function ShowBook() {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [booksData, genresData, authorsData] = await Promise.all([
        getBooks(),
        getGenres(),
        getAuthors(),
      ]);
      setBooks(booksData);
      setGenres(genresData);
      setAuthors(authorsData);
    };

    fetchData();
  }, [id]);

  const getGenre = (id) => {
    const genre = genres.find((genre) => genre.id === id);
    return genre ? genre.name : "Unknown genre";
  };

  const getAuthor = (id) => {
    const author = authors.find((author) => author.id === id);
    return author ? author.name : "Unknown author";
  };

  const book = books.find((b) => b.id === parseInt(id));
  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-4">
        <Link
          to="/books"
          className="text-[#03045E] text-sm mb-4 inline-block hover:underline"
        >
          &lt; Kembali
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <img
            src={`${bookImageStorage}/${book.cover_photo}`}
            alt={book.title}
            className="w-full h-auto rounded shadow-md"
          />

          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-2">
              {book.title}{" "}
              <span className="text-sm bg-[#03045E] text-white px-2 py-2 rounded-full ml-2">
                {getGenre(book.genre_id)}
              </span>
            </h1>
            <h2 className="text-lg text-gray-600 mb-4">
              {getAuthor(book.author_id)}
            </h2>
            <p className="text-gray-700 mb-6">Deskripsi: {book.description}</p>
            <p className="text-gray-500 mb-4">
              Stok:{" "}
              <span
                className={book.stock > 0 ? "text-green-600" : "text-red-600"}
              >
                {book.stock > 0 ? book.stock : "Habis"}
              </span>
            </p>

            <div className="flex gap-4">
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full">
                Tambah ke Keranjang
              </button>
              <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-full">
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}