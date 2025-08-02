import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyDeL4VNEsyYacR1YX7zi8W-LxBKYdcFzMk");
let chat = null;
function initializeModel(ticket) {
  let ticketJSON = {"data":ticket}
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: `You are an AI helper for an event booking website called Eventory.Your primary role is to recommend price on the basis of tickets left and time left.You cannot keep the price more than the actual price of the ticket.Here the price is in Arbitrum.You can reduce the price if needed.the event is might get sold out quickly. Here is the data of available events ${JSON.stringify(ticketJSON)}.In this left is the amount of tickets that are still available.
    Give response in json format lik =>{reason:"",price:""}. Here reason is why you decided that price,give in brief`,
    generationConfig: {
      maxOutputTokens: 350,
    },
  });
  const chat = model.startChat();
  return chat;
}

export async function resolveQuery(ticket) {
  if (!chat) {
    chat = initializeModel(ticket);
  }
  const result = await chat.sendMessage("Please recommend");
  const response = await result.response;
  const texts = response.text();
  const cleanString = texts.replace(/```json|```/g, "").trim();
  return cleanString;
}