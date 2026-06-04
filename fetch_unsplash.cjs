const https = require('https');

https.get('https://unsplash.com/s/photos/nail-art', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    'Accept': 'text/html'
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const regex = /(images\.unsplash\.com\/photo-[a-zA-Z0-9-]+)/g;
    const matches = data.match(regex);
    if(matches) {
      console.log([...new Set(matches)]);
    } else {
      console.log('No matches');
    }
  });
}).on('error', console.error);
