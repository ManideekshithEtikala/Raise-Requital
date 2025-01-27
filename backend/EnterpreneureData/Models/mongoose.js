import mongoose, { mongo } from 'mongoose';
const url ="mongodb+srv://ManiDeekshithEtikala:Manideekshith%4011@raiserequitalcluster.vjbzt.mongodb.net/EnterpreneurData?retryWrites=true&w=majority&appName=RaiseRequitalCluster";
  
// Define schemas"

const EnterpreneurData = mongoose.createConnection(url)
const fundingReqSchema = new mongoose.Schema({
  description: { type: String, required: true },
  request: { type: String, required: true },
  investorRoi: { type: String, required: true }
});

const businessSchema = new mongoose.Schema({
  userId:{type:String,required:true},
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  businessModel: { type: String, required: true },
  description: { type: String, required: true },
  fundingReq: { type: fundingReqSchema, required: true },
  competitors: { type: String, required: true },
  productAndServices: { type: String, required: true },
  marketingAndSalesStrategy: { type: String, required: true },
  financialPlan: { type: String, required: true },
  teamDetails: { type: String, required: true }
});

const Business = EnterpreneurData.model('Business', businessSchema);

export default Business;