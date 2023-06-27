import { ConnectToDb } from "@utils/database";
import Prompt from "@models/prompt";
export const POST = async (req, res) => {
    const { userId, prompt, tag } = await req.json();
    try {
        await ConnectToDb();
        const newPrompt = new Prompt({
            creator: userId, tag, prompt
        });
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (e) {
        console.log("Something went wrong!");
        console.log(e);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}