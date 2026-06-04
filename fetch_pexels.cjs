const https = require('https');

https.get('https://www.pexels.com/search/manicure/', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /https:\/\/images\.pexels\.com\/photos\/\d+\/pexels-photo-\d+\.jpeg/g;
    const matches = data.match(regex);
    if(matches) {
      console.log([...new Set(matches)]);
    } else {
      console.log('No matches');
    }
  });
}).on('error', console.error);
