// Run: node generate-annotations.js
// Generates annotations-upload.xml with real sequential timestamps and refinement labels
const fs = require('fs');
const path = require('path');

// Base set above highest existing timestamp in this engine (0x0004b86d19cdf7b6)
const base = BigInt('0x0006534721500000');
const includeLabel = '_cse_s3n9yitemci';

const sites = [
  ['sefaria.org/*',              'sefaria.org',              ['Judaic Texts']],
  ['hebrewbooks.org/*',          'hebrewbooks.org',          ['Judaic Texts']],
  ['mechon-mamre.org/*',         'mechon-mamre.org',         ['Judaic Texts']],
  ['jewishvirtuallibrary.org/*', 'jewishvirtuallibrary.org', ['Judaic Texts', 'History']],
  ['myjewishlearning.com/*',     'myjewishlearning.com',     ['Judaic Texts']],
  ['ou.org/*',                   'ou.org',                   ['Judaic Texts']],
  ['torah.org/*',                'torah.org',                ['Judaic Texts']],
  ['aish.com/*',                 'aish.com',                 ['Judaic Texts']],
  ['torahanytime.com/*',         'torahanytime.com',         ['Judaic Texts', 'Chassidus']],
  ['yutorah.org/*',              'yutorah.org',              ['Judaic Texts']],
  ['chabad.org/*',               'chabad.org',               ['Chassidus', 'Judaic Texts']],
  ['kehot.com/*',                'kehot.com',                ['Chassidus']],
  ['meaningfullife.com/*',       'meaningfullife.com',       ['Chassidus']],
  ['sichos-in-english.org/*',    'sichos-in-english.org',    ['Chassidus']],
  ['tanyanet.com/*',             'tanyanet.com',             ['Chassidus']],
  ['halachipedia.com/*',         'halachipedia.com',         ['Judaic Texts']],
  ['dafyomi.co.il/*',            'dafyomi.co.il',            ['Judaic Texts']],
  ['morfix.co.il/*',             'morfix.co.il',             ['Judaic Texts']],
  ['pealim.com/*',               'pealim.com',               ['Judaic Texts']],
  ['yadvashem.org/*',            'yadvashem.org',            ['History', 'Judaic Texts']],
  ['ushmm.org/*',                'ushmm.org',                ['History']],
  ['khanacademy.org/*',          'khanacademy.org',          ['Math', 'Science']],
  ['wolframalpha.com/*',         'wolframalpha.com',         ['Math']],
  ['desmos.com/*',               'desmos.com',               ['Math']],
  ['mathway.com/*',              'mathway.com',              ['Math']],
  ['ck12.org/*',                 'ck12.org',                 ['Math', 'Science']],
  ['mathsisfun.com/*',           'mathsisfun.com',           ['Math']],
  ['nationalgeographic.com/*',   'nationalgeographic.com',   ['Science', 'History']],
  ['livescience.com/*',          'livescience.com',          ['Science']],
  ['howstuffworks.com/*',        'howstuffworks.com',        ['Science']],
  ['pbs.org/*',                  'pbs.org',                  ['Science']],
  ['pbslearningmedia.org/*',     'pbslearningmedia.org',     ['Science']],
  ['history.com/*',              'history.com',              ['History']],
  ['si.edu/*',                   'si.edu',                   ['History']],
  ['loc.gov/*',                  'loc.gov',                  ['History']],
  ['wikipedia.org/*',            'wikipedia.org',            ['Reference']],
  ['britannica.com/*',           'britannica.com',           ['Reference']],
  ['merriam-webster.com/*',      'merriam-webster.com',      ['Reference']],
  ['www.scholastic.com/*',       'scholastic.com',           []],
  ['sparknotes.com/*',           'sparknotes.com',           ['Reference']],
  ['gutenberg.org/*',            'gutenberg.org',            ['Reference']],
  ['newsela.com/*',              'newsela.com',              ['Reference']],
  ['ducksters.com/*',            'ducksters.com',            ['Reference']],
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
