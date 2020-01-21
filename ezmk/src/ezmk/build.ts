import { command } from "./commands"
import { meta } from "./meta";

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
        console.log(meta.get_data().binary);
    }
});