
import { useLocation, Link } from "react-router-dom";

const IndividualInvestor = () => {
  const location = useLocation();
  const investor = location.state?.investor;

  if (!investor) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 text-lg">No investor data available.</p>
        <Link
          to="/investors"
          className="text-blue-500 hover:underline font-semibold"
        >
          Go back to Investors
        </Link>
      </div>
    );
  }
const images=[
    {id:1,src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s"},
    {id:2,src:" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s"},   
    {id:3,src:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_mAcrV3vVhLq6HK4c1liqGV59qhOwXdEGw&s"},
    {id:4,src:""},
]
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold">{investor.fullName}</h1>
        <p className="text-gray-500">{investor.companyName}</p>
      </header>

      {/* Company Logo */}
      <div className="flex justify-center mb-6">
        <img
          src={investor.companyLogo || images[0].src}
          alt={`${investor.companyName} Logo`}
          className="w-32 h-32 object-cover rounded-full border"
        />
      </div>

      {/* Investor Details */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Investor ID:</span>
          <span className="text-gray-600">{investor._id}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Success Rate:</span>
          <span className="text-gray-600">
            {investor.successfulExits
              ? `${investor.successfulExits} successful exits`
              : "No exits yet"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Investment Strategy:</span>
          <span className="text-gray-600">
            {investor.investmentType || "Not specified"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Industries of Interest:</span>
          <span className="text-gray-600">
            {investor.industries || "Not specified"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Preferred Location:</span>
          <span className="text-gray-600">
            {investor.preferredLocation || "Not specified"}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-700">Total Investment:</span>
          <span className="text-gray-600">
            ${investor.totalInvestment || "0"}
          </span>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-6 text-center">
        <Link
          to="/investor"
          className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Back to Investors
        </Link>
      </div>
    </div>
  );
};

export default IndividualInvestor;