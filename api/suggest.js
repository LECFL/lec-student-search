const TERMS = ["Torah","Chumash","Parsha","weekly parsha","Bereishis","Shemos","Vayikra","Bamidbar","Devarim","Tanach","Tehillim","Psalms","Mishlei","Talmud","Gemara","Mishnah","Daf Yomi","Tractate Berachos","Tractate Shabbos","Tractate Bava Kama","Tractate Sanhedrin","Tanya","Chasidus","Chassidus","Alter Rebbe","Lubavitcher Rebbe","Hayom Yom","Likkutei Torah","Torah Or","Maamar","Sicha","Farbrengen","Halacha","Shulchan Aruch","Mishneh Torah","Kitzur Shulchan Aruch","Jewish law","Shabbos laws","Kashrus","Brachos","Tefillah laws","Jewish holidays","Rosh Hashana","Yom Kippur","Sukkos","Simchas Torah","Chanukah","Purim","Pesach","Passover","Shavuos","Lag B'Omer","Tisha B'Av","Hebrew alphabet","Aleph beis","Hebrew grammar","Hebrew verbs","Hebrew vocabulary","Hebrew dictionary","learn Hebrew","Jewish history","Holocaust","Beis Hamikdash","Temple in Jerusalem","Exodus from Egypt","Chabad history","State of Israel history","algebra","geometry","calculus","fractions","graphing calculator","Pythagorean theorem","quadratic formula","order of operations","photosynthesis","cell biology","solar system","periodic table","Newton's laws","states of matter","ecosystems","parts of speech","essay writing","literary devices","figurative language","reading comprehension","American Revolution","Civil War","World War II","Ancient Egypt","Ancient Rome","US Constitution","Bill of Rights"];

const DOMAIN_RE = /^[a-z0-9-]+\.[a-z]{2,}(\/.*)?$/i;

export default function handler(req, res) {
  const raw = req.query.q || '';
  const q   = raw.toLowerCase();
  let matches = q.length < 2 ? [] : TERMS.filter(t => t.toLowerCase().startsWith(q)).slice(0, 7);

  // If it looks like a domain, prepend it as a navigation suggestion
  if (DOMAIN_RE.test(raw.trim()) && !raw.includes(' ')) {
    const url = raw.trim().startsWith('http') ? raw.trim() : 'https://' + raw.trim();
    matches = [url, ...matches].slice(0, 8);
  }

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json([raw, matches]);
}
