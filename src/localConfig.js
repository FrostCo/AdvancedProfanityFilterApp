import Config from './lib/config';
import fs from 'fs';

export default class LocalConfig extends Config {
  constructor(config) {
    super(config);
  }

  static build(file) {
    return new LocalConfig(LocalConfig.readJSONFromFile(file));
  }

  static readJSONFromFile(file) {
    return JSON.parse(fs.readFileSync(file));
  }
}