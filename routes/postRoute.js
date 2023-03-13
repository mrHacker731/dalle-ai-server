const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const Post = require("../mongodb/models/Post");
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//create post
router.post("/", async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    const photo_url = await cloudinary.uploader.upload(photo);

    console.log("photo_url", photo_url);
    
    const newPost = await Post.create({
      name,
      prompt,
      photo:photo_url.url
    });
    res.status(201).json({ success: true, data: newPost });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message});
  }
});

//get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    return res.status(200).json({ success: true, data: posts });
  } catch (e) {
    res.status(500).json({ success: false, message: e.message });
  }
});

module.exports = router;
