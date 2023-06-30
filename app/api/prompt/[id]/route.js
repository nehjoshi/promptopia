import { ConnectToDb } from "@utils/database";
import Prompt from "@models/prompt";

//GET: READ
export const GET = async (req, { params }) => {

    try {
        await ConnectToDb();
        const prompt = await Prompt.findById(params.id).populate('creator');
        if (!prompt) return new Response("Prompt not found", { status: 404 });
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (e) {
        console.log("Something went wrong!");
        console.log(e);
        return new Response("Failed to fetch", { status: 500 });
    }
}
//Update existing prompt
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await ConnectToDb();
        const existingPrompt = await Prompt.findById(params.id).populate("creator");
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 });
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    }
    catch(e) {
        console.log(e);
        return new Response("Failed to update prompt", { status: 500 });
    }
}
//Delete a prompt
export const DELETE = async (req, {params}) => {
    try {
        await ConnectToDb();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Prompt deleted successfully", {status: 200});
    }
    catch(e){
        console.log(e);
        return new Response("Failed to delete prompt", { status: 500 });
    }
}