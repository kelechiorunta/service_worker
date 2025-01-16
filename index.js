import { Readable } from 'stream';
import { readFile } from 'fs/promises';
import express from 'express';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 7510;

const server = express();

// server.use(express.static(path.resolve(__dirname, 'imgs')))
server.use(express.static(path.resolve(__dirname)))


const indexFile = path.resolve(__dirname, 'index.html');
const aboutFile = path.resolve(__dirname, 'about.html');
const contactFile = path.resolve(__dirname, 'contact.html');
const imageFile = path.resolve(__dirname, 'images.html');

server.get('/', (req, res) => {
    res.sendFile(indexFile)
})

server.get('/about', (req, res) => {
    res.sendFile(aboutFile)
})

server.get('/contact', (req, res) => {
    res.sendFile(contactFile)
})

server.get('/images', (req, res) => {
    res.sendFile(imageFile)
})

server.get('/placeholderImg', async(req, res) => {
    const bufferedImage = await sharp(path.resolve(__dirname, './imgs/background.jpg')).resize(20).toBuffer();

    try{
        const readBuffer = (buffer) => {
            const readable = new Readable();
            readable.push(buffer);
            readable.push(null);
            return readable
        }
        const readStream = readBuffer(bufferedImage);

        readStream.on('error', () => {
            console.log("Failed to stream")
        })

        readStream.on('end', async() => {
            console.log("Stream successfully ended");
        })

        res.setHeader('Content-Type', 'image/jpeg');
        readStream.pipe(res);
        
    }
    catch(err){
        console.log("Streaming failed")
        return res.status(500).json({error: "Failed to stream effectively"})
    }
})

server.get('/fullImg', async(req, res) => {

    try{
        res.setHeader('Content-Type', 'image/jpeg');
        const fullImagePath = await readFile(path.resolve(__dirname, './imgs/background.jpg'))
        const reducedImg = await sharp(fullImagePath).resize(60).toBuffer()
        res.send(reducedImg)
        console.log("Reduced Image sent successfully")
    }
    catch(err){
        console.log("Failed to load Picture")
        return res.status(500).json({error: "Failed to stream effectively"})
    }
})

const images = ['./imgs/next1.jpg', './imgs/next2.jpg', './imgs/next3.jpg', './imgs/next4.jpg']

server.get('/smallImg/:picId', async(req, res) => {

    const id = req.params.picId;

    try{
        res.setHeader('Content-Type', 'image/jpeg');
        const fullImagePath = await readFile(path.resolve(__dirname, images[id]))
        const reducedImg = await sharp(fullImagePath).resize(60).toBuffer()
        res.send(reducedImg)
        console.log("Small Images buffered successfully")
    }
    catch(err){
        console.log("Failed to load Picture")
        return res.status(500).json({error: "Failed to buffer effectively"})
    }
})

const details = [
    {title:"Monstera Deliciosa", 
     content:`Monstera deliciosa, often called the
      "Swiss Cheese Plant," is a tropical evergreen vine 
      or shrub native to Central America. Its large, glossy, 
      and uniquely perforated leaves make it a popular houseplant.
      The plant thrives in warm, humid conditions and indirect sunlight.
      Monstera deliciosa is known for its aerial roots, which help it climb trees in its natural habitat.
      It can also produce fruit resembling a green ear of corn, with a sweet pineapple-like flavor when ripe.
      This plant symbolizes growth and prosperity in many cultures.`
    },
    {title:"Alocasia Amazonica",
    content:`Alocasia amazonica, commonly known as the
     "Amazon Elephant's Ear," is a stunning hybrid plant with 
     large, arrow-shaped leaves marked by prominent white veins 
     on a dark green surface. Native to tropical Asia, it thrives 
     in warm, humid environments with bright, indirect light. 
     This plant requires well-draining soil to prevent root rot. 
     Although not from the Amazon, its striking foliage is 
     reminiscent of the lush rainforest aesthetics. 
     Alocasia amazonica adds an exotic flair to gardens 
     and indoor spaces but should be handled with care, 
     as all parts of the plant are toxic if ingested.`
    },
    {title:"Dracaena Fragrans",
    content:`Dracaena fragrans, or "Corn Plant,"
     is a hardy, low-maintenance plant with sword-shaped 
     leaves resembling corn foliage. It is native to tropical
      Africa and can grow up to 15 feet tall in its natural 
      habitat, though it remains smaller indoors. The plant 
      occasionally blooms, producing small, fragrant white 
      flowers in ideal conditions. Dracaena fragrans is 
      well-suited for indoor spaces due to its air-purifying 
      properties and ability to thrive in low light. It's a 
      popular choice for offices and homes, symbolizing 
      resilience and good fortune.`
    },
]

server.get('/details/:index', (req, res) => {
    const id = req.params.index
    const readText = (buffer) => {
        const readable = new Readable();
        readable.push(buffer);
        readable.push(null);
        return readable
    }

    const readTextStream = readText(Buffer.from(details[id].toString()))

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(details[id])
    // readTextStream.pipe(res);
})

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})