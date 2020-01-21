import chalk from "chalk";

export namespace command
{
    /**
     * template for a command
     */
    export interface template
    {
        readonly name: string;
        readonly args: string;
        readonly desc: string;
        readonly handler: (args: string[]) => void;
    }

    /**
     * list of all commands
     */
    export const list: template[] = [];

    /**
     * run a command
     */
    export function run(name: string, args: string[]): void
    {
        find(name).handler(args);
    }

    /**
     * find a command
     */
    export function find(name: string): template
    {
        const found = list.find(val => val.name === name);
        
        // command found
        if (found)
        {
            return found;
        }
        return error();
    }

    /**
     * unknown command
     */
    function error(): any
    {
        console.log(chalk.redBright("unknown command. use 'ezmk help' for a list of commands"));
        process.exit();
    }
}