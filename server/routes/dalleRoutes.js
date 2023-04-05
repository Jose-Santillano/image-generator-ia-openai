import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

//We create a configuration for the API.
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, 
});

//We send this configuration to OpenAI.
const openai = new OpenAIApi(configuration);

//We show a message using the API.
router.route('/').get((req, res) => {
    res.send("Hello from DALL-E");
});

router.route('/').post(async (req, res) => {
    try {
        //We extract the promt of the request to send to the OpenAI.
        const { prompt } = req.body;
        console.log("try");
        console.log(prompt);
        //When we have an promt, we send this line of text to OpenAI and we created an image with the next parameters.
        const aiResponse = await openai.createImage({
            prompt,
            n: 1,
            size: '1024x1024',
            response_format: 'b64_json'
        });

        //We save the image changing the format to b64_json.
        const image = aiResponse.data.data[0].b64_json;

        //When we have the image, we response to the front-end with status 200, and we send the image to the client.
        res.status(200).json({ photo: image });

    } catch (error) {
        
        //If we have an error with the request we says to the client the error.
        console.log(error);
        res.status(500).send(error?.response.data.error.message);
    }
});

export default router;