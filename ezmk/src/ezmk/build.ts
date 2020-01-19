import { command } from "./commands"

/**
 * Build command
 */
command.list.push(
{
    name: 'build',
    args: '<target?>',
    desc: 'build the project',
    handler: args =>
    {
        
    }
});