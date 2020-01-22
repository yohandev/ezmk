import { command } from './commands';
import './help';
import './build';
import './run';

/**
 * run ezmk
 */
export default function ezmk(args: string[])
{
    command.run(args[2], args.slice(3));
}