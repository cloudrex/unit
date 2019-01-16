export interface IRunnerOpts {
    readonly exit: boolean;
    readonly failureExitCode: number;
    readonly successExitCode: number;
    readonly supress: boolean;
}

export const DefaultOpts: IRunnerOpts = {
    exit: true,
    failureExitCode: 1,
    successExitCode: 0,
    supress: false
};
