import path from 'path';
import fs from 'fs'
import chalk from 'chalk';
import build_object from './build_object';
import { execSync } from 'child_process';
import infer_target, { infer_compiler } from './infer_target';

export default class build
{
    public readonly root: string; // Root of project
    public readonly src_root: string; // Root of source files
    public readonly obj_root: string; // Root of object files
    public readonly bin_root: string; // Root of output files
    public readonly output: string; // Output of the exe or lib
    public readonly target: string; // The desired target to build
    public readonly compiler: string; // The c/c++ compiler to use
    public ld_files: string[] = []; // .obj files to link

    constructor(target: string, compiler: string)
    {
        this.target = target ?? infer_target();
        this.compiler = compiler ?? infer_compiler(this.target);

        this.root = process.cwd();
        this.src_root = this.find_src_root();
        this.obj_root = path.join(this.root, "build", this.target, "obj");
        this.bin_root = path.join(this.root, "build", this.target, "bin");
        this.output = path.join(this.bin_root, "myprogram");

        // start building...
        console.log(chalk.cyan(`\nfound source folder: `) + chalk.green(this.src_root) + "\n");
        this.loop(this.src_root);

        // start linking...
        console.log(chalk.cyan("\ndone building. ") + chalk.green("linking...\n"));
        this.link();
    }

    private loop(dir: string = this.src_root, walked: string = "")
    {
        const stream = fs.opendirSync(dir);
        let dirent: fs.Dirent;

        while ((dirent = stream.readSync()) !== null)
        {
            // Recurse over sub-directories
            if (dirent.isDirectory())
            {
                this.loop(path.join(dir, dirent.name), path.join(walked, dirent.name));
                continue;
            }

            new build_object(this, path.join(walked, dirent.name));
        }
        stream.closeSync();
    }

    private link()
    {
        if (!fs.existsSync(this.bin_root))
        {
            fs.mkdirSync(this.bin_root, { recursive: true });
        }
        execSync(`${this.compiler} -o ${this.output} ${this.ld_files.join(' ')}`, { stdio: 'inherit' });
    }

    /**
     * Finds the source directory of the project
     */
    private find_src_root(): string
    {
        let found: string;

        for (let b of ["src", "source", "sources", "Source", "Sources", "Src", "SRC"])
        { 
            if (fs.existsSync(found = path.join(this.root, b))) return found; 
        }

        throw chalk.redBright("source directory not found!");
    }
}