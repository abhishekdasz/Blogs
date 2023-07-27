import { NextResponse } from "next/server";
import BlogsModel from "@/models/blogsModel";
import dbConnect from "@/utils/dbConn";

export async function PUT(req, res) {
  try 
  {
    await dbConnect();
    const blogs = await BlogsModel.find({});
    if(!blogs)
    {
        return NextResponse.json({ success:false, message:'No blogs found' });
    }
    return NextResponse.json({ status:200, success:true, message:'All blogs list', BlogsCount: blogs.length });
  } catch (e) {
    return NextResponse.json( { error: error.message }, { message: "Error while getting blogs!" }, { status: 500 });
  }
}