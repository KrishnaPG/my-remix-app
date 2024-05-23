import fs from "fs-extra";
import path from "path";

import commandLineArgs from "command-line-args";
import commandLineUsage from "command-line-usage";
import logSymbols from "./log-symbols.js";
import ExcelToJson from "convert-excel-to-json";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __cwd = process.cwd();

class FileDetails {
  constructor(arg) {
    this.cmdLineArg = arg; // input value as is
    this.filePath = path.resolve(__cwd, arg); // input value resolved to absolute path
    this.exists = fs.existsSync(this.filePath);
  }
}
const cmdLineOptionList = [
  {
    name: "help",
    description: "Display this usage guide.",
    alias: "h",
    type: Boolean,
  },
  {
    name: "src",
    type: (filename) => new FileDetails(filename),
    multiple: true,
    defaultOption: true,
    description: "The input Excel files to process",
    typeLabel: "{underline file} ...",
  },
];
const cmdLineOptions = commandLineArgs(cmdLineOptionList);
const cmdLineUsage = commandLineUsage([
  {
    header: "A tool to convert Excel files to JSONL files",
    content:
      "Converts the given Excel files into JSONL format. Each sheet in the Excel file is output to a different JSONL file. Multiple input Excel files can submitted at once.",
  },
  { header: "Options", optionList: cmdLineOptionList },
]);

async function extractSheets(excelFilePath, outDir = __cwd) {
  const fileExt = path.extname(excelFilePath);
  if (!fileExt || fileExt.toLowerCase() !== ".xlsx") throw new Error("Not a .xlsx file");

  const result = ExcelToJson({
    sourceFile: excelFilePath,
    columnToKey: {
      "*": "{{columnHeader}}",
    },
  });

  const retVal = { sheetCount: 0, rowCounts: {} };
  const excelFileName = path.basename(excelFilePath, fileExt);

  Object.keys(result).forEach(async (sheetName) => {
    const sheetData = result[sheetName];
    retVal.sheetCount++;
    retVal.rowCounts[sheetName] = sheetData.length;
    await fs.outputJSON(path.resolve(outDir, `${excelFileName}-${sheetName}.jsonL`), sheetData);
  });
  return retVal;
}

async function main() {
  if (cmdLineOptions.help) return console.log(cmdLineUsage);
  if (!cmdLineOptions.src || !cmdLineOptions.src.length)
    return console.error("\n", logSymbols.error, "Error: missing input files argument. Use -h to see the help.\n");

  console.log(`Processing ${cmdLineOptions.src.length} input files:`);
  cmdLineOptions.src.forEach(async ({ cmdLineArg, filePath, exists }) => {
    if (!exists)
      return process.stdout.write(`${logSymbols.error} ${cmdLineArg}: file does not exist @ ${filePath}\n`);
    await extractSheets(filePath)
      .then((retVal) =>
        process.stdout.write(`${logSymbols.success} [${cmdLineArg}]: \t\t \n${JSON.stringify(retVal, null, 2)}\n`)
      )
      .catch((ex) => process.stdout.write(`${logSymbols.error} [${cmdLineArg}]: -> ${ex.message}\n`));
  });
}

main();
