import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { logout } from "../_services/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const handleLogout = async () => {
    if (token) {
      await logout({ token, userInfo });
    }
    navigate("/login");
  };

  return (
    <>
      <header>
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to={"/"} className="flex items-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sriusnyoba.appspot.com/o/Project%20NF%2FReact%2FLogoGelap.png?alt=media&token=8b1f3cb2-b582-48aa-9773-0c4e458bd55f"
                className="mr-1 h-6 sm:h-10 block dark:hidden"
              />
              <img
                src="https://firebasestorage.googleapis.com/v0/b/sriusnyoba.appspot.com/o/Project%20NF%2FReact%2FlogoFix.png?alt=media&token=4e50fb63-997a-4c09-995f-bfe4fee8cba4"
                className="mr-1 h-6 sm:h-10 hidden dark:block"
              />

              <span className="self-center text-xl font-semibold whitespace-nowrap text-[#03045E] dark:text-white">
                Buka Buku
              </span>
            </Link>

            <div className="flex items-center lg:order-2">
              {token && userInfo ? (
                <>
                  <Link
                    to={"/"}
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  >
                    {userInfo.name}
                  </Link>
                  <Link
                    to={"/"}
                    onClick={handleLogout}
                    className="text-white bg-[#03045E] hover:bg-[#023E8A] focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to={"login"}
                    className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                  >
                    Masuk
                  </Link>
                  <Link
                    to={"register"}
                    className="text-white bg-[#03045E] hover:bg-[#023E8A] focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                  >
                    Daftar
                  </Link>
                </>
              )}
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <Link
                    to={"/"}
                    className="block py-2 pr-4 pl-3 text-white lg:bg-transparent lg:text-[#03045E] lg:p-0 dark:text-white link-underline"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to={"books"}
                    className="block py-2 pr-4 pl-3 text-gray-700 lg:hover:text-[#03045E] lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 lg:p-0 dark:text-white link-underline"
                  >
                    Buku Terlaris
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="block py-2 pr-4 pl-3 text-gray-700 lg:hover:text-[#03045E] lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 lg:p-0 dark:text-white link-underline"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="block py-2 pr-4 pl-3 text-gray-700 lg:hover:text-[#03045E] lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 lg:p-0 dark:text-white link-underline"
                  >
                    Layanan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
