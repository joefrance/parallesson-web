/*

Link to the quarterly index:
https://sabbath-school-stage.adventech.io/api/v2/en/quarterlies/index.json

Link to a given quarterly lesson index:
https://sabbath-school-stage.adventech.io/api/v2/en/quarterlies/2024-03/index.json

Link for the weekly lesson:
https://sabbath-school-stage.adventech.io/api/v2/en/quarterlies/2024-03/lessons/11/index.json

Link for PNG
https://sabbath-school-stage.adventech.io/api/v2/images/global/2024-03/11/cover.png

Link for daily lesson:
https://sabbath-school-stage.adventech.io/api/v2/en/quarterlies/2024-03/lessons/11/days/07/read/index.json

In the "bible" the "verses" are access by the verse marker: e.g. Mark149
The markes are in <a verse="Mark149">Mark 1:49</a> entries in the "content" section
These markers use the English book names with a chapterVerse smashed together with the colon removed.
*/

const axios = require('axios');

async function getSabbathSchoolQuarterlyIndex(langCode) {
    try {
      // Build the full URL for the API request
      const url = `https://sabbath-school-stage.adventech.io/api/v2/${langCode}/quarterlies/index.json`;
  
      // Make the request using axios
      const response = await axios.get(url);
  
      // Return the data received from the API
      return response.data;
  
    } catch (error) {
      console.error('Error fetching the quarterly index:', error);
      throw error; // Rethrow to let the caller handle the error
    }
  }
  
async function getSabbathSchoolLessonIndex(langCode, dateInfo) {
  try {
    // Build the URL using the year and quarter from the dateInfo
    const { year, quarter, week } = dateInfo;
    const quarterlyId = `${year}-${quarter}`; // e.g., "2024-03"
    
    // Build the full URL for the API request
    const url = `https://sabbath-school-stage.adventech.io/api/v2/${langCode}/quarterlies/${quarterlyId}/lessons/${week}/index.json`;

    // Make the request using axios
    const response = await axios.get(url);

    // Return the data received from the API
    return response.data;

  } catch (error) {
    console.error('Error fetching the lesson index:', error);
    throw error; // Rethrow to let the caller handle the error
  }
}

async function getSabbathSchoolLesson(langCode, dateInfo, id) {
    try {
      // Build the URL using the year and quarter from the dateInfo
      const { year, quarter, week } = dateInfo;
      const quarterlyId = `${year}-${quarter}`; // e.g., "2024-03"
      
      // Build the full URL for the API request
      const url = `https://sabbath-school-stage.adventech.io/api/v2/${langCode}/quarterlies/${quarterlyId}/lessons/${week}/days/${id}/read/index.json`

      const response = await axios.get(url);
  
      // Return the data received from the API
      return response.data;
  
    } catch (error) {
      console.error('Error fetching the lesson:', error);
      throw error; // Rethrow to let the caller handle the error
    }
  }

module.exports = {
    getSabbathSchoolQuarterlyIndex,
    getSabbathSchoolLessonIndex,
    getSabbathSchoolLesson
}