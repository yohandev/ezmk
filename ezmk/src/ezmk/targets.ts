export namespace targets
{
    /**
     * all the supported build targets
     */
    export const list =
    [
        'mac-debug'  , 'mac-release',
        'win32-debug', 'win32-release',
        'win64-debug', 'win64-release',
        'linux-debug', 'linux-release',
    ] as const;

    /**
     * target --> compiler map
     */
    export const compilers: { [key in type]: string } =
    {
        'mac-debug': 'clang++',
        'mac-release': 'clang++',
        'win32-debug': 'gcc',
        'win32-release': 'gcc',
        'win64-debug': 'gcc',
        'win64-release': 'gcc',
        'linux-debug': 'gcc',
        'linux-release': 'gcc'
    }

    /**
     * all the supported build targets as a type
     */
    export type type = typeof list[number];

    /**
     * infer target from platform
     */
    export function infer(): type
    {
        switch(process.platform)
        {
            case 'aix': throw 'platform not recognized';
            case 'android': throw 'platform not recognized';
            case 'cygwin': throw 'platform not recognized';
            case 'darwin': return 'mac-debug';
            case 'freebsd': throw 'platform not recognized';
            case 'linux': return 'linux-debug'
            case 'netbsd': throw 'platform not recognized';
            case 'openbsd': throw 'platform not recognized';
            case 'sunos': throw 'platform not recognized';
            case 'win32': return "win32-debug";
        }
    }
}