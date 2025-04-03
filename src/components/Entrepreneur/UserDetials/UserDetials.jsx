import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../Authentication/UserContext.jsx"; // Adjust the path as necessary

const UserDetials = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [businessModel, setBusinessModel] = useState('');
  const [description, setDescription] = useState('');
  const [fundingReqDescription, setFundingReqDescription] = useState('');
  const [fundingReqRequest, setFundingReqRequest] = useState(0);
  const [investorRoi, setInvestorRoi] = useState(0);
  const [competitors, setCompetitors] = useState('');
  const [productAndServices, setProductAndServices] = useState('');
  const [marketingAndSalesStrategy, setMarketingAndSalesStrategy] = useState('');
  const [financialPlan, setFinancialPlan] = useState('');
  const [team, setTeam] = useState('');
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [calendlyLink, setCalendlyLink] = useState('');
  const defaultImage="https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
  const [imageUrl, setImageUrl] = useState(defaultImage);

  // Handle Image Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file); // Generate Temporary URL
      setImageUrl(url);
    }else{
      setImageUrl(defaultImage)
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Handling post method in axios of the userData or EnterpreneurData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Convert request to a number and add a dollar sign
    const formattedRequest = parseFloat(fundingReqRequest); // Ensure it's a number
    if (isNaN(formattedRequest) || formattedRequest <= 0) {
      alert("Please enter a valid funding request amount.");
      setLoading(false);
      return;
    }
  
    // Convert ROI to a number and ensure it's valid
    const formattedRoi = parseFloat(investorRoi); // Ensure it's a number
    if (isNaN(formattedRoi) || formattedRoi < 0 || formattedRoi > 100) {
      alert("Please enter a valid ROI percentage (0-100).");
      setLoading(false);
      return;
    }
  
    const data = {
      userId: user?.sub,
      title: title,
      imageUrl: imageUrl,
      businessModel: businessModel,
      description: description,
      fundingReq: {
        description: fundingReqDescription,
        request: formattedRequest, // Send as a number
        investorRoi: formattedRoi, // Send as a number
      },
      competitors: competitors,
      productAndServices: productAndServices,
      marketingAndSalesStrategy: marketingAndSalesStrategy,
      financialPlan: financialPlan,
      calendlyLink: calendlyLink,
      teamDetails: team,
    };
  
    try {
      const response = await axios.post("http://localhost:4000/business", data);
      console.log("Data posted successfully:", response.data);
      navigate("/Entrepreneur");
      setLoading(false);
    } catch (error) {
      console.error("Error posting data:", error);
      setLoading(false);
    }
  };
  const formatCurrency = (value) => {
    if (!value) return "";
    return `$${parseFloat(value).toLocaleString("en-US")}`;
  };
  
  const formatPercentage = (value) => {
    if (!value) return "";
    return `${parseFloat(value)}%`;
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <section className="w-full max-w-4xl p-8 bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col items-center justify-center">
            <a
              href="#"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img
                className="w-8 h-8 mr-2 rounded-lg"
                src="https://www.creativefabrica.com/wp-content/uploads/2019/03/Monogram-RR-Logo-Design-by-Greenlines-Studios.jpg"
                alt="logo"
              />
              RaiseRequital
            </a>
            <div className="w-full">
              <div className="p-6 space-y-6">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Enter necessary details
                </h1>
                <div className="space-y-6" >
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="col-span-2">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Business Title"
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    {/* Image URL */}
                    <div className="col-span-2">
                      <label
                        htmlFor="imageUrl"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        ImageUrl
                      </label>
                      <input
                        type="file"
                        name="imageUrl"
                        id="imageUrl"
                        placeholder="Select Image File"
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </div>
                    {/* Business Model */}
                    <div className="col-span-2">
                      <label
                        htmlFor="businessModel"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Business Model
                      </label>
                      <select
                        name="businessModel"
                        id="businessModel"
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setBusinessModel(e.target.value)}
                        required
                      >
                        <option disabled defaultValue="" selected>
                          Select your business model
                        </option>
                        <option value="jewelry">Jewelry</option>
                        <option value="clothing">Clothing</option>
                        <option value="fashion">Fashion</option>
                        <option value="accessories">Accessories</option>
                        <option value="techProducts">Tech Products</option>
                        <option value="sports">Sports</option>
                        <option value="electronics">Electronics</option>
                        <option value="">None</option>
                      </select>
                    </div>
                    {/* Description */}
                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        placeholder="Describe your business"
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        rows="4"
                        onChange={(e) => setDescription(e.target.value)}
                        required=""
                      ></textarea>
                    </div>
                    {/* Funding Request */}
                    <div className="col-span-2">
                      <label
                        htmlFor="fundingReqDescription"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        FundingReqDescription
                      </label>
                      <textarea
                        name="fundingReqDescription"
                        id="fundingReqDescription"
                        placeholder="Describe your funding request"
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        rows="4"
                        onChange={(e) => setFundingReqDescription(e.target.value)}
                        required=""
                      ></textarea>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="fundingReqRequest"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        FundingReqRequest
                      </label>
                      <input
  type="text"
  name="fundingReqRequest"
  id="fundingReqRequest"
  placeholder="Request your funding amount in dollars"
  value={fundingReqRequest ? formatCurrency(fundingReqRequest) : ""}
  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  required=""
  onChange={(e) => setFundingReqRequest(e.target.value.replace(/[^0-9.]/g, ""))}
