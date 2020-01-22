import { command } from './commands';
import { util } from './util';

command.list.push(
{
    name: 'run',
    args: '<target?> <compiler?>',
    desc: 'build & run the project',
    handler: args =>
    {
        // run after build
        util.cmd.run(command.run('build', args));
    }
});