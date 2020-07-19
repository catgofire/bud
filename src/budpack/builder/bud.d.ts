import { Configs } from "./base/configs";
import { features } from "./base/features";
import { Hooks } from "./base/hooks";
import { options } from "./base/options";
import { paths } from "./base/paths";
import { alias } from "./api/alias";
import { auto } from "./api/auto";
import { babel } from "./api/babel";
import { bundle } from "./api/bundle";
import { copy } from "./api/copy";
import { copyAll } from "./api/copyAll";
import { dashboard } from "./api/dashboard";
import { debug } from "./api/debug";
import { dependencyManifest } from "./api/dependencyManifest";
import { dev } from "./api/dev";
import { devtool } from "./api/devtool";
import { dist } from "./api/dist";
import { distPath } from "./api/distPath";
import { dump } from "./api/dump";
import { env } from "./api/env";
import { hash } from "./api/hash";
import { hot } from "./api/hot";
import { inlineManifest } from "./api/inlineManifest";
import { map } from './api/map';
import { mini } from "./api/mini";
import { postCss } from "./api/postcss";
import { preset } from "./api/preset";
import { project } from "./api/project";
import { projectPath } from "./api/projectPath";
import { publicPath } from "./api/publicPath";
import { purge } from "./api/purge";
import { register } from "./api/register";
import { setEnv } from "./api/setEnv";
import { src } from "./api/src";
import { srcPath } from "./api/srcPath";
import { sync } from "./api/sync";
import { target } from "./api/target";
import { translate } from "./api/translate";
import { vendor } from "./api/vendor";
import { watch } from "./api/watch";

export type bud = {
  configs: Configs;
  features: typeof features;
  inProduction: boolean;
  mode: string;
  options: typeof options;
  hooks: Hooks;
  paths: typeof paths;
  alias: typeof alias;
  auto: typeof auto;
  babel: typeof babel;
  bundle: typeof bundle;
  copy: typeof copy;
  copyAll: typeof copyAll;
  dashboard: typeof dashboard;
  debug: typeof debug;
  dependencyManifest: typeof dependencyManifest;
  dev: typeof dev;
  devtool: typeof devtool;
  dist: typeof dist;
  distPath: typeof distPath;
  dump: typeof dump;
  env: typeof env;
  hash: typeof hash;
  hot: typeof hot;
  inlineManifest: typeof inlineManifest;
  map: typeof map;
  mini: typeof mini;
  plugins: any;
  postCss: typeof postCss;
  preset: typeof preset;
  project: typeof project;
  projectPath: typeof projectPath;
  publicPath: typeof publicPath;
  purge: typeof purge;
  register: typeof register;
  setEnv: typeof setEnv;
  src: typeof src;
  srcPath: typeof srcPath;
  sync: typeof sync;
  target: typeof target;
  translate: typeof translate;
  vendor: typeof vendor;
  watch: typeof watch;
  webpackPlugins: any;
}
