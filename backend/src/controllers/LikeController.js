const Post = require('../models/post.js');

module.exports = {
   
    async store(req, res){
        
        const post = await Post.findById(req.params.id);
        post.likes += 1;
        post.save();
        
        req.io.emit('like', post);
        
        return res.json(post);
    }
};   