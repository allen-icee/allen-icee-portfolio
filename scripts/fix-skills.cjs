const fs = require('fs');
let data = fs.readFileSync('src/data/portfolioData.ts', 'utf8');
data = data.replace(/category:\s*'([^']+)'/g, (match, cat) => {
  let id = cat.toLowerCase().replace(/\s+/g, '-');
  return 'categoryId: \'' + id + '\'';
});
fs.writeFileSync('src/data/portfolioData.ts', data);
console.log('Updated mockSkills to use categoryId');
