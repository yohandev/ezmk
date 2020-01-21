import { command } from "./commands"
import { meta } from "./meta";
import { targets } from "./targets";
import path from "path";
import fs from "fs";
import chalk from "chalk";
import { util } from "./util";

/**
 * Build command
 */
command.list.push(
{
    name: 'build',
    args: '<target?> <compiler?>',
    desc: 'build the project',
    handler: args =>
    {
        // target & compiler
        const target = args[0] ?? targets.infer();
        const compiler = args[1] ?? targets.compilers[target as targets.type];

        // meta data
        const data = meta.get_data();

        // io paths
        const src_roots = data.source.map(p => path.join(data.root, p));
        const obj_root = path.join(data.root, "build", target, "obj");
        const bin_root = path.join(data.root, "build", target, "bin");
        const output = path.join(bin_root, data.name);

        // start building...
        console.log(chalk.cyan(`\nbuilding @ `) + chalk.green(src_roots) + "\n");
        src_roots.forEach(s => util.dir.walk(s, (file, walked) =>
        {
            // new build_object
        }));

        // start linking...
        console.log(chalk.cyan("\ndone building. linking @ ") + chalk.green(data.include) + "\n");

    }
});