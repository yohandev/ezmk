import chalk from "chalk";

export namespace command
{
    /**
     * Template for a command
     */
    export interface template
    {
        readonly name: string;
        readonly args: string;
        readonly desc: string;
        readonly handler: (args: string[]) => void;
    }

    /**
     * List of all commands
     */
    export const list: template[] = [];

    /**
     * Run a command
     */
    export function run(name: string, args: string[]): void
    {
        const found = list.find(val => val.name === name);
        
        // command not found
        if (!found)
        {
            return error();
        }
        found.handler(args);
    }

    /**
     * Unknown functon
     */
    function error(): void
    {
        console.log(chalk.redBright("unknown command. use 'ezmk help' for a list of commands"));
    }
}