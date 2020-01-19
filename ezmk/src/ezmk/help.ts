import { command } from './commands';
import chalk from 'chalk';

/**
 * Help command
 */
command.list.push( 
{
    name: 'help',
    args: '',
    desc: 'print a list of ezmk commands',
    handler: args =>
    {
        // specific help
        if (args?.length > 0)
        {
            console.log(args.map(a => to_string(command.find(a))).join('\n'));
            return;
        }

        // announce
        console.log(chalk.greenBright("easy make" + chalk.bold("(ezmk)")));
        console.log(chalk.italic(chalk.cyan("easily make your c/c++ projects\n")));

        // list commands
        console.log(command.list.map(c => to_string(c)).join('\n'));
    }
});

/**
 * Command to string
 */
function to_string(c: command.template): string
{
    return chalk.white("ezmk ")
        + chalk.white(`${chalk.bold(c.name)} ${chalk.italic(c.args)}`).padEnd(40, " ")
        + chalk.grey("\t// " + c.desc);
}