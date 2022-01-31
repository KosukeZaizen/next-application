import child_process from "child_process";

export async function execCommandAsync(command: string): Promise<{
    stdout: string;
    stderr: string;
    error: child_process.ExecException | null;
}> {
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
