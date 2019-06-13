const PostController = require('./controllers/PostController');
const LikeController = require('./controllers/LikeController');
const uploadConfig = require('./config/upload');
const multer = require('multer');
const express = require('express');

const routes = new express.Router();
const upload = multer(uploadConfig);



routes.get('/list', PostController.index);

routes.post('/posts', upload.single('image'),PostController.store);
routes.post('/posts/:id/like', LikeController.store);

module.exports = routes;