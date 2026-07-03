import axios from "axios";
import * as cheerio from "cheerio";

const crawlWebsite = async (url) => {
  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    $("script").remove();
    $("style").remove();

    const content = $("body").text().replace(/\s+/g, " ").trim();

    return [
      {
        url,
        content,
      },
    ];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default crawlWebsite;