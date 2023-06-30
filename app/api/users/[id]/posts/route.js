import Prompt from "@models/prompt";
import { ConnectToDb } from "@utils/database";
export const GET = async (req, { params }) => {

    try {
        await ConnectToDb();
        const prompts = await Prompt.find({
            creator: params.id
        }).populate("creator");
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (e) {
        console.log("Something went wrong!");
        console.log(e);
        return new Response("Failed to fetch", { status: 500 });
    }
}