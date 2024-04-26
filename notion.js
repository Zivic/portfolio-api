const  parseNotionBlocks = require ( "./helper");
const { Client } = require ( "@notionhq/client");

const databaseId = process.env.NOTION_DATABASE_ID;
const apiKey = process.env.NOTION_API_KEY

const notion = new Client({ auth: apiKey });

const NotionAPICall = async () => {
  // const response = await parseNotionBlocks()
    // const blockId = "1a26c1dfc5e54caa9461972c021c619f";
    
    const response = await notion.databases.query({ database_id: databaseId });
    // const response = await notion.blocks.children.list({
    //   block_id: blockId,
    //   page_size: 50,
    // })
    // return response;
  
  return response;
};

module.exports =  NotionAPICall;
