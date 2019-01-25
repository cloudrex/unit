export interface IRunnerOpts {
    readonly exit: boolean;
    readonly failureExitCode: number;
    readonly successExitCode: number;
    readonly supress: boolean;
    readonly shouldPrefix: boolean;
    readonly measureTime: boolean;
}

export const DefaultOpts: IRunnerOpts = {
    exit: true,
    failureExitCode: 1,
    successExitCode: 0,
    supress: false,
    shouldPrefix: false,
    measureTime: true
};
