import { NextResponse } from "next/server";
import BlogsModel from "@/models/blogsModel";
import dbConnect from "@/utils/dbConn";

export async function GET(req, {params} ) {
  try 
  {
    await dbConnect();
    const { id } = params;
    const blog = await BlogsModel.findById(id);
    if(!blog)
    {
        return NextResponse.json({status:400, success:false, message:'Blog not found with this id' });
    }
    return NextResponse.json({ status:200, success:true, message:'Blog found', blog });
  } catch (error) {
    return NextResponse.json( { error: error.message }, { message: "Error while getting blog!" }, { status: 500 });
  }
}