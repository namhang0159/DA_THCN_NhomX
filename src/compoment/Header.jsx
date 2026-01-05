import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMeApi, getTagApi } from "../util/api";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Modal from "react-modal";

export const Header = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) return;

        const res = await getMeApi();
        setUser(res.data);
        setName(res.data.name);
      } catch {
        localStorage.removeItem("access_token");
      }
    };
    fetchMe();
  }, []);

  const [tags, setTags] = useState([]);
  const [openProductMenu, setOpenProductMenu] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await getTagApi();
        console.log(res);
        setTags(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTags();
  }, []);

  const submitSearch = () => {
    if (!keyword.trim()) return alert("Nhập từ khóa tìm kiếm");
    navigate(`/pagesearch?search=${keyword}`);
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
    setUser(null);
    setName(null);
    setLogoutOpen(false);
    navigate("/");
  };
  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <img
              src="/img/33441164-078d-4508-bde1-4f1f21fb25f0.svg"
              className="w-9 h-9"
              alt="logo"
            />
            <span className="font-extrabold text-lg text-gray-900">
              RIU STORE
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
            <Link className="hover:text-blue-600" to="/">
              Trang chủ
            </Link>
            <div className="relative">
              <span
                className="hover:text-blue-600 cursor-pointer"
                onClick={() => setOpenProductMenu(!openProductMenu)}
              >
                Sản phẩm
              </span>

              {openProductMenu && (
                <div className="absolute top-full left-0 mt-2 w-44 bg-white rounded-lg shadow z-50">
                  <div
                    onClick={() => {
                      navigate("/pageall");
                      setOpenProductMenu(false);
                    }}
                    className="px-4 py-2 font-medium hover:bg-gray-100 cursor-pointer"
                  >
                    Tất cả sản phẩm
                  </div>

                  <hr />

                  {tags.map((tag) => (
                    <div
                      key={tag.id}
                      onClick={() => {
                        navigate(`/pageall?tagId=${tag.id}`);
                        setOpenProductMenu(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {tag.ten_tag}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link className="hover:text-blue-600" to="/about">
              Giới thiệu
            </Link>
            <Link className="hover:text-blue-600" to="/contact">
              Liên hệ
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Search */}
            <div className="flex items-center border rounded-full px-3">
              <input
                className="outline-none text-sm py-1 w-36"
                placeholder="Tìm kiếm..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                onClick={submitSearch}
                className="text-blue-600 font-medium text-sm"
              >
                <i class="fa fa-search text-black" aria-hidden="true"></i>
              </button>
            </div>

            {!user ? (
              <>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 text-sm rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  Đăng ký
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-sm rounded-full bg-blue-600 text-white hover:bg-blue-700"
                >
                  Đăng nhập
                </button>
              </>
            ) : (
              <>
                {/* User menu */}
                <Menu as="div" className="relative">
                  <MenuButton className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium">
                    {name}
                  </MenuButton>
                  <MenuItems className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow border text-sm overflow-hidden">
                    <MenuItem>
                      <div
                        onClick={() => navigate("/profile")}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        Thông tin cá nhân
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div
                        onClick={() => navigate("/order")}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                      >
                        Đơn hàng
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div
                        onClick={() => setLogoutOpen(true)}
                        className="px-4 py-3 hover:bg-red-50 text-red-600 cursor-pointer"
                      >
                        Đăng xuất
                      </div>
                    </MenuItem>
                  </MenuItems>
                </Menu>

                {/* Cart */}
                <button
                  onClick={() => navigate("/shoppingcard")}
                  className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                >
                  <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                </button>
              </>
            )}
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={() => setMenuOpen(true)}>☰</button>
            <button onClick={() => navigate("/shoppingcard")}>
              <i className="fa fa-shopping-cart"></i>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 bg-white flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <span className="font-bold">Menu</span>
              <button onClick={() => setMenuOpen(false)}>✕</button>
            </div>

            {/* Search */}
            <div className="p-4">
              <div className="flex border rounded-full px-3">
                <input
                  className="flex-1 outline-none py-2 text-sm"
                  placeholder="Tìm sản phẩm..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button onClick={submitSearch}>
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>

            {/* Menu content */}
            <div className="flex-1 overflow-y-auto px-4 text-sm">
              {!user ? (
                <div className="flex gap-2 mb-4">
                  <button
                    onClick={() => navigate("/login")}
                    className="flex-1 py-2 bg-blue-600 text-white rounded"
                  >
                    Đăng nhập
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="flex-1 py-2 bg-gray-200 rounded"
                  >
                    Đăng ký
                  </button>
                </div>
              ) : (
                <div className="mb-4 font-medium">
                  {" "}
                  <span>{name}</span>
                  <div
                    onClick={() => navigate("/profile")}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Thông tin cá nhân
                  </div>
                  <div
                    onClick={() => navigate("/order")}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    Đơn hàng
                  </div>
                </div>
              )}

              <div className="space-y-3">
                <div onClick={() => navigate("/")}>Trang chủ</div>

                <div>
                  <div className="font-medium mb-2">Sản phẩm</div>
                  <div className="pl-3 space-y-2 text-gray-600">
                    <div onClick={() => navigate("/pageall")}>
                      Tất cả sản phẩm
                    </div>
                    {tags.map((tag) => (
                      <div
                        key={tag.id}
                        onClick={() => navigate(`/pageall?tagId=${tag.id}`)}
                      >
                        {tag.ten_tag}
                      </div>
                    ))}
                  </div>
                </div>

                <div onClick={() => navigate("/about")}>Giới thiệu</div>
                <div onClick={() => navigate("/contact")}>Liên hệ</div>

                {user && (
                  <div
                    onClick={() => setLogoutOpen(true)}
                    className="text-red-600 pt-4"
                  >
                    Đăng xuất
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Logout modal */}
      <Modal
        isOpen={logoutOpen}
        onRequestClose={() => setLogoutOpen(false)}
        className="bg-white rounded-xl p-6 shadow max-w-sm w-full outline-none"
        overlayClassName="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      >
        <p className="text-center mb-6 text-gray-800">
          Bạn có chắc muốn đăng xuất?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Có
          </button>

          <button
            onClick={() => setLogoutOpen(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Không
          </button>
        </div>
      </Modal>
    </>
  );
};
