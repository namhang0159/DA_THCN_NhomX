import React from "react";

export const Contact = () => {
  return (
    <div className="bg-[#f6f7f8] text-[#111418]">
      {/* Hero */}
      <section className="bg-white border-b border-[#f0f2f4]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Luôn sẵn sàng
          </h1>
          <p className="text-[#617589] max-w-[600px] mx-auto text-lg">
            Chúng tôi luôn sẵn sàng hỗ trợ bạn về sản phẩm, đơn hàng và dịch vụ.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-10 py-12 space-y-12">
        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="flex gap-4 p-6 rounded-xl bg-white border border-[#dbe0e6] hover:shadow-lg transition">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">📞</div>
            <div>
              <h3 className="font-bold text-lg">Call Us</h3>
              <p className="text-blue-600 font-medium text-lg">0909 123 456</p>
              <p className="text-sm text-[#617589]">
                Thứ 2 – Thứ 6, 9:00 – 18:00
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex gap-4 p-6 rounded-xl bg-white border border-[#dbe0e6] hover:shadow-lg transition">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">✉️</div>
            <div>
              <h3 className="font-bold text-lg">Email Us</h3>
              <p className="text-blue-600 font-medium">support@riustore.vn</p>
              <p className="text-blue-600 font-medium">sales@riustore.vn</p>
            </div>
          </div>

          {/* Address */}
          <div className="flex gap-4 p-6 rounded-xl bg-white border border-[#dbe0e6] hover:shadow-lg transition">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">📍</div>
            <div>
              <h3 className="font-bold text-lg">Visit Us</h3>
              <p className="font-medium">123 Cao Lỗ</p>
              <p className="text-sm text-[#617589]">Quận 7, TP.HCM</p>
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="w-full h-[450px] rounded-xl overflow-hidden border border-[#dbe0e6] bg-white shadow-sm">
          <iframe
            title="PhoneShop Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.9544104264655!2d106.6752518118055!3d10.737997189364322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f62a90e5dbd%3A0x674d5126513db295!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgU8OgaSBHw7Ju!5e0!3m2!1svi!2s!4v1766047382963!5m2!1svi!2s"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
};
