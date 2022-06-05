import child_process from "child_process";

export type ExecStatus = {
    stdout: string;
    stderr: string;
    error: child_process.ExecException | null;
};

export async function execCommandAsync(command: string): Promise<ExecStatus> {
    return await new Promise(r => {
        child_process.exec(command, function (error, stdout, stderr) {
            r({
                stdout,
                stderr,
                error,
            });
        });
    });
}
