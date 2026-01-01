import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-50 text-gray-700 mt-20">
      {/* Top */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer mb-4"
          >
            <span className="text-gray-900 font-bold text-xl">RIU STORE</span>
          </div>

          <p className="text-sm text-gray-500 leading-relaxed">
            RIU STORE – Chuyên cung cấp điện thoại, phụ kiện chính hãng với giá
            tốt, bảo hành uy tín và hỗ trợ khách hàng 24/7.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Danh mục</h3>
          <ul className="space-y-3 text-sm">
            <li
              onClick={() => navigate("/pageall")}
              className="cursor-pointer hover:text-blue-600 transition"
            >
              Điện thoại
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">
            Hỗ trợ khách hàng
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-blue-600 cursor-pointer transition">
              Chính sách bảo hành
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition">
              Chính sách đổi trả
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition">
              Hướng dẫn mua hàng
            </li>
            <li className="hover:text-blue-600 cursor-pointer transition">
              Liên hệ hỗ trợ
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-gray-900 font-semibold mb-4">Liên hệ</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <i className="fa fa-map-marker-alt text-blue-600"></i>
              TP. Hồ Chí Minh
            </li>
            <li className="flex items-center gap-2">
              <i className="fa fa-phone text-blue-600"></i>
              0909 123 456
            </li>
            <li className="flex items-center gap-2">
              <i className="fa fa-envelope text-blue-600"></i>
              support@riustore.vn
            </li>
          </ul>

          {/* Social */}
          <div className="flex gap-4 mt-5">
            <a
              className="w-9 h-9 flex items-center justify-center rounded-full
                          bg-white border border-gray-200
                          hover:bg-blue-600 hover:text-white transition"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              className="w-9 h-9 flex items-center justify-center rounded-full
                          bg-white border border-gray-200
                          hover:bg-blue-500 hover:text-white transition"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              className="w-9 h-9 flex items-center justify-center rounded-full
                          bg-white border border-gray-200
                          hover:bg-pink-600 hover:text-white transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-200">
        <div
          className="max-w-7xl mx-auto px-6 py-4
                        flex flex-col sm:flex-row
                        justify-between items-center
                        text-sm text-gray-500 gap-2"
        >
          <span>
            © {new Date().getFullYear()} RIU STORE. All rights reserved.
          </span>
          <div className="flex gap-4">
            <span className="hover:text-blue-600 cursor-pointer">
              Điều khoản
            </span>
            <span className="hover:text-blue-600 cursor-pointer">Bảo mật</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
