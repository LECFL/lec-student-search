// Run: node generate-annotations.js
// Generates annotations-upload.xml with real sequential timestamps and refinement labels
const fs = require('fs');
const path = require('path');

// Base set above highest existing timestamp in this engine (0x0004b86d19cdf7b6)
const base = BigInt('0x0006534721500000');
const includeLabel = '_cse_s3n9yitemci';

const sites = [
  ['sefaria.org/*',              'sefaria.org',              ['judaic_texts']],
  ['hebrewbooks.org/*',          'hebrewbooks.org',          ['judaic_texts']],
  ['mechon-mamre.org/*',         'mechon-mamre.org',         ['judaic_texts']],
  ['jewishvirtuallibrary.org/*', 'jewishvirtuallibrary.org', ['judaic_texts', 'history']],
  ['myjewishlearning.com/*',     'myjewishlearning.com',     ['judaic_texts']],
  ['ou.org/*',                   'ou.org',                   ['judaic_texts']],
  ['torah.org/*',                'torah.org',                ['judaic_texts']],
  ['aish.com/*',                 'aish.com',                 ['judaic_texts']],
  ['torahanytime.com/*',         'torahanytime.com',         ['judaic_texts', 'chassidus']],
  ['yutorah.org/*',              'yutorah.org',              ['judaic_texts']],
  ['chabad.org/*',               'chabad.org',               ['chassidus', 'judaic_texts']],
  ['kehot.com/*',                'kehot.com',                ['chassidus']],
  ['meaningfullife.com/*',       'meaningfullife.com',       ['chassidus']],
  ['sichos-in-english.org/*',    'sichos-in-english.org',    ['chassidus']],
  ['tanyanet.com/*',             'tanyanet.com',             ['chassidus']],
  ['halachipedia.com/*',         'halachipedia.com',         ['judaic_texts']],
  ['dafyomi.co.il/*',            'dafyomi.co.il',            ['judaic_texts']],
  ['morfix.co.il/*',             'morfix.co.il',             ['judaic_texts']],
  ['pealim.com/*',               'pealim.com',               ['judaic_texts']],
  ['yadvashem.org/*',            'yadvashem.org',            ['history', 'judaic_texts']],
  ['ushmm.org/*',                'ushmm.org',                ['history']],
  ['khanacademy.org/*',          'khanacademy.org',          ['math', 'science']],
  ['wolframalpha.com/*',         'wolframalpha.com',         ['math']],
  ['desmos.com/*',               'desmos.com',               ['math']],
  ['mathway.com/*',              'mathway.com',              ['math']],
  ['ck12.org/*',                 'ck12.org',                 ['math', 'science']],
  ['mathsisfun.com/*',           'mathsisfun.com',           ['math']],
  ['nationalgeographic.com/*',   'nationalgeographic.com',   ['science', 'history']],
  ['livescience.com/*',          'livescience.com',          ['science']],
  ['howstuffworks.com/*',        'howstuffworks.com',        ['science']],
  ['pbs.org/*',                  'pbs.org',                  ['science']],
  ['pbslearningmedia.org/*',     'pbslearningmedia.org',     ['science']],
  ['history.com/*',              'history.com',              ['history']],
  ['si.edu/*',                   'si.edu',                   ['history']],
  ['loc.gov/*',                  'loc.gov',                  ['history']],
  ['wikipedia.org/*',            'wikipedia.org',            ['reference']],
  ['britannica.com/*',           'britannica.com',           ['reference']],
  ['merriam-webster.com/*',      'merriam-webster.com',      ['reference']],
  ['www.scholastic.com/*',       'scholastic.com',           []],
  ['sparknotes.com/*',           'sparknotes.com',           ['reference']],
  ['gutenberg.org/*',            'gutenberg.org',            ['reference']],
  ['newsela.com/*',              'newsela.com',              ['reference']],
  ['ducksters.com/*',            'ducksters.com',            ['reference']],
];

const lines = ['<?xml version="1.0" encoding="UTF-8"?><Annotations>'];
sites.forEach(([about, url, labels], i) => {
  const ts = '0x' + (base + BigInt(i)).toString(16).padStart(16, '0');
  lines.push(`  <Annotation about="${about}" timestamp="${ts}" score="1.0">`);
  lines.push(`    <Label name="${includeLabel}"/>`);
  labels.forEach(l => lines.push(`    <Label name="${l}"/>`));
  lines.push(`    <AdditionalData attribute="original_url" value="${url}"/>`);
  lines.push(`  </Annotation>`);
});
lines.push('</Annotations>');

const out = lines.join('\n');
const dest = path.join(process.env.USERPROFILE, 'Desktop', 'annotations-upload.xml');
fs.writeFileSync(dest, out, { encoding: 'utf8' });
console.log(`Written ${sites.length} entries to ${dest}`);
