const express = require("express");
const router = express.Router();

router.get("/", async(req, res) => {
    res.status(200).send({
        data: [],
        message: "OK",
        success: true
    });
})

module.exports = router;