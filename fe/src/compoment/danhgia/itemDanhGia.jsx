export const ItemDanhGia = ({ name, rating, content, image, ngay_tao }) => {
  const Star = ({ filled }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={filled ? "#facc15" : "none"}
      stroke="#facc15"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M10 2.5l2.39 4.84 5.34.78-3.87 3.77.91 5.3L10 14.77l-4.77 2.51.91-5.3L2.27 8.12l5.34-.78L10 2.5z"
      />
    </svg>
  );

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img
              src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/hinh-nen-ronaldo-2.jpg"
              alt="avatar"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h3 className="font-semibold">{name}</h3>
            <p className="text-xs text-gray-500">
              {ngay_tao ? new Date(ngay_tao).toLocaleDateString("vi-VN") : ""}
            </p>
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star key={i} filled={i < rating} />
          ))}
        </div>
      </div>

      {/* Nội dung */}
      <p className="mt-4">{content}</p>

      {/* Hình ảnh đánh giá */}
      {image && (
        <div className="mt-4">
          <img
            src={image}
            className="max-h-48 rounded-md border object-cover"
            alt="Ảnh đánh giá"
          />
        </div>
      )}
    </div>
  );
};
