import fs from 'fs';
import {Filter} from './lib/filter';

export default class LocalFilter extends Filter {
  constructor(config) {
    super();
    this.summary = {};
    this.cfg = config;
    this.prepare();
  }

  cleanFile(source, destination) {
    let contents = fs.readFileSync(source).toString();
    // console.log(contents);
    let output = this.replaceText(contents);
    // console.log(output);
    fs.writeFileSync(destination, output);
  }

  foundMatch(word){
    super.foundMatch(word);
    this.summary[word] = this.summary[word] ? this.summary[word] + 1 : 1;
  }

  prepare() {
    this.generateWordList();
    this.wordRegExps = [];
    this.generateRegexpList();
    this.summary = {};
  }
}