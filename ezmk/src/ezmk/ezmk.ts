import { command } from './commands';
import './help';
import './build';
import { meta } from './meta';

/**
 * all the supported build targets
 */
export const targets =
[
    'mac-debug'  , 'mac-release',
    'win32-debug', 'win32-release',
    'win64-debug', 'win64-release',
    'linux-debug', 'linux-release'
] as const;

/**
 * all the supported build targets as a type
 */
export type target = typeof targets[number];

/**
 * run ezmk
 */
export default function ezmk(args: string[])
{
    command.run(args[2], args.slice(3));
}