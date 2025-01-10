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

server.get('/', (req, res) => {
    res.sendFile(indexFile)
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

server.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`)
})