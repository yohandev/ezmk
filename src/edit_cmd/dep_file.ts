import { target } from '../targets';
import fs from 'fs';
import chalk from 'chalk';

export default class dep_file
{
    public git: Set<string>;
    public build_actions: { [key in target]: string[] };
    public include: string[];

    constructor()
    {
        this.git = new Set<string>();
        this.include = [];
        this.build_actions = {} as any;
    }

    public read(path: string): void
    {
        const file = fs.readFileSync(path, 'UTF8');

        let current_build_action: target | undefined = undefined;
        let tokens: string[];
        file.split("\n").forEach(ln =>
        {
            ln = ln.trim();
            if (ln[0] === '#')
            {
                // ignore comments
                return;
            }
            
            if (ln[0] === '>')
            {
                // build actions
                if (!this.build_actions[current_build_action!])
                {
                    this.build_actions[current_build_action!] = [];
                }
                this.build_actions[current_build_action!].push(ln.substring(1));
                return;
            }

            tokens = ln.split(' ');

            switch (tokens[0])
            {
                case 'git':
                    this.git.add(tokens[1]);
                    break;
                case 'build':
                    current_build_action = tokens[1] as target;
                    break;
                case 'include':
                    this.include.push(tokens[1]);
                    break;
                case " ":
                case "":
                    break;
                default:
                    throw chalk.redBright(`An error occured while parsing ${path}. unknown token: ${tokens[0]}`);
            }
        });
    }

    public write(path: string): void
    {
        let file =
`# ezmk internal file
# DO NOT EDIT`;

        this.git.forEach(g => file += `\ngit ${g}`);
        this.include.forEach(i => file += `\ninclude ${i}`);
        for (let t in this.build_actions)
        {
            this.build_actions[t as target].forEach(a => file += `\n>${a}`);
        }

        fs.writeFileSync(path, file, 'UTF8');
    }
}