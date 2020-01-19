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
        // map commands
        const cmds = command.list.map(c =>
            chalk.white("ezmk ")
            + chalk.white(`${chalk.bold(c.name)} ${chalk.italic(c.args)}`).padEnd(40, " ")
            + chalk.grey("\t// " + c.desc)
        );

        // announce
        console.log(chalk.greenBright("easy make" + chalk.bold("(ezmk)")));
        console.log(chalk.italic(chalk.cyan("easily make your c/c++ projects\n")));

        // list commands
        console.log(cmds.join('\n'));
    }
});