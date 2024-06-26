import { ChildProcessWithoutNullStreams } from 'child_process';

declare class LocalNode {
    readonly MAXIMUM_WAIT_TIME_SEC = 30;
    readonly READINESS_ENDPOINT = "http://127.0.0.1:8070/";
    process: ChildProcessWithoutNullStreams | null;
    /**
     * kills all the descendent processes
     * of the node process, including the node process itself
     */
    stop(): void;
    /**
     * Runs a local testnet and waits for process to be up.
     *
     * If local node process is already up it returns and does
     * not start the process
     */
    run(): Promise<void>;
    /**
     * Starts the local testnet by running the aptos node run-local-testnet command
     */
    start(): void;
    /**
     * Waits for the local testnet process to be up
     *
     * @returns Promise<boolean>
     */
    waitUntilProcessIsUp(): Promise<boolean>;
    /**
     * Checks if the local testnet is up
     *
     * @returns Promise<boolean>
     */
    checkIfProcessIsUp(): Promise<boolean>;
}

export { LocalNode };
