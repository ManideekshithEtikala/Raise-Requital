import {  useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export const InvestorDetails = () => {
  const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [linkedIn, setLinkedIn] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [industries, setIndustries] = useState("");
    const [investmentRange, setInvestmentRange] = useState("");
    const [investmenttype, setInvestmenttype] = useState("");
    const [preferredLocation, setPreferredLocation] = useState("");
    const [startUp, setStartUp] = useState(0);
    const [TotalInvestment, setTotalInvestment] = useState(0);
    const [sucessFullExits, setSucessFullExits] = useState(0);
    const [ndaAccepted, setNdaAccepted] = useState(false);

    const handleSubmit =async(e) => {
        e.preventDefault();
    
        // Validation
        if (!fullName || !investmentRange || !ndaAccepted) {
          alert("Please fill in all required fields and accept the NDA.");
          return;
        }
    
        const formData = {
          fullName,
          linkedIn,
          companyName,
          industries,
          investmentRange,
          investmenttype,
          preferredLocation,
          startUp,
          TotalInvestment,
          sucessFullExits,
        };
         try{
            const response = await axios.post("http://localhost:4000/investor", formData)
            console.log(response.data)
            navigate('/Investor')

         }catch(error){
            console.log(error)
         }
      };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-5 text-center">Investor Registration</h2>
      <Link to={'/Investor'} className="flex justify-end  text-blue-500 hover:text-blue-600 font-bold py-1 px-4 rounded">Explore Investors</Link>
      <form  className="space-y-6" onSubmit={handleSubmit}>

        {/* Personal Details */}
        <div className="my-4">
          <label className="block font-semibold">Full Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your full name"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">LinkedIn Profile</label>
            <input
              type="url"
              name="linkedIn"
              value={linkedIn}
              onChange={(e)=>setLinkedIn(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>
          <div>
            <label className="block font-semibold">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={companyName}
              onChange={(e)=>setCompanyName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter your company name"
            />
          </div>
        </div>

        {/* Investment Preferences */}
        <h3 className="text-xl font-semibold mt-5">Investment Preferences</h3>

        <div>
          <label className="block font-semibold">Industries of Interest</label>
          <input
            type="text"
            name="industries"
            value={industries}
            onChange={(e)=>setIndustries(e.target.value)}
            placeholder="e.g., Tech, Healthcare"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Investment Range ($) <span className="text-red-500">*</span></label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
              <input
                type="number"
                name="investmentRange"
                value={investmentRange}
                onChange={(e) => setInvestmentRange(e.target.value)}
                className="w-full pl-8 p-2 border rounded-md"
                placeholder="Enter amount"
                required
              />
            </div>
          </div>
          <div>
            <label className="block font-semibold">Preferred Investment Type</label>
            <select
              name="investmentType"
              value={investmenttype}
              onChange={(e) => setInvestmenttype(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select</option>
              <option value="Equity">Equity</option>
              <option value="Debt">Debt</option>
              <option value="Convertible Notes">Convertible Notes</option>
            </select>
          </div>
        </div>
        <div>
  <label className="block font-semibold">Preferred Location</label>
  <input
    type="text"
    name="preferredLocation"
    value={preferredLocation}
    onChange={(e) => setPreferredLocation(e.target.value)}
    placeholder="e.g., New York, California, Global"
    className="w-full p-2 border rounded-md"
  />
</div>
        {/* Investment History */}
        <h3 className="text-xl font-semibold mt-5">Investment History</h3>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold">Startups Invested</label>
            <input
              type="number"
              name="startupsInvested"
              value={startUp}
              onChange={(e) => setStartUp(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter number"
            />
          </div>
          <div>
            <label className="block font-semibold">Total Investment ($)</label>
            <input
              type="number"
              name="TotalInvestment"
              value={TotalInvestment}
              onChange={(e) => setTotalInvestment(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter amount"
            />
          </div>
          <div>
            <label className="block font-semibold">Successful Exits</label>
            <input
              type="number"
              name="successfulExits"
              value={sucessFullExits}
              onChange={(e) => setSucessFullExits(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter number"
            />
          </div>
        </div>

        {/* NDA Agreement */}
        <div className="flex items-center mt-4">
          <input
            type="checkbox"
            name="ndaAccepted"
            checked={ndaAccepted}
            onChange={(e) => setNdaAccepted(e.target.checked)}
            className="mr-2"
            required
          />
          <label className="text-sm">
            I accept the <span className="font-semibold">Non-Disclosure Agreement (NDA)</span>.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Submit Investor Details
        </button>
      </form>
    </div>
  );
};

export default InvestorDetails;