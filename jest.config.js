const { pathsToModuleNameMapper } = require("ts-jest")
const {
  readConfigFile,
  parseJsonConfigFileContent,
  sys,
} = require("typescript")

const configFile = readConfigFile("./tsconfig.json", sys.readFile)
if (typeof configFile.error !== "undefined") {
  throw new Error(`Failed to load tsconfig: ${configFile.error}`)
}

const { options } = parseJsonConfigFileContent(
  configFile.config,
  {
    fileExists: sys.fileExists,
    readFile: sys.readFile,
    readDirectory: sys.readDirectory,
    useCaseSensitiveFileNames: true,
  },
  __dirname
)

module.exports = {
  roots: ["<rootDir>"],
  testMatch: ["**/?(*.)+(test).+(ts)"],
  globals: {
    "ts-jest": {
      tsconfig: "test/tsconfig.json",
    },
  },
  transform: {
    "^.+\\.(t|j)s$": "esbuild-jest" /* Replace with ts-jest as needed */,
  },
  moduleNameMapper: pathsToModuleNameMapper(options.paths, {
    prefix: "<rootDir>",
  }),
}
