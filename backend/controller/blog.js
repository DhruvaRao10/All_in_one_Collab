const Blog = require("../model/blog");
const mongoose = require("mongoose");
// const upload = multer({ storage });
const cloudinary = require("cloudinary").v2;
// also require cloudinary config keys
cloudinary.config({
  cloud_name: "vasant",
  api_key: "215577926555359",
  api_secret: "s36gSpDOQKHXbcfgyLsH32Q5VhU",
});

const uploadFileToCloudinary = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: folder,
    });
    return result.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading file to Cloudinary");
  }
};

const createBlogPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const { imagefile, videofile } = req.files;

    let imageLink;
    let videoLink;

    try {
      imageLink = await uploadFileToCloudinary(imagefile, "vasant");
      console.log("Image Response :", imageLink);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Something went wrong in uploading image file",
      });
    }

    try {
      videoLink = await uploadFileToCloudinary(videofile, "vasant");
      console.log("Video Response :", videoLink);
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        success: false,
        message: "Something went wrong in uploading video file",
      });
    }

    const newPost = new Post({
      title,
      body,
      imageLink,
      videoLink,
    });

    await newPost.save();

    res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getBlogPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Blog.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Route to delete a specific blog post by ID
const deleteBlogPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedPost = await Blog.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createBlogPost,
  deleteBlogPostById,
  getBlogPostById,
  uploadFileToCloudinary,
};
