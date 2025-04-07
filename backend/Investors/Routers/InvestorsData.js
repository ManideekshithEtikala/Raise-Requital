
import express from "express";
import Investor from "../Models/InvestorMongoose.js";
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const investors = await Investor.find();
        res.status(200).json(investors);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    const newInvestor = new Investor(req.body);
    try {
        const savedInvestor = await newInvestor.save();
        res.status(201).json(savedInvestor);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
export default router;