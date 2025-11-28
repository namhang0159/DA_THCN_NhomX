import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { checkStatusApi } from "./util/api";

const Result = () => {
  const [params] = useSearchParams();
  const [status, setStatus] = useState(2);

  useEffect(() => {
    const orderId = params.get("orderId");

    if (!orderId) {
      setStatus("fail");
      return;
    }
    const checkStatus = async () => {
      const res = await checkStatusApi(orderId);
      const data = res.data;
      console.log(data);
      setStatus(data.resultCode);
    };
    checkStatus();
  }, [params]);
  if (status === 2) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="p-6 bg-white rounded-2xl shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">
            Đang xử lý kết quả thanh toán...
          </p>
        </div>
      </div>
    );
  }
  if (status === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="p-6 bg-white rounded-2xl shadow-lg text-center border border-green-300">
          <p className="text-4xl mb-4">✅</p>
          <p className="text-green-700 text-xl font-semibold">
            Thanh toán thành công!
          </p>
        </div>
      </div>
    );
  }
  if (status === 1) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="p-6 bg-white rounded-2xl shadow-lg text-center border border-red-300">
          <p className="text-4xl mb-4">❌</p>
          <p className="text-red-700 text-xl font-semibold">
            Thanh toán thất bại!
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <div className="p-6 bg-white rounded-2xl shadow-lg text-center border border-yellow-300">
        <p className="text-4xl mb-4">⚠️</p>
        <p className="text-yellow-700 text-xl font-semibold">
          Có lỗi xảy ra, vui lòng thử lại.
        </p>
      </div>
    </div>
  );
};

export default Result;
