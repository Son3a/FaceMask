const face_mask = require("../controllers/face_mask.controller");

module.exports = require("express").Router()
    .get('/', face_mask.get);