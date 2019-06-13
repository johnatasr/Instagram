const Post = require('../models/post.js');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

module.exports = {
    async index(req, res){
        const posts = await Post.find().sort('-createdAt');

        return res.json(posts);
    },
    async store(req, res){
        const { author, place, description , hashtags } = req.body;
        const { filename: image } = req.file;

        const [name] = image.split('.');
        const fileName = `${name}.jpg`;

        await sharp(req.file.path)
            .resize(500)                        //redimenciona a imagem e transfere para o diretorio resized
            .jpeg({ quality: 70 })
            .toFile(path.resolve(req.file.destination, 'resized', fileName))
        
        fs.unlinkSync(req.file.path);  // deleta o arquivo original e salva em resized
        
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image: fileName ,
        })

        req.io.emit('post_novo', post); //envia informacao em tempo real pela aplicacao
        
        return res.json(post);
    }
};   