function splitVersesByPattern(text, patternRegex = /<sup\b[^>]*>\s*\d+\s*<\/sup>/g) {  
  // Use the patternRegex to split the verseText
  return verseText.split(patternRegex);
}

// Helper function to parse attributes from the opening tag
function parseAttributes(tag) {
  const attrPattern = /(\w+)=["']([^"']+)["']/g;
  const attributes = [];
  let match;
  while ((match = attrPattern.exec(tag)) !== null) {
    attributes.push({ name: match[1], value: match[2] }); // e.g., [{ name: 'class', value: 'versenum' }]
  }
  return attributes; // Return the attributes array
}

function findOccurrencesOfTagName(text, tagName) {
  // Create a dynamic regex pattern using the provided tagName
  const patternRegex = new RegExp(`<${tagName}\\b[^>]*>.*?<\\/${tagName}>`, 'g');
  
  // Use matchAll to find all occurrences of the dynamic tag pattern
  const matches = [...text.matchAll(patternRegex)];

  // Map the matches to return an object with outerHtml, innerHtml, and attributes
  return matches.map(match => {
    const outerHtml = match[0];
    
    // Extract the inner content between the opening and closing tag
    const innerHtmlMatch = outerHtml.replace(new RegExp(`<${tagName}\\b[^>]*>|<\/${tagName}>`, 'g'), '');
    
    // Extract the opening tag and parse the attributes
    const openingTagMatch = outerHtml.match(new RegExp(`<${tagName}\\b[^>]*>`));
    const attributes = openingTagMatch ? parseAttributes(openingTagMatch[0]) : [];

    return {
      outerHtml: outerHtml,  // The full match including the tagName tag verbatim from the text
      innerHtml: innerHtmlMatch, // The content inside the tagName tag
      attributes: attributes  // Parsed attributes as an array of { name, value } objects
    };
  });
}

function matchOpenAndCloseTagAddingPrefixAndOrSuffix(text, tagName, prefix = '', suffix = '') {
  // Create a dynamic regex pattern using the provided tagName
  const patternRegex = new RegExp(`(<${tagName}\\b[^>]*>)(.*?)(<\/${tagName}>)`, 'g');
  
  // Use replace to modify the content inside the tag
  return text.replace(patternRegex, (match, openingTag, content, closingTag) => {
    // Add prefix before the opening tag and suffix after the closing tag
    const modifiedTag = `${prefix}${openingTag}${content}${closingTag}${suffix}`;
    return modifiedTag;
  });
}

module.exports = {
  splitVersesByPattern,
  parseAttributes,
  findOccurrencesOfTagName,
  matchOpenAndCloseTagAddingPrefixAndOrSuffix
}