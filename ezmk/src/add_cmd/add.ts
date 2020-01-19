import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

export function add(name: string)
{
    // Determine absolute paths
    const root = process.cwd();
    const lib_root = path.join(root, 'lib');
    const dep_path = path.join(lib_root, name);

    // Create folder for dependency
    if (fs.existsSync(dep_path))
    {
        return console.log(chalk.redBright(`dependency ${name} already exists!`));
    }
    fs.mkdirSync(dep_path, { recursive: true });

    // Create .ezmk file
    fs.writeFileSync(path.join(dep_path, ".ezmk"), default_dep_file, { encoding: 'UTF8' });
}

const default_dep_file =
`# ezmk internal file
# DO NOT EDIT`;