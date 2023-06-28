import { ConnectToDb } from "@utils/database";
import Prompt from "@models/prompt";
export const GET = async (req, res) => {
    
    try {
        await ConnectToDb();
        const prompts = await Prompt.find({}).populate("creator");
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (e) {
        console.log("Something went wrong!");
        console.log(e);
        return new Response("Failed to fetch", { status: 500 });
    }
}