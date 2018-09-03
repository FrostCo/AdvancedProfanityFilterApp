// Notes:
// Why is wordList on cfg? I should move it
// Summary (per word?)
// Debug output?
import LocalConfig from './localConfig';
import LocalFilter from './localFilter';

let cfg = LocalConfig.build('./configs/the-good-place.json');
let filter = new LocalFilter(cfg);
filter.cfg.addWord('harry');
filter.prepare();

filter.cleanFile('./hp1.txt', './clean.txt');
console.log('Counter: ', filter.counter);
console.log('Summary: ', filter.summary);