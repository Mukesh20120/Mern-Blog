const asyncWrapper = require('../middleware/asyncWrapper');
const commentModel = require('../model/comment');
const createComment = asyncWrapper(async(req,res)=>{
    const {postId,userId,content: comment} = req.body;
    if(userId!==req.payload.id){
        throw new Error('User not allow to make comment.');
    }
   const newComment = await commentModel.create({postId,userId,comment});
   res.json({success: true,message: 'comment saved successfully', comment: newComment});
})

module.exports = {createComment};