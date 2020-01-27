import path from 'path';
import {promises as fs} from 'fs';
import got from 'got';

export default async (req, res) => {
  res.json({
    lastChecked: await getCiInfo(),
    lastUpdated: await getLastUpdatedStats(),
  })
}

async function getCiInfo () {
  const TOKEN = '3b6d3971d41d29eddc376f700a3db8c90ac74dd5';
  const url = `https://circleci.com/api/v1.1/project/gh/maael/temtem-api?circle-token=${TOKEN}&limit=50&filter=completed`;
  const res = await got<any>(url, {responseType: 'json'});
  const updaterJobs = res.body.filter((item) => item.build_parameters.CIRCLE_JOB === 'updater');
  const mostRecent = updaterJobs[0];
  if (mostRecent) {
    return mostRecent.stop_time;
  } else {
    return undefined;
  }
}

async function getLastUpdatedStats () {
  try {
    const dataDir = path.join(process.env.ROOT!, 'data');
    const dirs = await fs.readdir(dataDir);
    console.info('dirs', dirs);
    const stats = (await Promise.all(dirs.filter((n) => n !== '.gitkeep').map(async (d) => ({...await fs.stat(`${dataDir}/${d}`), name: d}))))
      .map(({mtime, name}) => ({mtime, name})).sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    return stats[0].mtime;
  } catch (e) {
    console.info(e);
    return undefined;
  }
}
