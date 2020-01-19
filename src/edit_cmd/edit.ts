import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import readline from 'readline-sync';
import print_edit_functions from './help';
import git from './git';
import dep_file from './dep_file';

// const rl = readline.createInterface(
// {
//     input: process.stdin,
//     output: process.stdout
// });

export default class edit_process
{
    public readonly root!:string;
    public readonly lib_root!:string;
    public readonly dep_path!:string;
    public readonly file_path!:string;
    public readonly name!:string;

    public readonly file!: dep_file;

    constructor(dependency_name: string)
    {
        this.name = dependency_name;

        // Determine paths
        this.root = process.cwd();
        this.lib_root = path.join(this.root, 'lib');
        this.dep_path = path.join(this.lib_root, dependency_name);
        this.file_path = path.join(this.dep_path, '.ezmk');

        // Check if it exists
        if (!fs.existsSync(this.dep_path))
        {
            console.log(chalk.redBright(`dependency ${this.name} doesn't exists!`));
            return;
        }

        // Get file
        this.file = new dep_file();
        this.file.read(this.file_path);

        // Announce
        console.log(chalk.cyan("editing dependency ") + chalk.green(this.name));
        print_edit_functions();

        this.get_cmd();
    }

    private get_cmd()
    {
        const ans = readline.question("> ");
        const tokens: string[] = ans.match(/[^ ]+/g) ?? [];

        switch(tokens[0])
        {
            case "help":
                print_edit_functions();
                break;
            case "git":
                git(this, tokens[1], tokens[2]);
                break;
            case "exit":
                return this.exit();
            default:
                console.log(chalk.redBright("unknown function. use 'help' for a list of functions"));
        }
        this.get_cmd();
    }

    private exit(): void
    {
        console.log(chalk.cyan("finished editing dependency ") + chalk.green(this.name));
        this.file.write(this.file_path);
    }
}

