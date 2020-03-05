const { createWindowsInstaller } = require('electron-winstaller');
const path = require('path');

function getInstallerConfig() {
  console.log('Creating windows installer');

  const rootPath = path.join('./');
  const outPath = path.join(rootPath, 'builds');

  return Promise.resolve({
    appDirectory: path.join(outPath, 'Github Repo Searcher-win32-ia32'),
    authors: 'Dante Webmaster',
    noMsi: true,
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'Github Repo Searcher.exe',
    setupExe: 'GithubRepoSearcherInstaller.exe',
    setupIcon: path.join(rootPath, 'src', 'assets', 'icons', 'win', 'icon.ico'),
  });
}

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
