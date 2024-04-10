const { Client } = require ( "@notionhq/client");

const notion = new Client({ auth: "secret_ES5TyPYdBHCd8ZVX22epOe0jrRE6Iu2254wuciMagiR" });

const NotionAPICall = async () => {
  const blockId = "1a26c1dfc5e54caa9461972c021c619f";
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  })
    return response;

};

module.exports =  NotionAPICall;
