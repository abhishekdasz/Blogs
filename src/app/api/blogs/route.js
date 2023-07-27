
import { NextResponse } from "next/server";
import BlogsModel from "@/models/blogsModel";
import dbConnect from "@/utils/dbConn";

export async function POST(req, res) 
{
    try
    {
        await dbConnect();
        const body = await req.json();
        const { title, description } = body;

        // const newBlogs = new BlogsModel({title, description})
        // await BlogsModel.create(newBlogs);

        const newBlog = new BlogsModel({title, description});
        await newBlog.save();
        
        return NextResponse.json({ status:201, message:'Blogs created' });           
    }
    catch(error)
    {
        return NextResponse.json( { error: error.message }, { message: "Error while creating blogs!" }, { status: 500 });
    }
}
