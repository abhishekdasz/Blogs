import { NextResponse } from "next/server";
import BlogsModel from "@/models/blogsModel";
import dbConnect from "@/utils/dbConn";

export async function PUT(req, {params} ) {
    try 
    {
      await dbConnect();
      const { id } = params;
      const { title, description } = await req.json();
      const blog = await BlogsModel.findByIdAndUpdate(id, {title, description} );
      return NextResponse.json({ status:200, success:true, message:'Blog Updated'});

    } catch (error) {
      return NextResponse.json( { error: error.message }, { message: "Error while getting blog!" }, { status: 500 });
    }
  }



//   if(!blog)
//   {
//       return NextResponse.json({status:400, success:false, message:'Blog not found with this id' });
//   }