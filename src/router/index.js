import express from "express";
import * as inventory from "../controllers/inventory.js";
const router = express.Router();

const dsa = () => {};

router.post("/inventory", inventory.addItem);
// router.get("/inventory", inventory.getItems);
router.get("/inventory", inventory.getItem);
// router.get("/inventory/:id", dsa);
router.put("/inventory-discount", dsa);

export default router;
