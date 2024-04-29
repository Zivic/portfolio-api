const { Client } = require("@notionhq/client");

const databaseId = process.env.NOTION_DATABASE_ID;
const apiKey = process.env.NOTION_API_KEY;

const notion = new Client({ auth: apiKey });

const getIdFromUrl = (url) => {
  return url.split("-").slice(-1)[0];
};

const getNotionChildrenBlocks = async (blockId) => {
  const response = await notion.blocks.children.list({
    block_id: blockId,
    page_size: 50,
  });
  return response.results;
};

const NotionAPICall = async () => {
  const notionResponse = await notion.databases.query({
    database_id: databaseId,
  });
  let notionDatabase;
  console.log("UNFILTERED: ", notionResponse.results[0].url);
  notionDatabase = await Promise.all(
    notionResponse.results.map(async (row) => {
      let projectProperties = {};

      //Handle pageContent
      if (row.hasOwnProperty("url"))
        projectProperties["pageContent"] = await getNotionChildrenBlocks(
          getIdFromUrl(row.url)
        );

      //Handle other attributes
      for (let property in row.properties) {
        if (row.properties[property].hasOwnProperty("rich_text")) {
          const propValue = row.properties[property];
          projectProperties[`${property}`] =
            propValue.rich_text.length > 0
              ? propValue.rich_text[0].plain_text
              : "";
        } else if (row.properties[property].hasOwnProperty("multi_select")) {
          let techStack = new Array();
          const propValue = row.properties[property];
          if (propValue.multi_select.length > 0) {
            techStack = propValue.multi_select.map((technology) => {
              return { name: technology.name };
            });
          }
          projectProperties[`${property}`] = techStack;
        }
      }
      console.log("PROJECTPROPERTIES", projectProperties);

      return projectProperties;
    })
  );
  return notionDatabase;
};

module.exports = NotionAPICall;
