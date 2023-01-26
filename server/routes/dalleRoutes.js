import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';


dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);


router.route('/').get((req, res) => {
    res.status(200).json({message: 'Hello from DALL-E'});
});

// real api request from front end to back end with dall-e
router.route('/').post(async (req, res) => {
    try {
        // prompt will come from our front end side from our search bar
        const { prompt } = req.body;

        // generate the image
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
        });
        
        // returning the image with photo as the key in a json object
        const image = aiResponse.data.data[0].b64_json;
        res.status(200).json({ photo: image});

    } catch (error) {
        console.log(error);
        res.status(500).send(error?.response.data.error.message || "Something went wrong");
    }
});


export default router;