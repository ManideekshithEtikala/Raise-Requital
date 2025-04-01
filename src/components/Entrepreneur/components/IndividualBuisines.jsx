import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaPhoneVolume } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { UserContext } from "../../Authentication/UserContext";
const IndividualBuisines = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const { model } = location.state || {};
  const navigate = useNavigate();
  const senderId = user?.sub;
  const receiverId = model?.userId;


  const Handletalk = () => {
    if (model?.calendlyLink) {
      const calendlyWindow = window.open(model.calendlyLink, "_blank"); // Open Calendly in a new tab
      calendlyWindow.onbeforeunload = () => {
        navigate(0); // Navigate back to the same page
      };
    } else {
      alert("Calendly link is not available."); // Fallback if the link is missing
    }
  };

  return model ? (
    <div className="container mx-auto px-4 py-8">
      {/* Business Details Section */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        {/* Title Section */}
        <h1 className="text-4xl font-bold text-gray-800 mb-6">{model.title}</h1>
        <p className="text-lg text-gray-600 mb-8">{model.description}</p>

        {/* Image Section */}
        {model.imageUrl && (
          <div className="mb-8">
            <img
              src={model.imageUrl}
              alt={model.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Business Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Funding Details */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Funding Details
            </h2>
            <p className="text-gray-600">
              <strong>Description:</strong>{" "}
              {model.fundingReq?.description || "N/A"}
            </p>
            <p className="text-gray-600">
              <strong>Request:</strong> {model.fundingReq?.request || "N/A"}
            </p>
            <p className="text-gray-600" maxLength={100}>
              <strong>Investor ROI:</strong>{" "}
              {model.fundingReq?.investorRoi || "N/A"}
            </p>
          </div>

          {/* Competitors */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Competitors
            </h2>
            <p className="text-gray-600">{model.competitors || "N/A"}</p>
          </div>

          {/* Products and Services */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Products and Services
            </h2>
            <p className="text-gray-600">{model.productAndServices || "N/A"}</p>
          </div>

          {/* Marketing and Sales Strategy */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Marketing and Sales Strategy
            </h2>
            <p className="text-gray-600">
              {model.marketingAndSalesStrategy || "N/A"}
            </p>
          </div>

          {/* Financial Plan */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Financial Plan
            </h2>
            <p className="text-gray-600">{model.financialPlan || "N/A"}</p>
          </div>

          {/* Team Details */}
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Team Details
            </h2>
            <p className="text-gray-600">{model.teamDetails || "N/A"}</p>
          </div>
        </div>

        {/* Action Buttons */}
        {senderId == receiverId ? (
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
              Check Messages
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
              Check Investments
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4 mt-8">
            <Link
              to={"/chat"}
              state={{
                senderId: senderId,
                receiverId: receiverId,
                role: "entrepreneur",
              }}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
            >
              Chat With Us
            </Link>
            <button className="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300">
              Invest
            </button>
          </div>
        )}
      </div>

      {/* Sticky Button */}
      <div className="fixed bottom-4 right-4">
        <div className="group relative flex items-center">
          {/* Button */}
          <button
            className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Contact With Us"
            onClick={Handletalk}
          >
            <FaPhoneVolume size={24} fill="white" />
          </button>

          {/* Tooltip */}
          <div className="absolute right-16 bg-blue-500 text-white text-sm font-medium rounded-md px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 whitespace-nowrap">
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
