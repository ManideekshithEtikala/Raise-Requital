import express from 'express';
import Business from '../Models/mongoose.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try { 
    const business = await Business.find();
    res.status(200).json(business);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get('/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const business = await Business.find({ businessModel: category });
    res.status(200).json(business);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
);


// POST a new business
      
router.post('/', async (req, res) => {
  const newBusiness = new Business(req.body);
  try {
    const savedBusiness = await newBusiness.save();
    res.status(201).json(savedBusiness);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
export default router;