import { useEffect, useState } from "react";
import { getBooks } from "../../../_services/books";
import { getGenres } from "../../../_services/genres";
import { Link } from "react-router-dom";
import { bookImageStorage } from "../../../_api";
import { getAuthors } from "../../../_services/authors";

export default function Books() {
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
  }, []);
  const getGenre = (id) => {
    const genre = genres.find((genre) => genre.id === id);
    return genre ? genre.name : "Unknown genre";
  };

  const getAuthor = (id) => {
    const author = authors.find((author) => author.id === id);
    return author ? author.name : "Unknown author";
  };

  console.log(books);
  
  return (
    <>
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-12">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
            {books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book.id}
                  className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="h-56 w-full">
                    <Link to={`/books/show/${book.id}`}>
                      <img
                        className="mx-auto h-full"
                        src={`${bookImageStorage}/${book.cover_photo}`}
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="pt-6">
                    <Link
                      to={`/books/show/${book.id}`}
                      className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                    >
                      {book.title}
                    </Link>

                    <ul className="mt-2 flex items-center gap-2">
                      <li
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#28A745" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          fill="white"
                          className="bi bi-book"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1 2.828c.885-.37 2.154-.828 4-.828 1.182 0 2.31.2 3 .527V13.5c-.69-.327-1.818-.527-3-.527-1.846 0-3.115.458-4 .828V2.828z" />
                          <path d="M9 2.527a7.48 7.48 0 0 1 3-.527c1.846 0 3.115.458 4 .828v10.645c-.885-.37-2.154-.828-4-.828-1.182 0-2.31.2-3 .527V2.527z" />
                        </svg>
                        <p className="text-xs font-medium text-white">
                          {getGenre(book.genre_id)}
                        </p>
                      </li>

                      <li
                        className="flex items-center gap-1 px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#E63946" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          fill="white"
                          className="bi bi-pen"
                          viewBox="0 0 16 16"
                        >
                          <path d="m13.498.795.149-.149a1.207 1.207 0 0 1 1.707 1.707l-.149.149a.5.5 0 0 1-.708 0L13.5 1.207a.5.5 0 0 1 0-.708z" />
                          <path d="M11.379 2.414 3 10.793V13h2.207l8.379-8.379-2.207-2.207z" />
                        </svg>
                        <p className="text-xs font-medium text-white">
                          {getAuthor(book.author_id)}
                        </p>
                      </li>
                    </ul>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
                        Rp.{book.price}
                      </p>

                      <Link
                        to={`/books/show/${book.id}`}
                        className="inline-flex items-center rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-4  focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        View Detail
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>Tidak ada data</p>
            )}
          </div>
          <div className="w-full text-center">
            <button
              type="button"
              className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-indigo-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            >
              Show more
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
