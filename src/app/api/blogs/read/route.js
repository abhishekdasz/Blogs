import { NextResponse } from "next/server";
import BlogsModel from "@/models/blogsModel";
import dbConnect from "@/utils/dbConn";

export async function GET(req, res) {
  try 
  {
    await dbConnect();
    const blogs = await BlogsModel.find({}).populate('userId');
    if(!blogs)
    {
        return NextResponse.json({ success:false, message:'No blogs found' });
    }
    return NextResponse.json({ status:200, success:true, message:'All blogs list', BlogsCount: blogs.length, blogs });
  } catch (e) {
    return NextResponse.json( { error: error.message }, { message: "Error while getting blogs!" }, { status: 500 });
  }
}