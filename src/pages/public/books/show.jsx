import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getBooks } from "../../../_services/books";
import { bookImageStorage } from "../../../_api";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/authors";
import { createTransactions } from "../../../_services/transactions";

export default function ShowBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      const payload = {
        book_id: id,
        quantity: quantity,
      };
      await createTransactions(payload);
      alert("Pembelian berhasil");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

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

            <div className="flex items-center gap-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <label htmlFor="quantity" className="text-gray-700 text-sm">
                    Jumlah
                  </label>

                  <div className="flex items-center border rounded">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) => {
                          const newVal = Math.max(0, Number(prev) - 1);
                          return newVal === 0 ? "" : newVal;
                        })
                      }
                      disabled={book.stock <= 0}
                      className="px-3 py-1 text-gray-600 disabled:text-gray-300"
                    >
                      −
                    </button>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      min={1}
                      max={book.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-12 text-center border-x border-gray-200 outline-none"
                      required
                      placeholder="0"
                      disabled={book.stock <= 0}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) =>
                          Math.min(Number(prev) + 1, book.stock)
                        )
                      }
                      disabled={book.stock <= 0}
                      className="px-3 py-1 text-gray-600 disabled:text-gray-300"
                    >
                      +
                    </button>
                  </div>

                  <span
                    className={`text-sm ${
                      book.stock === 0
                        ? "text-red-600"
                        : book.stock < 5
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    {book.stock === 0
                      ? "Stok Habis"
                      : `tersisa ${book.stock} buah`}
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={book.stock <= 0}
                    className="flex items-center justify-center border border-blue-600 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6h13.4M10 21a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
                    </svg>
                    Masukkan Keranjang
                  </button>
                  <button
                    type="submit"
                    disabled={book.stock <= 0}
                    className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Beli Sekarang
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
