import fs from 'fs';
import os from 'os';
import yaml from 'js-yaml';
import path from 'path';
import chalk from 'chalk';
import { target } from './ezmk';

export namespace meta
{
    /**
     * instance of meta data
     */
    let d: data | undefined = undefined;

    /**
     * get meta data
     */
    export const get_data = () => d ? d : d = find(process.cwd());

    /**
     * represents the .ezmk file
     */
    export class data
    {
        private readonly root: string;
        private readonly file: any;

        public readonly name: string;
        public readonly description: string;
        public readonly website: string;
        public readonly author: string;
        public readonly license: string;

        public readonly git: string[];
        public readonly web: string[];

        public readonly source: string[];
        public readonly include: string[];

        public readonly build: { [key in target]: string[] };
        public readonly binary: { [key in target]: string[] };


        constructor(fp: string | undefined)
        {
            this.root = fp ? path.dirname(fp) : process.cwd();
            this.file = fp ? yaml.safeLoad(fs.readFileSync(fp, 'UTF8')) : undefined;
            

            this.name = this.infer_name();
            this.description = this.infer_description();
            this.website = this.infer_website();
            this.author = this.infer_author();
            this.license = this.infer_license();

            this.git = this.infer_git();
            this.web = this.infer_web();

            this.source =  this.infer_source();
            this.include = this.infer_include();

            this.build = this.infer_build();
            this.binary = this.infer_binary();
        }

        private infer_name(): string
        {
            return this.file?.name ?? path.basename(path.dirname(process.cwd()));
        }

        private infer_description(): string
        {
            return this.file?.description ?? "n/a";
        }

        private infer_website(): string
        {
            return this.file?.website ?? "n/a";
        }

        private infer_author(): string
        {
            return this.file?.author ?? os.userInfo().username;
        }

        private infer_license(): string
        {
            return this.file?.license ?? "n/a";
        }

        private infer_git(): string[]
        {
            return this.file?.git ? [].concat(this.file.git) : [];
        }

        private infer_web(): string[]
        {
            return this.file?.web ? [].concat(this.file.web) : [];
        }

        private infer_source(): string[]
        {
            // already defined
            if (this.file?.source)
            {
                return [].concat(this.file.source);
            }

            // infer
            return ["src", "source", "sources", "Source", "Sources", "Src", "SRC"]
                .filter(p => fs.existsSync(path.join(this.root, p)))
                .map(p => path.join(this.root, p));
        }

        private infer_include(): string[]
        {
            // already defined
            if (this.file?.include)
            {
                return [].concat(this.file.include);
            }

            // infer
            let out = ["inc", "include", "Include", "Inc", "INC"]
                .filter(p => fs.existsSync(path.join(this.root, p)))
                .map(p => path.join(this.root, p));
            
            // use src folder if no explicit inc
            return out.length === 0 ? this.source : out;
        }

        private infer_build(): { [key in target]: string[] }
        {
            // create empty
            let out = { } as { [key in target]: string[] };

            // set build actions
            for (let p in this.file?.build)
            {
                out[p as target] = [].concat(this.file.build[p]);
            }
            return out;
        }

        private infer_binary(): { [key in target]: string[] }
        {
            // create empty
            let out = { } as { [key in target]: string[] };

            // set build actions
            for (let p in this.file?.binary)
            {
                out[p as target] = [].concat(this.file.binary[p]);
            }
            return out;
        }
    }

    /**
     * find the meta data file
     */
    function find(dir: fs.PathLike): data
    {
        let found = fs.readdirSync(dir).find(f => path.extname(f) === '.ezmk' || path.basename(f) === '.ezmk');
        if (!found) // inform user .ezmk file is optional but recommended
        {
            console.log
            (
                chalk.cyan(".ezmk file not found. using ")
                + chalk.green("cache-less mode")
                + chalk.cyan(". (optional) use ")
                + chalk.green("ezmk init ")
                + chalk.cyan("to initialize a project")
            );
        }

        return new data(found);
    }
}