/>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="investorRoi"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        InvestorRoi
                      </label>
                      <input
  type="text"
  name="investorRoi"
  id="investorRoi"
  placeholder="Investor ROI please select between 0-100"
  value={investorRoi ? formatPercentage(investorRoi) : ""}
  className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
  required=""
  onChange={(e) => setInvestorRoi(e.target.value.replace(/[^0-9.]/g, ""))}
/>
                    </div>
                    {/* Competitors */}
                    <div className="col-span-2">
                      <label
                        htmlFor="competitors"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Competitors
                      </label>
                      <textarea
                        name="competitors"
                        id="competitors"
                        placeholder="List your competitors"
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setCompetitors(e.target.value)}
                        rows="4"
                        required=""
                      ></textarea>
                    </div>
                    {/* Team */}
                    <div className="col-span-2">
                      <label
                        htmlFor="team"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        TeamDetials
                      </label>
                      <textarea
                        name="team"
                        id="team"
                        placeholder="Enter Team Details and No of members"
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setTeam(e.target.value)}
                        rows="4"
                        required=""
                      ></textarea>
                    </div>
                    {/* Product and Services */}
                    <div className="col-span-2">
                      <label
                        htmlFor="productAndServices"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        ProductAndServices
                      </label>
                      <textarea
                        name="productAndServices"
                        id="productAndServices"
                        placeholder="Describe your products and services"
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        rows="4"
                        onChange={(e) => setProductAndServices(e.target.value)}
                        required=""
                      ></textarea>
                    </div>
                    {/* Marketing and Sales Strategy */}
                    <div className="col-span-2">
                      <label
                        htmlFor="marketingAndSalesStrategy"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        MarketingAndSalesStrategy
                      </label>
                      <textarea
                        name="marketingAndSalesStrategy"
                        id="marketingAndSalesStrategy"
                        placeholder="Describe your marketing and sales strategy"
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        rows="4"
                        onChange={(e) => setMarketingAndSalesStrategy(e.target.value)}
                        required=""
                      ></textarea>
                    </div>
                    {/* Financial Plan */}
                    <div className="col-span-2">
                      <label
                        htmlFor="financialPlan"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        FinancialPlan
                      </label>
                      <textarea
                        name="financialPlan"
                        id="financialPlan"
                        placeholder="Describe your financial plan"
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        rows="4"
                        required=""
                        onChange={(e) => setFinancialPlan(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="calendlyLink"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Calendly Link
                      </label>
                      <input
                        type="text"
                        name="calendlyLink"
                        id="calendlyLink"
                        placeholder="Give your calendly link to schedule a meeting"
                        className="bg-gray-50 border outline-none border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        rows="4"
                        required=""
                        onChange={(e) => setCalendlyLink(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div>
                    <a href="https://youtu.be/OyRuIG_DYZ4?si=nm3_xxlDa53qfW8t" className="hover:underline hover:text-blue-600 text-gray-600" target="_blank">Click this link to know how to create calendly link</a>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-gray-700 hover:bg-gray-900"
                    >
                      Submit
                    </button>
                  </div>
                </div>
                {loading && (
            
<div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

          )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UserDetials;