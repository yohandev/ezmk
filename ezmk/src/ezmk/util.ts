import fs from 'fs';
import path from 'path';

export namespace util
{
    export namespace dir
    {
        export function walk(dir: string, func: (file: fs.Dirent, walked: string) => void, walked: string = "")
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
                func(dirent, walked);
            }
            stream.closeSync();
        }
    }
}