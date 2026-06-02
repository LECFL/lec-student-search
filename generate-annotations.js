// Run: node generate-annotations.js
// Generates annotations-upload.xml with real sequential timestamps and refinement labels
const fs = require('fs');
const path = require('path');

// Base set above highest existing timestamp in this engine (0x0004b86d19cdf7b6)
const base = BigInt('0x0004b86d19ce0000');
const includeLabel = '_cse_a0kpbksenko';

const sites = [
  ['sefaria.org/*',              'sefaria.org',              ['jewish_texts', 'hebrew']],
  ['hebrewbooks.org/*',          'hebrewbooks.org',          ['jewish_texts', 'hebrew']],
  ['mechon-mamre.org/*',         'mechon-mamre.org',         ['jewish_texts', 'hebrew']],
  ['jewishvirtuallibrary.org/*', 'jewishvirtuallibrary.org', ['jewish_texts', 'history']],
  ['myjewishlearning.com/*',     'myjewishlearning.com',     ['jewish_texts']],
  ['ou.org/*',                   'ou.org',                   ['jewish_texts', 'halacha']],
  ['torah.org/*',                'torah.org',                ['jewish_texts']],
  ['aish.com/*',                 'aish.com',                 ['jewish_texts']],
  ['torahanytime.com/*',         'torahanytime.com',         ['jewish_texts', 'chasidus']],
  ['yutorah.org/*',              'yutorah.org',              ['jewish_texts', 'halacha']],
  ['chabad.org/*',               'chabad.org',               ['chasidus', 'jewish_texts', 'halacha']],
  ['kehot.com/*',                'kehot.com',                ['chasidus']],
  ['meaningfullife.com/*',       'meaningfullife.com',       ['chasidus']],
  ['sichos-in-english.org/*',    'sichos-in-english.org',    ['chasidus']],
  ['tanyanet.com/*',             'tanyanet.com',             ['chasidus']],
  ['halachipedia.com/*',         'halachipedia.com',         ['halacha']],
  ['dafyomi.co.il/*',            'dafyomi.co.il',            ['halacha', 'jewish_texts']],
  ['morfix.co.il/*',             'morfix.co.il',             ['hebrew']],
  ['pealim.com/*',               'pealim.com',               ['hebrew']],
  ['yadvashem.org/*',            'yadvashem.org',            ['history', 'jewish_texts']],
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
  ['www.scholastic.com/*',         'scholastic.com',           []],
  ['sparknotes.com/*',           'sparknotes.com',           ['reference']],
  ['gutenberg.org/*',            'gutenberg.org',            ['reference']],
  ['newsela.com/*',              'newsela.com',              ['reference']],
  ['ducksters.com/*',            'ducksters.com',            ['reference']],
  ['edu/*',                      '*.edu',                    []],
  ['gov/*',                      '*.gov',                    []],
];

const lines = ['<?xml version="1.0" encoding="UTF-8"?><Annotations>'];
sites.forEach(([about, url, labels], i) => {
  const ts = '0x' + (base + BigInt(i)).toString(16).padStart(16, '0');
  lines.push(`  <Annotation about="${about}" timestamp="${ts}" score="1.0">`);
  lines.push(`    <Label name="${includeLabel}"/>`);
  // labels.forEach(l => lines.push(`    <Label name="${l}"/>`)); // add after refinements configured
  lines.push(`    <AdditionalData attribute="original_url" value="${url}"/>`);
  lines.push(`  </Annotation>`);
});
lines.push('</Annotations>');

const out = lines.join('\n');
const dest = path.join(process.env.USERPROFILE, 'Desktop', 'annotations-upload.xml');
fs.writeFileSync(dest, out, { encoding: 'utf8' });
console.log(`Written ${sites.length} entries to ${dest}`);
