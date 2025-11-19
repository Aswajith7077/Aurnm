import ollama from "ollama";

const summarizeHtmlContent = async (content:string) => {
  const prompt = `
Summarize the following content into this structure:

Description: (about 10 lines describing the integration)
Pricing Plans:
Fixes and Problems:
Others?:

Content:
"""${content}"""
`;

  const message = { role: "user", content: prompt };
  const response = await ollama.chat({
    model: "llama3.1:8b",
    messages: [message],
    stream: false,
  });
  return response.message.content;
};

export default summarizeHtmlContent;
