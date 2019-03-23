import glob from 'glob';
import path from 'path';
import LocalConfig from './localConfig';
import LocalFilter from './localFilter';

////
// Global Variables
let cfgFile; // = populateConfigs();
// let configSelect = document.getElementById('configSelect');
let configHolder = document.getElementById('configHolder');
let holder = document.getElementById('drag-file');

function batchProcess(files) {
  let batchSummary = {};
  let cfg = LocalConfig.build(cfgFile);
  let filter = new LocalFilter(cfg);
  // filter.cfg.addWord('harry');
  // filter.prepare();

  for (let f of files) {
    let fileName = path.basename(f.path);
    let ext = path.extname(f.path);
    let outputDir = path.dirname(f.path);
    let output = path.join(outputDir, `clean-${fileName}`);
    filter.summary = {};

    try {
      switch(ext.toLowerCase()) {
        case '.epub':
          filter.cleanEpubFile(f.path, output);
          break;
        case '.md':
        case '.srt':
        case '.txt':
          filter.cleanTextFile(f.path, output);
          break;
        default:
          filter.cleanOtherFile(f.path, output);
      }
      batchSummary[fileName] = filter.summary;
    }
    catch (e) {
      console.log('Error', e);
    }
  }

  generateSummaryTable(batchSummary, cfg);
}

function generateSummaryTable(batchSummary, cfg) {
  let tableInnerHTML = '<table class="w3-table w3-bordered"><tr class="w3-deep-purple"><th>File</th><th>Filtered Items</th></tr>';
  Object.keys(batchSummary).sort().forEach(key => {
    tableInnerHTML += `<tr><td>${key}</td><td><table class="w3-table w3-striped w3-border">`;
    Object.keys(batchSummary[key]).forEach(match => {
      tableInnerHTML += `<tr><td>${cfg.words[match].words[0]}</td><td class="w3-right-align">${batchSummary[key][match]}</td></tr>`;
    });
    tableInnerHTML += '</table>';
  });
  tableInnerHTML += '</table>'
  document.getElementById('summaryContainer').innerHTML = tableInnerHTML;
}

// function populateConfigs() {
//   let configFiles = glob.sync('./configs/**/*.json').sort();
//   let configSelectHTML = '';
//   configFiles.forEach(configFile => {
//     configSelectHTML += `<option value="${configFile}">${path.basename(configFile)}</option>`;
//   });
//   document.getElementById('configSelect').innerHTML = configSelectHTML;
//   return configFiles[0];
// }

////
// Event Handlers
// configSelect.onchange = function(e) { cfgFile = e.target.value; }
configHolder.ondragover = () => { return false; };
configHolder.ondragleave = () => { return false; };
configHolder.ondragend = () => { return false; };
configHolder.ondrop = e => {
  e.preventDefault();
  cfgFile = e.dataTransfer.files[0].path;
  document.getElementById('cfgName').innerText = path.basename(cfgFile);
};

// Drag and Drop Files
holder.ondragover = () => { return false; };
holder.ondragleave = () => { return false; };
holder.ondragend = () => { return false; };
holder.ondrop = (e) => { e.preventDefault(); batchProcess(e.dataTransfer.files); return false; };