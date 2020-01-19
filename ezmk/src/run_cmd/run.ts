import build from "../build_cmd/build2";
import chalk from "chalk";
import { execSync } from "child_process";

export default function run(target: string, compiler: string)
{
    const b = new build(target, compiler);

    console.log(chalk.cyan("\nrunning ") + chalk.green(b.output) + "\n");
    execSync(b.output, { stdio: 'inherit' });
}