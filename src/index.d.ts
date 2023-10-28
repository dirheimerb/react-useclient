export interface Config {
  /**
   * The directory to process.
   */
  directoryPath: string;
}
export interface AddClient {
  /**
   * The directory to process.
   */
  directoryPath: string;
}
export interface ProcessDirectory {
  /**
   * The directory to process.
   */
  directoryPath: string;
}
declare const _default: Config;
export default _default;
export declare const addUseClient: (filePath: string) => Promise<void>;
export declare const processDirectory: (directoryPath: string) => Promise<void>;
/**
 * This function is the entry point for the CLI.
 * It processes the directory specified in the config file.
 */
export default function ReactUseClient(): void;
