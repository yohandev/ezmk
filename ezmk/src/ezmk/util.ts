import fs from 'fs';
import path from 'path';
import { exec, execSync } from 'child_process';
import chalk from 'chalk';

export namespace util
{
    export namespace dir
    {
        /**
         * walk recursively through a directory
         */
        export function walk(dir: string, func: (file: string) => void, walked: string = "")
        {
            const stream = fs.opendirSync(dir);
            let dirent: fs.Dirent;

            while ((dirent = stream.readSync()) !== null)
            {
                // recurse over sub-directories
                if (dirent.isDirectory())
                {
                    walk(path.join(dir, dirent.name), func, path.join(walked, dirent.name));
                    continue;
                }

                // call function on files
                func(path.join(walked, dirent.name));
            }
            stream.closeSync();
        }
    
        /**
         * make a directory if it doesn't exist
         */
        export function mk(path: string)
        {
            if (!fs.existsSync(path))
            {
                fs.mkdirSync(path, { recursive: true });
            }
        }
    }

    export namespace cmd
    {
        /**
         * execute a command and quit on errors
         */
        export function run(cmd: string)
        {
            try
            {
                execSync(cmd, { stdio: 'inherit' })
            }
            catch (err)
            {
                console.log(chalk.redBright(err));
                process.exit();
            }
        }
    }
}