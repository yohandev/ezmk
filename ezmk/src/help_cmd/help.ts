import chalk from 'chalk';

export default function help()
{
    console.log("");

    console.log(chalk.greenBright("easy make" + chalk.bold("(ezmk)")));
    console.log(chalk.italic(chalk.cyan("easily make your c/c++ projects\n")));

    print_func("help", "print a list of available ezmk functions");
    print_func("build <target>", "build the project");
    print_func("run <target>", "builds & runs the project");
    print_func("add [name]", "add a dependency to this project");
    print_func("edit [name]", "configure a dependency");

    console.log
    (
        chalk.white(chalk.bold("\navailable targets: "))
        + chalk.grey("osx-release, osx-debug, win-release, win-debug, linux-release, linux-debug")
    );

    console.log("")
}

function print_func(name: string, desc: string)
{
    console.log
    (
        chalk.white("ezmk " + chalk.bold(name)).padEnd(40, " ")
        + chalk.grey("\t// " + desc)
    );
}