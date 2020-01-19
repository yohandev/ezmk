import fs from 'fs';
import path from 'path';
import edit_process from './edit';
import { execSync, exec } from 'child_process';
import chalk from 'chalk';
import Git, { Clone } from 'nodegit';

export default function git(master: edit_process, func: string, url: string)
{
    // Add
    if (getFunc(func) == 'add')
    {
        if (!clone(url, master.dep_path))
        {
            return; // error cloning
        }
        master.file.git.add(url);
    }
    else
    {
        fs.rmdirSync(path.join(master.dep_path, getName(url)), { recursive: true });
        master.file.git.delete(url);
    }
    // TODO push
}

function clone(url: string, dir: string): boolean
{
    console.log(chalk.cyan("Cloning ") + chalk.green(url) + chalk.cyan("..."));
    // try
    // {
    //     execSync(`cd ${path} && git clone --recursive ${url}`).toString();
    // }
    // catch (err)
    // {
    //     console.log(chalk.redBright(err));
    //     return false;
    // }
    Git.Clone.clone(url, path.join(dir, getName(url))).catch(err =>
    {
        console.log(chalk.redBright(err));
    });

    return true;
}

function getFunc(func: string): 'add' | 'rm'
{
    switch (func)
    {
        case 'add':
            return 'add';
        case 'rm':
        case 'remove':
            return 'rm';
        default:
            throw console.log(chalk.redBright("invalid git operation. use 'add' or 'rm'"));
    }
}

function getName(url: string): string
{
    return url.substring(url.lastIndexOf('/') + 1);
}