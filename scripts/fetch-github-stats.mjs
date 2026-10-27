/**
 * fetch-github-stats.mjs
 * Scarica il calendario delle contribuzioni GitHub dell'ultimo anno in
 * src/data/github-activity.json, letto da Skills.astro in build.
 * Uso: GITHUB_TOKEN=... node scripts/fetch-github-stats.mjs
 * Senza token (o se GitHub non risponde) lascia il file com'è: la build usa
 * l'ultimo calendario salvato. In CI gira prima di `npm run build`.
 */

import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const USER = 'GianlucaZaccarelli';
const OUT = fileURLToPath(new URL('../src/data/github-activity.json', import.meta.url));
const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;

if (!token) {
  console.log('fetch-github-stats: nessun token, resta il calendario salvato');
  process.exit(0);
}

const query = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      restrictedContributionsCount
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

try {
  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { Authorization: `bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { login: USER } }),
  });
  const json = await res.json();
  const c = json.data?.user?.contributionsCollection;
  if (!res.ok || !c) throw new Error(JSON.stringify(json.errors ?? res.status));

  const days = c.contributionCalendar.weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => ({ date: d.date, count: d.contributionCount }));

  const data = {
    user: USER,
    generatedAt: new Date().toISOString().slice(0, 10),
    total: c.contributionCalendar.totalContributions,
    private: c.restrictedContributionsCount,
    days,
  };
  await writeFile(OUT, JSON.stringify(data) + '\n');
  console.log(`fetch-github-stats: ${data.total} contribuzioni, ${days.length} giorni`);
} catch (err) {
  console.warn(`fetch-github-stats: GitHub non disponibile (${err.message}), resta il calendario salvato`);
}
