// import the function from the previous web scraping file here as such
import webscraperFunction from "./scraper-site1.service.js";

interface OrganizedData {
  title: string;
  articleTitle: string;
  articleText: string;
}

const OrganizedDataFunction = async (): Promise<OrganizedData> => {
  // impelment try and catch case here as such
  const retrieveScrapedData = await webscraperFunction();
  if (!retrieveScrapedData) {
    throw new Error("Error calling the function");
  }
  return {
    title: retrieveScrapedData.title,
    articleTitle: retrieveScrapedData.articleTitle,
    articleText: retrieveScrapedData.text,
  };
};

export default OrganizedDataFunction;
