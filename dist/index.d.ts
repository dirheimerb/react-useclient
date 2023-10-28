interface Config {
  /**
   * The directory to process.
   */
  directoryPath: string;
}
interface AddClient {
  /**
   * The directory to process.
   */
  directoryPath: string;
}
interface ProcessDirectory {
  /**
   * The directory to process.
   */
  directoryPath: string;
}
declare const addUseClient: (filePath: string) => Promise<void>;
declare const processDirectory: (directoryPath: string) => Promise<void>;
/**
 * This function is the entry point for the CLI.
 * It processes the directory specified in the config file.
 */
declare function ReactUseClient(): void;

export {
  AddClient,
  Config,
  ProcessDirectory,
  addUseClient,
  ReactUseClient as default,
  processDirectory,
};
