// Run: node test-api.js
// Tests that the service account + CX are valid
const { GoogleAuth } = require('google-auth-library');
const { CX } = require('./config');

async function main() {
  const auth = new GoogleAuth({
    keyFile: './lec-search-ab6330fa5b59.json',
    scopes: ['https://www.googleapis.com/auth/cse'],
  });
  const client = await auth.getClient();
  const token = await client.getAccessToken();

  const url = `https://www.googleapis.com/customsearch/v1?cx=${CX}&q=test`;
  console.log('Fetching...');
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token.token}` },
  });
  console.log('HTTP status:', res.status);
  const text = await res.text();
  console.log('Response (first 500 chars):', text.slice(0, 500));
}

main().catch(console.error);
