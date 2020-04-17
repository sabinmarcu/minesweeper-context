/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const { override, addBabelPlugin, addWebpackPlugin } = require('customize-cra');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv-flow');
const { overrideProcessEnv } = require('cra-define-override');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = ((dirname) => {
  const dotEnvFiles = [
    path.resolve(dirname),
  ].reduce(
    (prev, it) => prev.concat(dotenv.listDotenvFiles(it)),
    [],
  ).filter(
    (p) => fs.existsSync(p),
  );
  const vars = dotenv.load(dotEnvFiles).parsed;

  return override(
    addWebpackPlugin(new DashboardPlugin()),
    addBabelPlugin('babel-plugin-emotion'),
    overrideProcessEnv(
      Object.entries(vars).reduce(
        (prev, [key, value]) => ({
          ...prev,
          [key]: JSON.stringify(value),
        }),
        {},
      ),
    ),
    (config) => {
      const set = config.module.rules[2].oneOf[1];
      const root = path.resolve(__dirname, '../');
      const packages = fs.readdirSync(root)
        .map((p) => path.resolve(root, p))
        .map((p) => {
          const src = path.resolve(p, 'src');
          if (fs.existsSync(src)) {
            return src;
          }
          return p;
        })
        .filter((p) => !p.includes(dirname));
      set.include = []
        .concat(Array.isArray(set.include) ? set.include : [set.include])
        .concat(packages);
      return config;
    },
  );
})(__dirname);
