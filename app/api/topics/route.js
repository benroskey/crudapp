import connectMongoDB from "@/libs/mongodb";
import Topic from "@/models/topic";
import { NextResponse } from "next/server";


//a method to post a new topic to mongoDB
export async function POST (request) {
    const {title, description} = await request.json();
    await connectMongoDB();
    await Topic.create({title, description});
    return NextResponse.json({ message: "Topic created successfully"},  { status: 201 });
}

//a method to get all topics from MongoDB
export async function GET () {
    await connectMongoDB();
    const topics = await Topic.find();
    return NextResponse.json({ topics });
}

//a method to delete a topic from MongoDB
//sending the ID as a source parameter will delete the topic with that ID
//stored in 'const id'
export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Topic.findByIdAndDelete(id);
    return NextResponse.json({ message: "Topic deleted successfully" }, { status: 200});
}