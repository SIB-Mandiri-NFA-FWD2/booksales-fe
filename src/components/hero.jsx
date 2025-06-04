import React from "react";

export default function Hero() {
  const publishers = [
    {
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Gramedia_Pustaka_Utama.svg/1200px-Gramedia_Pustaka_Utama.svg.png",
    },
    {
      logo: "https://seller.mizanmu.id/asset/images/penerbit/2f8f39438e69753f6e600900d60a3b5a.png",
    },
    {
      logo: "https://www.erlangga.co.id/images/logo-erlangga-png-resources-blue.png",
    },
    {
      logo: "https://w1.indonesia-bookfair.com/uploads/event/1694189815761_Republika%20Penerbit.png",
    },
    {
      logo: "https://greenbook.id/blog/wp-content/uploads/2023/11/Mahaka-Media.png",
    },
  ];
  return (
    <>
      <section className="bg-white dark:bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between">
          {/* Text Section */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#03045E] dark:text-white mb-6 leading-snug">
              Temukan, Pinjam, dan
              <br />
              Nikmati Buku Favorit Anda!
            </h1>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8">
              Jelajahi koleksi buku yang luas dari berbagai genre, pinjam dengan
              mudah, dan nikmati pengalaman membaca yang lancar—semuanya hanya
              dalam beberapa klik!
            </p>

            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 w-full max-w-md shadow-sm">
              <input
                type="text"
                placeholder="Sedang mencari buku? Mulailah mengetik di sini..."
                className="bg-transparent outline-none w-full text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.293 16.293a1 1 0 01-1.414 0l-3.387-3.387A5.5 5.5 0 1114.5 9.5a5.5 5.5 0 01-4.008 5.312l3.387 3.387a1 1 0 010 1.414zM4.5 9.5a5 5 0 1010 0 5 5 0 00-10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Image Section */}
          <div className="md:w-1/2 flex justify-center pl-20">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/sriusnyoba.appspot.com/o/Project%20NF%2FReact%2FKids%20reading-amico.png?alt=media&token=6811ba51-777d-4fc9-913a-72b90ffd0feb"
              alt="Ilustrasi Membaca Buku"
              className="w-4/5 max-w-md h-auto"
            />
          </div>
        </div>
      </section>

      {/* Publishers Section */}
      <section className="bg-white dark:bg-gray-800">
        <div className="max-w-screen-xl mx-auto px-4 flex justify-center items-center gap-x-32 gap-y-16 flex-wrap">
          {publishers.map((publisher, index) => (
            <div
              key={index}
              className="w-32 h-32 flex items-center justify-center"
            >
              <img
                src={publisher.logo}
                alt={`Logo penerbit ${index + 1}`}
                className="max-h-24 max-w-full object-contain filter grayscale brightness-150"
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}  