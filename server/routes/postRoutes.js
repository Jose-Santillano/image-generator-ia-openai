import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Get all posts.

router.route('/').get(async (req, res) => {
    try {
        
        //We get all post of the database.
        const post = await Post.find({});

        //We response success if we have all post and we send them to the front-end.
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

//Create a post.

router.route('/').post(async (req, res) => {

    try {
        //We get the information of the request.
        const { name, prompt, photo } = req.body;

        //We upload the image to Cloudinary.
        const photoUrl = await cloudinary.uploader.upload(photo);

        //We create a new post in MongoDB and send the data for the schema.
        const newPost = await Post.create({
            name, 
            prompt,
            photo: photoUrl.url,
        });

        //We response success with this request.
        res.status(201).json({ success: true, data: newPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

export default router;