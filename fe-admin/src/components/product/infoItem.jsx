const InfoItem = ({ label, value, highlight }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p
      className={`text-lg font-semibold ${
        highlight ? "text-red-600" : "text-gray-800"
      }`}
    >
      {value}
    </p>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white rounded-xl shadow p-6">
    <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>
    {children}
  </div>
);

export { InfoItem, Section };
