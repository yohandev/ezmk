import fs from 'fs'
import path from 'path';
import chalk from 'chalk';
import replace_ext from 'replace-ext';
import child_process, { exec } from 'child_process';

const root = process.cwd();
const src_root = path.join(root, "src");
let ld_files: string[] = [];

export default function build(target: string)
{
    // Check if src exists
    if (!fs.existsSync(src_root))
    {
        console.log(chalk.redBright(`source directory not found! expecting "${src_root}"`));
        return;
    }

    console.log(chalk.cyan(`\nfound source folder: `) + chalk.green(src_root) + "\n");

    loop(src_root, target);

    console.log(chalk.cyan("\ndone building. ") + chalk.green("linking...\n"));

    console.log(ld_files);
}

/**
 * Loop over directories and build as required
 * @param dir Directory to start at
 * @param target Target platform. /build/{target}/bin etc.
 */
function loop(dir: string, target: string, walked: string = "")
{
    const stream = fs.opendirSync(dir);
    let dirent: fs.Dirent;
    let relative_path: string;
    while ((dirent = stream.readSync()) !== null)
    {
        // Recurse over sub-directories
        if (dirent.isDirectory())
        {
            loop(path.join(dir, dirent.name), target, path.join(walked, dirent.name));
            continue;
        }

        relative_path = (path.join(walked, dirent.name));

        // Add to linker
        ld_files.push(out_path(relative_path, target));

        // Build
        if (needs_build(relative_path, target))
        {
            // Make directory
            const out = out_path(walked, target, false);
            if (!fs.existsSync(out))
            {
                fs.mkdirSync(out, { recursive: true });
            }

            console.log(chalk.yellow(`building ${relative_path}...`));

            const cmd = `clang++ -c ${path.join(src_root, relative_path)} -o ${out_path(relative_path, target)}`;
            exec(cmd, (err, stdout, stderr) =>
            {
                if (err)
                {
                  console.log(chalk.redBright(`node.js error: ${err}`));
                  return;
                }

                if (stdout.length > 0)
                {
                    console.log(`stdout: ${stdout}`);
                }

                if (stderr.length > 0)
                {
                    console.log(`stderr: ${stderr}`);
                }
            });
            // SRC : path.join(root, 'src', relative_path)
            // OUT : out_path(relative_path, target));
        }
    }
    stream.closeSync();
}

/**
 * Does a source file need update?
 * @param file 
 * @param target 
 */
function needs_build(file: string, target: string): boolean
{
    const source = path.join(src_root, file);

    // Not a source file
    if (!is_source(source))
    {
        return false;
    }

    const out = out_path(file, target);

    // Never built or built after last update
    return !fs.existsSync(out) || (fs.statSync(source)).mtime > ((fs.statSync(out)).mtime);
}

function is_source(source: string) : boolean
{
    const ext = path.extname(source);

    return ext === ".c" || ext === ".cpp";
}

function out_path(file: string, target: string, is_file: boolean = true): string
{
    const p = path.join(root, "build", target, "obj", file);
    
    if (!is_file)
    {
        return p;
    }

    return replace_ext(p, '.o');
}