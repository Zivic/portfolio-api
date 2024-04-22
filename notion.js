const  parseNotionBlocks = require ( "./helper");
const { Client } = require ( "@notionhq/client");

const NotionAPICall = async () => {
  const response = await parseNotionBlocks()
  return response;
};

module.exports =  NotionAPICall;
