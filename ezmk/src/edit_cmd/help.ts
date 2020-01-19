import chalk from 'chalk';

export default function print_edit_functions()
{
    console.log("");
    print_func("git", "[add/rm] <url>", "add/remove a git repository to this dependency");
    print_func("include", "[add/rm] <path>", "add/remove an include path to this dependency");
    print_func("build", "<target?>", "set the build actions for a target and execute");
    print_func("exit", "", "stop editing this dependnecy");
    console.log("");
}

function print_func(name: string, args: string, desc: string)
{
    console.log
    (
        chalk.white(chalk.bold(name) + " " + args).padEnd(40, " ")
        + chalk.grey("\t// " + desc)
    );
}