#!/usr/bin/env node

import ezmk from "./ezmk/ezmk";
import fs from 'fs';
import yaml from 'js-yaml';

// let fl = yaml.safeLoad(fs.readFileSync("bgfx.ezmk", 'UTF8'));

// console.log(fl);

// start
ezmk(process.argv);
