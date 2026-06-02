const TERMS = ["Torah","Chumash","Parsha","weekly parsha","Bereishis","Shemos","Vayikra","Bamidbar","Devarim","Tanach","Tehillim","Psalms","Mishlei","Talmud","Gemara","Mishnah","Daf Yomi","Tractate Berachos","Tractate Shabbos","Tractate Bava Kama","Tractate Sanhedrin","Tanya","Chasidus","Chassidus","Alter Rebbe","Lubavitcher Rebbe","Hayom Yom","Likkutei Torah","Torah Or","Maamar","Sicha","Farbrengen","Halacha","Shulchan Aruch","Mishneh Torah","Kitzur Shulchan Aruch","Jewish law","Shabbos laws","Kashrus","Brachos","Tefillah laws","Jewish holidays","Rosh Hashana","Yom Kippur","Sukkos","Simchas Torah","Chanukah","Purim","Pesach","Passover","Shavuos","Lag B'Omer","Tisha B'Av","Hebrew alphabet","Aleph beis","Hebrew grammar","Hebrew verbs","Hebrew vocabulary","Hebrew dictionary","learn Hebrew","Jewish history","Holocaust","Beis Hamikdash","Temple in Jerusalem","Exodus from Egypt","Chabad history","State of Israel history","algebra","geometry","calculus","fractions","graphing calculator","Pythagorean theorem","quadratic formula","order of operations","photosynthesis","cell biology","solar system","periodic table","Newton's laws","states of matter","ecosystems","parts of speech","essay writing","literary devices","figurative language","reading comprehension","American Revolution","Civil War","World War II","Ancient Egypt","Ancient Rome","US Constitution","Bill of Rights"];

const DOMAINS = ["sefaria.org","hebrewbooks.org","mechon-mamre.org","jewishvirtuallibrary.org","myjewishlearning.com","ou.org","torah.org","aish.com","torahanytime.com","yutorah.org","chabad.org","kehot.com","meaningfullife.com","sichos-in-english.org","tanyanet.com","halachipedia.com","dafyomi.co.il","morfix.co.il","pealim.com","yadvashem.org","ushmm.org","khanacademy.org","wolframalpha.com","desmos.com","mathway.com","ck12.org","mathsisfun.com","nationalgeographic.com","livescience.com","howstuffworks.com","pbs.org","pbslearningmedia.org","history.com","si.edu","loc.gov","wikipedia.org","britannica.com","merriam-webster.com","scholastic.com","sparknotes.com","gutenberg.org","newsela.com","ducksters.com"];

export default function handler(req, res) {
  const raw = req.query.q || '';
  const q   = raw.toLowerCase().trim();
  let matches = q.length < 2 ? [] : TERMS.filter(t => t.toLowerCase().startsWith(q)).slice(0, 6);

  // Prepend matching approved domains as navigation suggestions
  const domainMatches = q.length >= 2 ? DOMAINS.filter(d => d.startsWith(q)).map(d => 'https://' + d) : [];
  matches = [...domainMatches, ...matches].slice(0, 8);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json([raw, matches]);
}
