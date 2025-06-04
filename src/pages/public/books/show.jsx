// export default function showBook() {
//   return (

//     <div className="p-6 bg-white text-gray-800 max-w-7xl mx-auto">
//       {/* Header Buku */}
//       <div className="flex flex-col md:flex-row gap-8">
//         <img
//           src="/cover-bumi.jpg"
//           alt="Bumi"
//           className="w-52 h-auto shadow-lg"
//         />
//         <div className="flex-1">
//           <h1 className="text-3xl font-bold">
//             Bumi{" "}
//             <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2">
//               Novel
//             </span>
//           </h1>
//           <p className="text-lg font-semibold mt-2">Tere Liye</p>

//           {/* Deskripsi */}
//           <p className="mt-4 text-sm text-justify">
//             Novel dengan tebal 440 halaman ini, berkisah mengenai petualangan
//             Raib...
//           </p>

//           {/* Detail */}
//           <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
//             <div>
//               <strong>Jumlah Halaman:</strong> 440 Halaman
//             </div>
//             <div>
//               <strong>ISBN:</strong> 978-602-03-3295-6
//             </div>
//             <div>
//               <strong>Penerbit:</strong> Gramedia, 2021
//             </div>
//             <div>
//               <strong>Bahasa:</strong> Indonesia
//             </div>
//           </div>

//           {/* Aksi */}
//           <div className="mt-6 flex items-center gap-4">
//             <Button>Pinjam Sekarang</Button>
//             <span className="text-yellow-500 font-bold">★ 5/5</span>
//             <span className="text-gray-600">Dipinjam 110+</span>
//           </div>
//         </div>
//       </div>

//       {/* Series Lainnya */}
//       <div className="mt-12">
//         <h2 className="text-xl font-semibold mb-4">Series Lainnya</h2>
//         <div className="flex gap-4 overflow-x-auto">
//           {["Matahari", "Bulan", "Bintang"].map((judul, i) => (
//             <div key={i} className="w-36 flex-shrink-0">
//               <img
//                 src={`/cover-${judul.toLowerCase()}.jpg`}
//                 alt={judul}
//                 className="rounded shadow"
//               />
//               <p className="text-sm mt-2 text-center">{judul}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Buku Terkait */}
//       <div className="mt-12">
//         <h2 className="text-xl font-semibold mb-4">Buku Terkait</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//           {[
//             "Edensor",
//             "Pergi",
//             "Langit Biru",
//             "Lost Souls",
//             "172 Days",
//             "Lubuk Hati",
//           ].map((judul, i) => (
//             <div key={i} className="text-center">
//               <img
//                 src={`/related-${judul.toLowerCase().replace(/ /g, "-")}.jpg`}
//                 alt={judul}
//                 className="rounded shadow mx-auto w-28 h-40 object-cover"
//               />
//               <p className="text-xs mt-2">{judul}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { getBookById } from "../../../_services/books";
import { getGenreById } from "../../../_services/genres";
import { getAuthorById } from "../../../_services/authors";
import { bookImageStorage } from "../../../_api";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [genre, setGenre] = useState(null);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const bookData = await getBookById(id);
        setBook(bookData);

        const genreData = await getGenreById(bookData.genre_id);
        setGenre(genreData);

        const authorData = await getAuthorById(bookData.author_id);
        setAuthor(authorData);
      } catch (error) {
        console.error("Error loading book detail", error);
      }
    };

    fetchDetail();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <img
            src={`${bookImageStorage}/${book.cover_photo}`}
            alt={book.title}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {book.description}
          </p>

          <p className="mb-2">
            <span className="font-semibold">Price:</span> Rp.{book.price}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Stock:</span> {book.stock}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Genre:</span>{" "}
            {genre ? genre.name : "Loading..."}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Author:</span>{" "}
            {author ? author.name : "Loading..."}
          </p>

          <Link
            to="/books"
            className="inline-block mt-4 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Back to Books
          </Link>
        </div>
      </div>
    </section>
  );
}
