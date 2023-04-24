const Post = require("../models/postModel");
const User = require("../models/userModel");

//Add post
const addPost = async (req, res) => {
    try {
        const post = new Post({
            userid: req.body.userid,
            description: req.body.description,
            date: req.body.date,
            photos: req.images,
            // likes: req.body.likes,
            // comments: req.body.comments
        });

        const userData = await User.findOne({ _id: req.body.userid });

        if (userData._id == '') {
            res.status(400).send({ success: false, msg: "User not found..!" });
        }
        else {
            const post_data = await post.save();
            res.status(200).send({ success: true, data: post_data });
        }

    } catch (error) {
        res.status(400).send(error.message);
        console.log("Error in add post : " + error.message);
    }
}


//get all post
const getPosts = async (req, res) => {
    try {
        const post_data = await Post.find({});
        res.status(200).send({ success: true, data: post_data });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

//delete post
const deletePost = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Post.deleteOne({ _id: id });
        res.status(200).send({ success: true, msg: 'Post Deleted successfully' });
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

//edit post
const editPost = async (req, res) => {
    try {
        if (req.images.length != '') {
            var id = req.body.id;
            var likes = req.body.likes;
            var comments = req.body.comments;
            var photos = req.images

            const post_data = await Post.findByIdAndUpdate({ _id: id }, { $set: { likes: likes, comments: comments, photos: photos } }, { new: true });
            res.status(200).send({ success: true, msg: 'Post Updated', data: post_data });
        }
        else {
            var id = req.body.id;
            var likes = req.body.likes;
            var comments = req.body.comments;

            const post_data = await Post.findByIdAndUpdate({ _id: id }, { $set: { likes: likes, comments: comments } }, { new: true });
            res.status(200).send({ success: true, msg: 'Post Updated', data: post_data });
        }
    } catch (error) {
        res.status(400).send({ success: false, msg: error.message });
    }
}

module.exports = {
    addPost,
    getPosts,
    deletePost,
    editPost
}