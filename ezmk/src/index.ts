#!/usr/bin/env node

import chalk from 'chalk';
import clear from 'clear';
import path from 'path';
import help from './help_cmd/help';
import build from './build_cmd/build2';
import run from './run_cmd/run';
import { add } from './add_cmd/add';
import edit_process from './edit_cmd/edit';

switch (process.argv[2])
{
    case "help":
        help();
        break;
    case "build":
        new build(process.argv[3], process.argv[4]);
        break;
    case "run":
        run(process.argv[3], process.argv[4]);
        break;
    case "add":
        add(process.argv[3]);
        break;
    case "edit":
        new edit_process(process.argv[3]);
        break;
    default:
        console.log(chalk.redBright("Unknown command. Use 'ezmk help' for help."));
        break;
}
//

/* ezmk procedure
 *
 * > ezmk help
 * > ezmk build osx
 * > ezmk add bgfx
 * $ Created dependency bgfx. Use 'ezmk edit bgfx' to configure it.
 * > ezmk edit bgfx
 *      $ Editing dependency: bgfx
 *      $ Available commands:
 *          'help' // See available commands again
 *          'add <git url>' // Adds a git repository to this dependency
 *          'build' // Records your actions as you build this dependency
 *          'set <target> <path>' // Set the path to a .dylib or .dll for a platform
 *          'exit' // Stop editing this dependency
 *      > add https://github.com/bkaradzic/bgfx
 *      $ Added repository https://github.com/bkaradzic/bgfx to dependency bgfx
 *      > add https://github.com/bkaradzic/bx
 *      $ Added repository https://github.com/bkaradzic/bx to dependency bgfx
 *      > add https://github.com/bkaradzic/bimg
 *      $ Added repository https://github.com/bkaradzic/bimg to dependency bgfx
 *      > build
 *          $ ezmk will record all commands in this session...
 *          $ Build this dependency as you normally would
 *          $ Reminder: You're in the libs/bgfx/ working directory
 *          $ Use 'exit' when done
 *          > cd bgfx
 *          > make osx
 *          > exit
 *      $ Recording done. Use 'set <target> <path>' to set .dll/.dylib to a target
 *      > set osx-release bgfx/.build/osx64_clang/bin/libbgfx-shared-libRelease.dylib
 *      > set osx-debug bgfx/.build/osx64_clang/bin/libbgfx-shared-libDebug.dylib
 *      > exit
 * $ Finished editing dependency bgfx
 * 
 * 
 */