import connectMongoDB from "@/libs/mongodb";
import { NextResponse } from "next/server";
import Topic from "@/models/topic";

//this is the update method
//using a dynamic route to update a topic hence in a separate folder and file
export async function PUT (request, {params}) {
    const {id} = params;
    const {newTitle: title, newDescription: description } = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, {title, description});
    return NextResponse.json({ message: "Topic updated successfully" }, { status: 200 });
}

//get single topic by ID
export async function GET (request, {params}) {
    const {id} = params;
    await connectMongoDB();
    const topic = await Topic.findOne({_id: id});
    return NextResponse.json ({topic}, {status : 200});
}