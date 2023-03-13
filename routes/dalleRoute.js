const router = require('express').Router();
const {Configuration,OpenAIApi} = require('openai');
require('dotenv').config();

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

router.get('/',(req,res)=>{
    
    res.send('Hello World from OpenAI');

});
router.post('/',async(req,res)=>{
    try {
        const {prompt} = req.body;
        
        const response = await openai.createImage({
            prompt,
            n:1,
            size:"1024x1024",
            response_format:'b64_json'
        });
        const image = response.data.data[0].b64_json;
        res.status(200).json({photo:image});
    } catch (e) {
        console.log(e);
        return res.send(500,e.message);
    }
});

module.exports = router;