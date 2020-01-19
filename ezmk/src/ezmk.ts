import { command } from './commands';
import './help';

/**
 * All the supported build targets
 */
export type target = 
    'mac-debug'   | 'mac-release'   |
    'win32-debug' | 'win32-release' |
    'win64-debug' | 'win64-release' |
    'linux-debug' | 'linux-release' ;

/**
 * Run ezmk
 */
export default function ezmk(args: string[])
{
    command.run(args[2], args.slice(3));
}
