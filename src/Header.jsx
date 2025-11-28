import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMeApi } from "./util/api";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Modal from "react-modal";

export const Header = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [appLoading, setAppLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  useEffect(() => {
    const fetchMe = async () => {
      try {
        setAppLoading(true);

        const token = localStorage.getItem("access_token");
        if (!token) {
          setUser(null);
          setName(null);
          setAppLoading(false);
          return;
        }

        const res = await getMeApi();
        const data = res.data;

        const now = Date.now() / 1000;
        if (data.exp < now) {
          console.log("Token đã hết hạn");
          localStorage.removeItem("access_token");
          setUser(null);
          setName(null);
        } else {
          setUser(token);
          setName(data.name);
        }
      } catch (err) {
        console.error("Lỗi khi gọi getMeApi:", err);
        localStorage.removeItem("access_token");
        setUser(null);
        setName(null);
      } finally {
        setAppLoading(false);
      }
    };

    fetchMe();
  }, []);
  const submitSearch = () => {
    if (!keyword) {
      alert("Cần nhập nội dung !");
    } else {
      navigate(`/pagesearch?search=${keyword}`);
    }
  };
  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      {appLoading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: " 50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <i class="fa fa-spinner" aria-hidden="true"></i>
        </div>
      ) : (
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Logo */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img
                src="/img/33441164-078d-4508-bde1-4f1f21fb25f0.svg"
                alt="logo"
                className="w-10 h-10 object-contain"
              />

              <span className="text-xl font-bold text-gray-800">RIU Store</span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 text-gray-700 font-medium">
              <Link to="/" className="hover:text-blue-600 transition">
                Home
              </Link>
              <Link to="/about" className="hover:text-blue-600 transition">
                About
              </Link>
              <Link to="/contact" className="hover:text-blue-600 transition">
                Contact
              </Link>
            </nav>

            {/* Search + Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <input
                type="text"
                placeholder="Search..."
                onChange={(e) => setKeyword(e.target.value)}
                className="px-3 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              <button
                onClick={submitSearch}
                className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition"
              >
                Search
              </button>
              {!user ? (
                <div>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-900 transition"
                  >
                    Login
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Menu as="div" className="relative inline-block text-left ">
                    <MenuButton className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex gap-4">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_4926_290388)">
                          <path
                            d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></path>{" "}
                          <path
                            d="M9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10Z"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></path>{" "}
                          <path
                            d="M6.16797 18.849C6.41548 18.0252 6.92194 17.3032 7.61222 16.79C8.30249 16.2768 9.13982 15.9997 9.99997 16H14C14.8612 15.9997 15.6996 16.2774 16.3904 16.7918C17.0811 17.3062 17.5874 18.0298 17.834 18.855"
                            stroke="white"
                            stroke-width="1.5"
                            stroke-linecap="round"
                          ></path>
                        </g>{" "}
                        <defs>
                          <clipPath id="clip0_4926_290388">
                            <rect width="24" height="24" fill="white"></rect>
                          </clipPath>
                        </defs>
                      </svg>
                      {name}
                    </MenuButton>

                    <MenuItems
                      anchor="bottom"
                      className="absolute left-0 mt-2 w-40 origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black/10 focus:outline-none"
                    >
                      <div className="py-3 flex flex-col justify-center">
                        <MenuItem>
                          <a className="block data-focus:bg-blue-100 text-center p-4">
                            Thông tin cá nhân
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            className="block data-focus:bg-blue-100 text-center p-4"
                            onClick={() => navigate("/order")}
                          >
                            Đơn hàng của bạn
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a className="block data-focus:bg-blue-100 text-center p-4">
                            Hỗ Trợ
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            className="block data-focus:bg-blue-100 text-center p-4"
                            onClick={openModal}
                          >
                            Đăng xuất
                          </a>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                  <div
                    className="bg-gray-100  h-10 rounded-xl flex justify-center items-center gap-0.5 p-3"
                    onClick={() => navigate("/shoppingcard")}
                  >
                    Giỏ Hàng{" "}
                    <i class="fa fa-shopping-bag " aria-hidden="true"></i>
                  </div>
                </div>
              )}
            </div>
            {/* Modal đăng xuất */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              className="w-[90%] max-w-md mx-auto mt-[20vh] bg-white rounded-2xl shadow-lg p-6 outline-none"
              contentLabel="Logout Modal"
            >
              <p className="text-gray-600 text-center mb-6">
                Bạn có chắc chắn muốn đăng xuất không?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => {
                    localStorage.removeItem("access_token");
                    setUser(null);
                    closeModal();
                    window.location.reload;
                  }}
                  className="px-5 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
                >
                  Có
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-5 py-2 rounded-xl bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 transition"
                >
                  Không
                </button>
              </div>
            </Modal>
            {/* Mobile Hamburger */}
            <button
              className="md:hidden flex flex-col space-y-1 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className="w-6 h-0.5 bg-gray-800"></span>
              <span className="w-6 h-0.5 bg-gray-800"></span>
              <span className="w-6 h-0.5 bg-gray-800"></span>
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
              <nav className="flex flex-col space-y-4 p-4 text-gray-700 font-medium">
                <Link
                  to="/"
                  className="hover:text-blue-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className="hover:text-blue-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Contact
                </Link>
                {!user ? (
                  <div>
                    <button
                      onClick={() => navigate("/register")}
                      className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                    >
                      Register
                    </button>
                    <button
                      onClick={() => navigate("/login")}
                      className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-900 transition"
                    >
                      Login
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Menu as="div" className="relative inline-block text-left ">
                      <MenuButton className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex gap-4">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clip-path="url(#clip0_4926_290388)">
                            <path
                              d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            ></path>{" "}
                            <path
                              d="M9 10C9 10.7956 9.31607 11.5587 9.87868 12.1213C10.4413 12.6839 11.2044 13 12 13C12.7956 13 13.5587 12.6839 14.1213 12.1213C14.6839 11.5587 15 10.7956 15 10C15 9.20435 14.6839 8.44129 14.1213 7.87868C13.5587 7.31607 12.7956 7 12 7C11.2044 7 10.4413 7.31607 9.87868 7.87868C9.31607 8.44129 9 9.20435 9 10Z"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            ></path>{" "}
                            <path
                              d="M6.16797 18.849C6.41548 18.0252 6.92194 17.3032 7.61222 16.79C8.30249 16.2768 9.13982 15.9997 9.99997 16H14C14.8612 15.9997 15.6996 16.2774 16.3904 16.7918C17.0811 17.3062 17.5874 18.0298 17.834 18.855"
                              stroke="white"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            ></path>
                          </g>{" "}
                          <defs>
                            <clipPath id="clip0_4926_290388">
                              <rect width="24" height="24" fill="white"></rect>
                            </clipPath>
                          </defs>
                        </svg>
                        {name}
                      </MenuButton>

                      <MenuItems
                        anchor="bottom"
                        className="absolute left-0 mt-2 w-40 origin-top-left rounded-xl bg-white shadow-lg ring-1 ring-black/10 focus:outline-none"
                      >
                        <div className="py-3 flex flex-col justify-center">
                          <MenuItem>
                            <a className="block data-focus:bg-blue-100 text-center p-4">
                              Thông tin cá nhân
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              className="block data-focus:bg-blue-100 text-center p-4"
                              onClick={navigate("/orders")}
                            >
                              Đơn hàng của bạn
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a className="block data-focus:bg-blue-100 text-center p-4">
                              Hỗ Trợ
                            </a>
                          </MenuItem>
                          <MenuItem>
                            <a
                              className="block data-focus:bg-blue-100 text-center p-4"
                              onClick={openModal}
                            >
                              Đăng xuất
                            </a>
                          </MenuItem>
                        </div>
                      </MenuItems>
                    </Menu>
                    <div
                      className="bg-gray-100  h-10 rounded-xl flex justify-center items-center gap-0.5 p-3"
                      onClick={() => navigate("/shoppingcard")}
                    >
                      Giỏ Hàng{" "}
                      <i class="fa fa-shopping-bag " aria-hidden="true"></i>
                    </div>
                  </div>
                )}
              </nav>
            </div>
          )}
        </header>
      )}
    </div>
  );
};
