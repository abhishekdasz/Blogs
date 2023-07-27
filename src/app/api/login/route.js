import UserInfo from "@/models/userInfo";
import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConn";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'

export async function POST(req, res) {
  try 
  {
    const body = await req.json();
    await dbConnect();

    const { email, password } = body;

    // Check if the user exists
    const userInfo = await UserInfo.findOne({ email });

    if (!userInfo) 
    {
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 400 }
      );
    }

    // Check if the password is correct
    const validPassword = await bcryptjs.compare(password, userInfo.password);
    if (!validPassword) 
    {
        return NextResponse.json(
            { message: "Invalid Password" },
            { status: 400 }
        );
    } 
    // create token data
    const tokenData = {
        id: userInfo._id,
        username: userInfo.username,
        email: userInfo.email,
    }
    // create token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {expiresIn: '1d'});

    const response = NextResponse.json({
        message:"Login successful",
        success: true,
        status: 200
    })

    response.cookies.set("token", token, {
        httpOnly: true,
    })

    return response;
    // return NextResponse.json(
    //     { message: "User signin successfully" },
    //     { status: 200 } // Use 200 for a successful login
    // );


  } catch (e) {
    return NextResponse.json(
        { error: error.message },
        { message: "Error while login!" },
        { status: 500 }
    );
  }
}
