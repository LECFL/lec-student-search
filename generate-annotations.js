// Run: node generate-annotations.js
// Generates annotations-upload.xml with real sequential timestamps
const fs = require('fs');
const path = require('path');

const base = BigInt('0x00065345fd4a9a8c');

const sites = [
  ['*.sefaria.org/*', 'sefaria.org'],
  ['*.hebrewbooks.org/*', 'hebrewbooks.org'],
  ['*.mechon-mamre.org/*', 'mechon-mamre.org'],
  ['*.jewishvirtuallibrary.org/*', 'jewishvirtuallibrary.org'],
  ['*.myjewishlearning.com/*', 'myjewishlearning.com'],
  ['*.ou.org/*', 'ou.org'],
  ['*.torah.org/*', 'torah.org'],
  ['*.aish.com/*', 'aish.com'],
  ['*.torahanytime.com/*', 'torahanytime.com'],
  ['*.yutorah.org/*', 'yutorah.org'],
  ['*.chabad.org/*', 'chabad.org'],
  ['*.kehot.com/*', 'kehot.com'],
  ['*.meaningfullife.com/*', 'meaningfullife.com'],
  ['*.sichos-in-english.org/*', 'sichos-in-english.org'],
  ['*.tanyanet.com/*', 'tanyanet.com'],
  ['*.halachipedia.com/*', 'halachipedia.com'],
  ['*.dafyomi.co.il/*', 'dafyomi.co.il'],
  ['*.morfix.co.il/*', 'morfix.co.il'],
  ['*.pealim.com/*', 'pealim.com'],
  ['*.yadvashem.org/*', 'yadvashem.org'],
  ['*.ushmm.org/*', 'ushmm.org'],
  ['*.khanacademy.org/*', 'khanacademy.org'],
  ['*.wolframalpha.com/*', 'wolframalpha.com'],
  ['*.desmos.com/*', 'desmos.com'],
  ['*.mathway.com/*', 'mathway.com'],
  ['*.ck12.org/*', 'ck12.org'],
  ['*.mathsisfun.com/*', 'mathsisfun.com'],
  ['*.nationalgeographic.com/*', 'nationalgeographic.com'],
  ['*.livescience.com/*', 'livescience.com'],
  ['*.howstuffworks.com/*', 'howstuffworks.com'],
  ['*.pbs.org/*', 'pbs.org'],
  ['*.pbslearningmedia.org/*', 'pbslearningmedia.org'],
  ['*.history.com/*', 'history.com'],
  ['*.si.edu/*', 'si.edu'],
  ['*.loc.gov/*', 'loc.gov'],
  ['*.wikipedia.org/*', 'wikipedia.org'],
  ['*.britannica.com/*', 'britannica.com'],
  ['*.merriam-webster.com/*', 'merriam-webster.com'],
  ['www.scholastic.com/*', 'scholastic.com'],
  ['*.sparknotes.com/*', 'sparknotes.com'],
  ['*.gutenberg.org/*', 'gutenberg.org'],
  ['*.newsela.com/*', 'newsela.com'],
  ['*.ducksters.com/*', 'ducksters.com'],
  ['*.edu/*', '*.edu'],
  ['*.gov/*', '*.gov'],
];

const lines = ['<?xml version="1.0" encoding="UTF-8"?><Annotations>'];
sites.forEach(([about, url], i) => {
  const ts = '0x' + (base + BigInt(i)).toString(16).padStart(16, '0');
  lines.push(`  <Annotation about="${about}" timestamp="${ts}" score="1.0">`);
  lines.push(`    <Label name="_include_"/>`);
  lines.push(`    <AdditionalData attribute="original_url" value="${url}"/>`);
  lines.push(`  </Annotation>`);
});
lines.push('</Annotations>');

const out = lines.join('\n');
const dest = path.join(process.env.USERPROFILE, 'Desktop', 'annotations-upload.xml');
fs.writeFileSync(dest, out, { encoding: 'utf8' });
console.log(`Written ${sites.length} entries to ${dest}`);
