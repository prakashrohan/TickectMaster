import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDeL4VNEsyYacR1YX7zi8W-LxBKYdcFzMk");
let chat = null;
function initializeModel(occasions) {
  let occasionsJSON = {"data":occasions}
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are an AI helper for an event booking website called Eventory.Your primary role is to suggest events from the available events list provided to you. Make sure to suggest a event most of the time, but you can choose not to suggest anything if appropriate. Your response should include an 'id' of the suggested event and a 'reply' with a text message. If you decide not to suggest any event, set 'id' to null and provide a suitable response in 'reply'.
    Format of reply -> {"id":111,"reply":"sdfsfsdf" }. It should be directly parseable by JSON. Don't put json word in response.
    Here is the data of available events ${JSON.stringify(occasionsJSON)}.
    Also while suggesting any product pick exactly one of the event from the data and give exactly id of that data.`,
    generationConfig: {
      maxOutputTokens: 350,
    },
  });
  const chat = model.startChat();
  return chat;
}

export async function resolveQuery(query,occasions) {
  if (!chat) {
    chat = initializeModel(occasions);
  }
  const result = await chat.sendMessage(query);
  const response = await result.response;
  const texts = response.text();
  const cleanString = texts.replace(/```json|```/g, "").trim();
  console.log(cleanString)
  return cleanString;
}
