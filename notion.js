const parseNotionBlocks = require("./helper");
const { Client } = require("@notionhq/client");

const databaseId = process.env.NOTION_DATABASE_ID;
const apiKey = process.env.NOTION_API_KEY;

const notion = new Client({ auth: apiKey });

const NotionAPICall = async () => {
  // const response = await parseNotionBlocks()

  //TODO: clean this up
  const response = await notion.databases.query({ database_id: databaseId });
  let test;
  console.log(response);
  test = response.results.map((project) => {
    let projectProperties = new Array();
    for (let property in project.properties) {
      if (project.properties[property].hasOwnProperty("rich_text")) {
        projectProperties.push(
          project.properties[property].rich_text[0].plain_text
        );
      }
    }
    console.log("PROJECTPROPERTIES", projectProperties);

    return projectProperties;
  });
  return test;
};

module.exports = NotionAPICall;
// const response = await notion.blocks.children.list({
//   block_id: blockId,
//   page_size: 50,
// })
// return response;
