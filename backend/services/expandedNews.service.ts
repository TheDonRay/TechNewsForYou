// in this file it imports the organized data and then sends it to the AI to expand on it then we can later call it to an SMTP server.
import OpenAI from 'openai';
const client = new OpenAI({
    apiKey: process.env.API_KEY
});

//import the organized function here as such
import OrganizedDataFunction from './organizedData.service.js';

// handle case for the client key
if (!process.env.API_KEY) {
    throw new Error("No API key provided");
}

const expandOnNews = async () => {
    try {
        const callOrganizedData = await OrganizedDataFunction();
        // handle case call
        if (!callOrganizedData) {
            throw new Error('No data fetched from OrganizedDataFunction');
        }
        // send the data to the openai api here as such
        const expandedNews = await client.chat.completions.create({
            model: "gpt-4",
            messages: [
                {
                    role: 'system',
                    content: 'You take in the latest news and expand on the news giving a short but detailed summary that someone technical and none technical can understand about the latest news regarding tech that is passed in'
                },
                {
                    role: 'user',
                    content: JSON.stringify(callOrganizedData),
                }
            ]
        });
        return expandedNews;
    } catch (error) {
        throw new Error('Error sending data to API call');
    }
};

export default expandOnNews; 