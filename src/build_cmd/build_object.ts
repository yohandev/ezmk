import './build2';
import path from 'path';
import fs from 'fs';
import replace_ext from 'replace-ext';
import chalk from 'chalk';
import { exec, execSync } from 'child_process';
import build from './build2';

export default class build_object
{
    private src!: string;
    private obj!: string;
    private name!: string;
    private master!: build;

    /**
     * Manages a file and builds it accordingly
     * @param master The master build operation
     * @param file Relative path to src/ of the file
     */
    constructor(master: build, file: string)
    {
        // ignore non-source files
        if (!this.is_source(file)) { return; }

        // store relative path
        this.name = file;

        // get absolute paths
        this.src = path.join(master.src_root, file);
        this.obj = path.join(master.obj_root, file);
        this.obj = replace_ext(this.obj, '.o');

        // store master build
        this.master = master;

        // add to linker
        this.master.ld_files.push(this.obj);

        // build
        if (this.needs_build()) { this.build(); }
    }

    /**
     * Is the file a c/c++ source file?
     * @param file Path to file
     */
    private is_source(file: string) : boolean
    {
        const ext = path.extname(file);

        return ext === ".c" || ext === ".cpp";
    }

    /**
     * Does a source file need update?
     */
    private needs_build(): boolean
    {
        return !fs.existsSync(this.obj) || (fs.statSync(this.src)).mtime > ((fs.statSync(this.obj)).mtime);
    }

    /**
     * Build the source assciated to this object
     */
    private build()
    {
        // Make directory
        const out = path.dirname(this.obj);
        if (!fs.existsSync(out))
        {
            fs.mkdirSync(out, { recursive: true });
        }

        // Announce
        console.log(chalk.yellow(`building ${this.name}...`));

        // Execute build command
        execSync(`${this.master.compiler} -c ${this.src} -o ${this.obj} -I${this.master.src_root}`, { stdio: 'inherit' });
    }
}