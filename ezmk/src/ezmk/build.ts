import { command } from "./commands"
import { meta } from "./meta";
import { targets } from "./targets";
import path from "path";
import fs from "fs";
import replace_ext from "replace-ext";
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

        // cache
        let ld: string[] = [];

        // start building...
        console.log(chalk.cyan(`\nbuilding @ `) + chalk.green(src_roots) + "\n");
        src_roots.forEach(src_root => util.dir.walk(src_root, file =>
        {
            const ext = path.extname(file);

            // not a source file
            if (ext !== '.cpp' && ext !== '.c')
            {
                return;
            }

            // io paths
            const src_path = path.join(src_root, file);
            const obj_path = replace_ext(path.join(obj_root, file), '.o');

            // add to linker
            ld.push(obj_path);

            // doesn't need to be built
            if (fs.existsSync(obj_path) && (fs.statSync(src_path)).mtime < ((fs.statSync(obj_path)).mtime))
            {
                return;
            }

            // create directories
            util.dir.mk(path.dirname(obj_path));

            // announce
            console.log(chalk.yellow(`building ${file}...`));

            // Execute build command
            util.cmd.run(`${compiler} -c ${src_path} -o ${obj_path} -I${data.include.join(' -I')}`);
        }));

        // start linking...
        console.log(chalk.cyan("\ndone building. linking @ ") + chalk.green(data.include) + "\n");

        // create directories
        util.dir.mk(bin_root);
        util.cmd.run(`${compiler} -o ${output} ${ld.join(' ')}`);

        // done...
        console.log(chalk.cyan("\ndone linking. run @ ") + chalk.green(output));

        // return output file
        return output;
    }
});