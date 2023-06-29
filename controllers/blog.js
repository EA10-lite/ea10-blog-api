const { Blog } = require("../models/blog");
const { User } = require("../models/user");
const { upload_files } = require("../utils/cloudinary");
const _ = require("lodash");

const create_blog = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(401).send({ data: null, message: "Access Denied!", success: false});

    let uploaded_files;
    if(req.body.files.length > 0) {
        uploaded_files = await upload_files(req.body.files);
    }
    const blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        media: uploaded_files?.map(img => ({ url: img.secure_url, public_id: img.public_id })) || [],
        created_by: req.user._id
    });
    await blog.save();

    res.status(201).send({
        data: blog,
        message: "Your blog has been created!",
        sucess: true
    });
};

const get_blogs = async (req, res) => {
    const blogs = await Blog.find()
        .sort("created_at")
        .populate('created_by', 'avatar username _id')
        .populate('comments.comment_by', 'avatar username _id comment')
        .populate('likes.like_by', 'avatar username _id')
        .limit(50)

    res.status(200).send({
        data: blogs,
        message: "Blogs data result",
        success: true,
    });
};

const get_single_blog = async (req, res) => {
    const blog = await Blog.findById(req.params.id)
        .populate('created_by', 'avatar username _id')
        .populate('comments.comment_by', 'avatar username _id comment')
        .populate('likes.like_by', 'avatar username _id');

    if(!blog) return res.status(404).send({ data: null, message: "Blog not found!", success: true });

    res.status(200).send({
        data: blog,
        message: "Blog details result",
        success: true 
    });
};

const comment_blog = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(401).send({ data: null, message: "Access Denied!", success: false });

    const blog = await Blog.findById(req.params.id);
        .populate("comments.comment_by", "username comment")
    if(!blog) return res.status(404).send({ data: null, message: "The resource does not exist!", success: false });

    blog.comments.push({ created_at: Date.now() , comment: req.body.comment, comment_by: req.user._id });
    await blog.save();

    res.status(201).send({
        data: _.pick(blog, ["title", 'comments']),
        message: "Your comment has been added",
        success: true
    });
};

const like_blog = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(!user) return res.status(401).send({ data: null, message: "Access Denied!", success: false });

    const blog = await Blog.findById(req.body.blog_id);
    if(!blog) return res.status(404).send({ data: null, message: "Blog not found!", success: false });

    // if the user already likes the post, then stop request and return no content
    const is_liked_blog = blog.likes.find(b => user._id.equals(b.like_by));
    if(is_liked_blog) return res.status(204).send();

    blog.likes.push({ like_by: req.user._id });
    await post.save();

    res.status(200).send({
        data: blog,
        message: "you like this blog.",
        success: true
    });
};

const delete_blog = async (req, res) => {
    const blog = await Blog.findOneAndDelete({ _id: req.params.id, created_by: req.user._id });
    if(!blog) return res.status(404).send({ data: null, message: "This resource does not exist!.", success: false });

    res.status(204).send({
        data: _.pick(blog, ["title"]),
        message: "Blog deleted successfully!",
        success: true 
    });
};

const update_blog = async (req, res) => {
    const blog = await Blog.findOneAndUpdate({ _id: req.params.id, created_by: req.user._id }, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            media: req.body.media
        }
    }, { new: true });
    if(!blog) return res.status(404).send({ data: null, message: "This resource does not exist!.", success: false });

    res.status(204).send({
        data: _.pick(blog, ["title"]),
        message: "Blog updated successfully!",
        success: true 
    });
};

module.exports = {
    create_blog,
    comment_blog,
    delete_blog,
    get_blogs,
    get_single_blog,
    like_blog,
    update_blog,
}