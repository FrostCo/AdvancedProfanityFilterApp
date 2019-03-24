import fs from 'fs';
import {Filter} from './lib/filter';
import AdmZip from 'adm-zip';
import textract from 'textract';

export default class LocalFilter extends Filter {
  constructor(config) {
    super();
    this.summary = {};
    this.cfg = config;
    this.prepare();
  }

  cleanEpubFile(source, destination) {
    let filter = this;
    let filtered = false;
    var zip = new AdmZip(source);

    // Ensure mimetype file is first in the archive
    // Hack: add `if (a.entryName === "mimetype") {return -1}` to node_modules/adm-zip/zipFile.js
    // See: https://github.com/cthackers/adm-zip/issues/116
    zip.getEntries().forEach(function(zipEntry) {
      if (zipEntry.entryName.match(/^OEBPS\/.+\.xhtml$/i)) {
        let originalText = zipEntry.getData().toString('utf8');
        let filteredText = filter.replaceText(originalText);
        if (originalText != filteredText) {
          filtered = true;
          zip.updateFile(zipEntry, Buffer.alloc(Buffer.byteLength(filteredText), filteredText));
        }
      }
    });
    if (filtered) {
      zip.writeZip(destination);
    }
  }

  cleanOtherFile(source, destination) {
    let filter = this;
    textract.fromFileWithPath(source, function(error, text) {
      if (!error) {
        let output = filter.replaceText(text);
        if (text != output) {
          fs.writeFileSync(destination, output);
        }
      }
    });
  }

  cleanTextFile(source, destination) {
    let contents = fs.readFileSync(source).toString();
    let output = this.replaceText(contents);
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