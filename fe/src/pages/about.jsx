import React from "react";

export const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">
            Về <span className="text-black">RIU STORE</span>
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6">
            PhoneStore là hệ thống bán điện thoại và phụ kiện chính hãng, mang
            đến trải nghiệm mua sắm hiện đại, minh bạch và đáng tin cậy.
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Khám phá sản phẩm
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
          alt="about"
          className="rounded-xl shadow-md"
        />
      </section>

      {/* Stats */}
      <section className="bg-white py-12 border-t">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ["500k+", "Sản phẩm bán ra"],
            ["450k+", "Khách hàng hài lòng"],
            ["8+", "Năm hoạt động"],
            ["24/7", "Hỗ trợ khách hàng"],
          ].map(([value, label]) => (
            <div key={label}>
              <p className="text-3xl font-bold text-blue-600">{value}</p>
              <p className="text-gray-600 mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Giá trị cốt lõi
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            ["Chính hãng", "Cam kết 100% sản phẩm chính hãng"],
            ["Cập nhật", "Luôn có công nghệ mới nhất"],
            ["Khách hàng", "Khách hàng là trung tâm"],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
