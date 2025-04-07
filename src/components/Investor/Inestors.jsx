import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Inestors = () => {
  const [investors, setInvestors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/investor")
      .then((res) => {
        setInvestors(res?.data);
        console.log(res?.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Our Investors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {investors.map((investor) => (
          <Link to={`/investor/${investor._id}`} state={{ investor }} key={investor._id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
          >
            {/* Company Logo */}
            <div className="flex justify-center mb-4">
              <img
                src={investor.companyLogo || "https://via.placeholder.com/100"} // Fallback if no logo
                alt={`${investor.companyName} Logo`}
                className="w-20 h-20 object-cover rounded-full"
              />
            </div>

            {/* Investor Details */}
            <h2 className="text-xl font-semibold text-center">
              {investor.fullName}
            </h2>
            <p className="text-gray-500 text-center mb-2">
              {investor.companyName}
            </p>

            {/* Success Rate */}
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Success Rate:</span>{" "}
              {investor.successfulExits
                ? `${investor.successfulExits} successful exits`
                : "No exits yet"}
            </p>

            {/* Investment Strategy */}
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Investment Strategy:</span>{" "}
              {investor.investmentType || "Not specified"}
            </p>

            {/* Investor ID */}
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Investor ID:</span>{" "}
              {investor._id}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Inestors;