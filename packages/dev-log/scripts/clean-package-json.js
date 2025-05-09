import {
  pathJoin,
  readFileToJsonSync,
  getDirectoryBy,
  writeJsonFile,
} from 'a-node-tools';

let packageJson = readFileToJsonSync('./package.json');

['scripts', 'devDependencies', 'lint-staged', 'private'].forEach(
  key => delete packageJson[key],
);

packageJson = {
  main: 'cjs/index.cjs',
  module: 'mjs/index.mjs',
  types: 'types/index.d.ts',
  author: {
    name: 'earthnut',
    email: 'earthnut.dev@outlook.com',
    url: 'https://earthnut.dev',
  },
  ...packageJson,
  files: ['cjs', 'mjs', 'types'],
  exports: {
    '.': {
      import: {
        default: './mjs/index.mjs',
        types: './types/index.d.ts',
      },
      require: {
        default: './cjs/index.cjs',
        types: './types/index.d.ts',
      },
    },
  },
  keywords: ['qqi', '@qqi/dev-log', '@qqi'],
  homepage: 'https://earthnut.dev/qqi/dev-log',
  bugs: {
    url: 'https://github.com/earthnutDev/qqi/issues',
    email: 'earthnut.dev@outlook.com',
  },
  repository: {
    type: 'git',
    url: 'git+https://github.com/earthnutDev/qqi.git',
  },
  publishConfig: {
    access: 'public',
    registry: 'https://registry.npmjs.org/',
  },
};

{
  const distPath = getDirectoryBy('dist', 'directory');

  const distPackagePath = pathJoin(distPath, './dist/package.json');

  writeJsonFile(distPackagePath, packageJson);
}
