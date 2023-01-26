import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get all Posts
router.route('/').get(async( req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({success: true, data: posts});
    } catch (error) {
        res.status(500).json({success: false, message: 'Fetching posts failed, please try again'})
    }
});

// Create a post
router.route('/').post(async( req, res) => {
    try {
        // this is what is being sent from the client side
        const { name, prompt, photo } = req.body;

        // getting an optimized cloudinary photo url
        const photoUrl = await cloudinary.uploader.upload(photo);

        // creates a new post in our databse
        const newPost = await Post.create({
            name, 
            prompt, 
            photo: photoUrl.url,
        })

        res.status(200).json({success: true, data: newPost});
    } catch (error) {
        res.status(500).json({success: false, message: 'Unable to create a post, please try again'})
    }
});

export default router;