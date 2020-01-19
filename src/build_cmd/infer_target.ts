import 'command-exists'
import commandExistsSync from 'command-exists';
import chalk from 'chalk';

export default function infer_target(): string
{
    const found = infer_target_internal();

    console.log(chalk.cyan("infering target... ") + chalk.green(`found ${found}`));
    return found;
}

export function infer_compiler(target: string): string
{
    const found = infer_compiler_internal(target);

    console.log(chalk.cyan("infering compiler... ") + chalk.green(`found ${found}`));
    return found;
}

function infer_target_internal(): string
{
    switch(process.platform)
    {
        case 'aix':
            break;
        case 'android':
            break;
        case 'cygwin':
            break;
        case 'darwin':
            return "osx-debug";
        case 'freebsd':
            break;
        case 'linux':
            break; // TODO
        case 'netbsd':
            break;
        case 'openbsd':
            break;
        case 'sunos':
            break;
        case 'win32':
            return "win32-debug";
    }

    throw chalk.redBright("platform infer failed!");
}

export function infer_compiler_internal(target: string): string
{
    switch (target)
    {
        case 'osx-debug':
        case 'osx-release':
            return find_available("clang++", "g++", "clang", "gcc", "msvc");
        case 'win32-debug':
        case 'win32-release':
            return find_available("cl", "clang++", "g++", "clang", "gcc");
    }
    throw chalk.redBright("compiler not found");
}

function find_available(...exe: string[]): string
{
    for (let e of exe)
    {
        if (commandExistsSync(e))
        {
            return e;
        }
    }
    throw chalk.redBright("no c/c++ compiler found for this platform\n try installing one of the following to your PATH: " + exe)
}