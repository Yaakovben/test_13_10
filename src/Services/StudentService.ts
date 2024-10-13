import e from "express"
import { StudentModel } from "../Models/StudentModel"
import { TeacherModel } from "../Models/TeacherModel"
import { ObjectId } from "mongoose"
import bcrypt from "bcrypt"
import { NewUserDto } from "../Types/Interfaces/dto/reqDto"



const createStudentService = async (user: NewUserDto) => {
    try {
        console.log(user)
        const{user_name, password, email , class_name} = user
        if (!user_name || !password || !email || !class_name) {
            throw new Error("All fields are required");
        }
        const classExists = await TeacherModel.findOne({class_name}).exec();
        if (!classExists) {
            throw new Error("class name not found");
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const class_ref = (classExists._id as ObjectId)
        const dbUser = new StudentModel({user_name, password: hashedPassword,email, class_ref})
        
        await dbUser.save()
        console.log("student added")
        return dbUser      
    } catch (error) {
        console.log(error)
        throw error
    }
} 







// const createPostService = async (userId: string, post: postDto): Promise<Ipost> => {
//     try {
//         const user = await UserModel.findById(userId)
//         if (!user) {
//             throw new Error("user not found")
//         }

//         const { title, content } = post
//         if (!title || !content) {
//             throw new Error("all fields are required")
//         }
        
//         const newPost = new PostModel({ title, content })

//         newPost.author = user._id as ObjectId
//         await newPost.save()

//         user.posts.push(newPost._id as ObjectId)
//         await user.save()

//         return newPost

//     } catch (error) {
//         throw error
//     }
// }


// const getPostsService = async (userId: string): Promise<any[]> => {
//     try {
//         const user = await UserModel.findById(userId)
//         if (!user) {
//             throw new Error("user not found")
//         }
//         // return user.populate("posts")
//         // const posts = PostModel.find({author: user._id})
//         const posts = PostModel.find()
//         .select('title content createdAt -_id')
//         .populate({
//             path: "author",
//             select: "user_name email -_id",
//           }).populate({
//             path: "comments.author",
//             select: "user_name",
//           });
//         return posts
//     } catch (error) {
//         throw error
//     }
// }


// const deletePostService = async (userId: string, postId: string): Promise<Ipost> => {
//     try {
//         const user : Iuser | null  = await UserModel.findById(userId)
//         if (!user) {
//             throw new Error("user not found")
//         }
//         console.log(postId)
//         const post = await PostModel.findById(postId)
//         if (!post) {
//             throw new Error("post not found")
//         }
//         if (post.author.toString() !== (user._id as ObjectId).toString()) {
//             throw new Error("you are not the author of this post")
//         }
//         //delete post
//         await PostModel.findByIdAndDelete(postId) 
//         // delete post referenced from user
//         const result = await user.updateOne(
//             { posts: postId },
//             { $pull: { posts: postId } }
//           );
//         if (result.modifiedCount === 0) {
//             throw new Error("post not deleted")
//         }
//         return post
//     } catch (error) {
//         throw error
//     }
// }

// const updatePostService = async (userId: string, postId: string, post: postDto): Promise<Ipost> => {
//     try {
//         const user = await UserModel.findById(userId)
//         if (!user) {
//             throw new Error("user not found")
//         }
//         const postToUpdate = await PostModel.findById(postId)
//         if (!postToUpdate) {
//             throw new Error("post not found")
//         }
//         if (postToUpdate.author.toString() !== (user._id as ObjectId).toString()) {
//             throw new Error("you are not the author of this post")
//         }
//         const updatedPost = await PostModel.findByIdAndUpdate(postId, post, { new: true })
//         if (!updatedPost) {
//             throw new Error("post not found")
//         }
//         return updatedPost
//     } catch (error) {
//         throw error
//     }
// }

export { 
    createStudentService,
 }