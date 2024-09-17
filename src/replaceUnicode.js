const fs = require('fs');

function unicodeToAscii(jsonString) {
    return jsonString.replace(/\\u([\dA-Fa-f]{4})/g, function(match, group) {
        return String.fromCharCode(parseInt(group, 16));
    });
}

const jsonEn = fs.readFileSync('src/data/en/2024-11/en.json', 'utf8');
const jsonFr = fs.readFileSync('src/data/en/2024-11/fr.json', 'utf8');

const stitcher = [
  {
    row: 1,
    l1: '0',
    l2: '0'
  },
  {
    row: 2,
    l1: '1',
    l2: '1'
  },
  {
    row: 3,
    l1: '0',
    l2: '0'
  },
  {
    row: 4,
    l1: '0',
    l2: '0'
  },
  {
    row: 5,
    l1: '0',
    l2: '0'
  },
  {
    row: 6,
    l1: '0',
    l2: '0'
  },
  {
    row: 7,
    l1: '0',
    l2: '0'
  },
]

stitcher.forEach(({row, l1, l2}) => {
  console.log(row)
});

//console.log(JSON.parse(unicodeToAscii(jsonEn)).content.split('\n')[1]);
//console.log(JSON.parse(unicodeToAscii(jsonFr)).content.split('\n')[1]);
