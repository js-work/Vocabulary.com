#!/usr/bin/env node
var program = require('commander');

program
.version('0.0.6')
.command('hi [word]', 'add word to specific list')
.command('add <word>', 'add word to specific list')
.command('list', 'list add the list of yours')
.command('login <username> <password>', 'login')
.parse(process.argv);
