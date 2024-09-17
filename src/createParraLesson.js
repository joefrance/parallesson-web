const dateUtils = require('./lib/date-utils');
const htmlUtils = require('./lib/html-utils');
const sabbathSchoolUtils = require('./lib/sabbath-school-lesson.utils')

// Example usage
async function main() {
    // Simulate getting dateInfo from getDateInfo function
    const date = new Date('2024-09-15T12:00:00Z');
    const dateInfo = dateUtils.getDateInfo(date); // { year: '2024', quarter: '03', week: '03', day: '01' }
    console.log('Date Info:', dateInfo);
  
    try {
        const langCodes = (['en', 'fr']).sort(); // Language code for the lesson
        var lessonDataArray = []
        var lessonIndexDataArray = []

        for(let lx = 0; lx < langCodes.length; lx++) {

            const langCode = langCodes[lx];

            const quarterlyIndexData = await sabbathSchoolUtils.getSabbathSchoolQuarterlyIndex('ru');

            const lessonIndexData = await sabbathSchoolUtils.getSabbathSchoolLessonIndex(langCode, dateInfo);
            lessonIndexDataArray.push(lessonIndexData);

            //console.log('Lesson Data:', lessonData);
            for(let i = 0; i <= lessonIndexData.days.length; i++) {
                const { title, date, id} = lessonIndexData.days[i];
                const localDate = dateUtils.getLocalDate(date)
                const dayNumber = localDate.getDate();



                const dayName = dateUtils.getDayNameFromDateInternational(langCode, localDate);
                const monthName = dateUtils.getMonthNameFromDateInternational(langCode, localDate);
                console.log(`${id} ${dayName}, ${monthName} ${dayNumber.toString().padStart(2, '0')} ${title}`);
                const lessonData = await sabbathSchoolUtils.getSabbathSchoolLesson(langCode, dateInfo, id);
                lessonDataArray.push(lessonData);

                // const lessonData = await sabbathSchoolUtils.getSabbathSchoolLesson(langCode, dateInfo, id);
                // console.log('Lesson Data:', lessonData.bible[0].verses['Mark15']);
                // const splits = htmlUtils.matchOpenAndCloseTagAddingPrefixAndOrSuffix(lessonData.bible[0].verses['Mark15'], 'sup', '\n').split('\n')
                // console.log('Splits:', splits);

            }    
        }
    } catch (error) {
      console.error('Failed to fetch lesson data:', error);
    }
  }

  main()