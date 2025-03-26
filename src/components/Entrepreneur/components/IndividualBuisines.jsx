import { useLocation } from "react-router-dom";
import { FaPhoneVolume } from "react-icons/fa6";
const IndividualBuisines = () => {
  const location = useLocation();
  const { model } = location.state || {}; 
  return model ? (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Title Section */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{model.title}</h1>
        <p className="text-gray-600 mb-6">{model.description}</p>

        {/* Image Section */}
        {model.imageUrl && (
          <div className="mb-6">
            <img
              src={model.imageUrl}
              alt={model.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Business Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Funding Details */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Funding Details</h2>
            <p className="text-gray-600">
              <strong>Description:</strong> {model.fundingReq.description || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Request:</strong> {model.fundingReq.request || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Investor ROI:</strong> {model.fundingReq.investorRoi
 || "N/A"}
            </p>
          </div>

          {/* Competitors */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Competitors</h2>
            <p className="text-gray-600">{model.competitors || "N/A"}</p>
          </div>

          {/* Products and Services */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Products and Services</h2>
            <p className="text-gray-600">{model.productAndServices || "N/A"}</p>
          </div>

          {/* Marketing and Sales Strategy */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Marketing and Sales Strategy</h2>
            <p className="text-gray-600">{model.marketingAndSalesStrategy || "N/A"}</p>
          </div>
          {/* financialPlan */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Financial Plan</h2>
            <p className="text-gray-600">{model.financialPlan || "N/A"}</p>
          </div>
          {/* teamDetails */}
          <div className="bg-gray-50 p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">teamDetails</h2>
            <p className="text-gray-600">{model.teamDetails || "N/A"}</p>
          </div>
          {/* contact us */}
          <div className="bg-gray-700 p-1 rounded-lg shadow  flex items-center justify-center hover:bg-gray-800">
                <button className="text-xl font-semibold text-white mb-2 ">Contact With Us </button>
          </div>
          <div className="bg-blue-500 hover:bg-blue-700 p-1 rounded-lg shadow flex items-center justify-center">
                <button className="text-xl font-semibold text-white mb-2">Invest</button>
          </div>
        </div>
      </div>
      {/* Sticky button */}
      <div className="fixed bottom-4 right-4">
  <div className="group relative flex items-center">
    {/* Button */}
    <button
      className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-gray-500"
      aria-label="Contact With Us"
    >
        <FaPhoneVolume size={24} fill="white"/>
    </button>

    {/* Tooltip */}
    <div className="absolute right-16 bg-blue-500 text-white text-sm font-medium rounded-md px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap border border-blue-800">
                Let&apos;s Have a Talk
    </div>
  </div>
</div>
    </div>
  ) : (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800">No model found</h1>
    </div>
  );
};

export default IndividualBuisines;