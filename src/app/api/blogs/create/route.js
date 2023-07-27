import { NextResponse } from "next/server";
import BlogsModel from "@/models/blogsModel";
import dbConnect from "@/utils/dbConn";
import UserInfo from "@/models/userInfo";

export async function POST(req, res) 
{
    try
    {
        await dbConnect();
        const body = await req.json();
        const { title, description, userId } = body;

        // const newBlogs = new BlogsModel({title, description})
        // await BlogsModel.create(newBlogs);

        if(!title || !description || !userId)
        {
            return NextResponse.json({ success:false, message:'Please provide all the fields' });           
        }

        const newBlog = new BlogsModel({title, description, userId});
        await newBlog.save();

        // Update the user's document with the new blogId
        await UserInfo.findByIdAndUpdate(userId, { $push: { blogsInfo: newBlog._id } });
        
        return NextResponse.json({ status:201, message:'Blogs created' });           
    }
    catch(error)
    {
        return NextResponse.json( { error: error.message }, { message: "Error while creating blogs!" }, { status: 500 });
    }
}
