import mongoose from "mongoose";
const url ="mongodb+srv://ManiDeekshithEtikala:Manideekshith%4011@raiserequitalcluster.vjbzt.mongodb.net/InvestorData?retryWrites=true&w=majority&appName=RaiseRequitalCluster"
const InvestorData = mongoose.createConnection(url)
const investorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  linkedIn: { type: String, required: true },
  companyName: { type: String, required: true },
  industries: { type: String, required: true },
  investmentRange:  { type: Number, required: true },
  investmenttype:{type:String,required:true},
  preferredLocation: { type: String, required: true },
  startUp:{type:Number,default:0},
  TotalInvestment:{type:Number,default:0},
  sucessFullExits:{type:Number,default:0},
  
});
const Investor = InvestorData.model("Investor", investorSchema);
export default Investor;