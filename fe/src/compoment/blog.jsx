import React from "react";
import { useEffect, useState } from "react";
import { getBlogApi } from "../util/api";
import YouTube from "react-youtube";

const Blog = ({ id, title }) => {
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fecthBlog = async () => {
      const res = await getBlogApi();
      const data = res.data;
      const filter = [...data].filter((item) => item.id_sanpham === Number(id));
      setBlog(filter);
    };
    fecthBlog();
  }, [id]);
  return (
    <div className="w-full mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Đánh giá {title}
      </h1>

      {blog.length > 0 ? (
        <div className="gap-6">
          {blog.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden flex flex-col justify-center "
            >
              {item.hinh_anh && (
                <div className="w-full flex justify-center bg-gray-50">
                  <img
                    src={item.hinh_anh}
                    alt={item.tieu_de}
                    className="max-h-64 w-auto object-cover mx-auto"
                  />
                </div>
              )}

              <div className="p-5 flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.tieu_de}
                </h2>
                <p className="text-gray-600 leading-relaxed">{item.noi_dung}</p>

                <div className="w-full flex justify-center">
                  {item.video && (
                    <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden shadow">
                      <YouTube
                        videoId={item.video}
                        opts={{
                          width: "100%",
                          height: "100%",
                          playerVars: {
                            autoplay: 0,
                          },
                        }}
                        className="w-full h-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 italic">
          Chưa có bài viết cho sản phẩm này
        </p>
      )}
    </div>
  );
};

export default Blog;
