import inquirer from 'inquirer';
import { exec } from 'child_process';

const dependencies = [
    { name: 'express', checked: true },
    { name: 'body-parser', checked: true },
    { name: 'mongodb', checked: true },
    { name: 'mocha chai', checked: true },
    { name: 'mongoose', checked: true },
    { name: 'jsonwebtoken', checked: true },
    { name: 'passport', checked: true }
    ];

async function main() {
    const { action } = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Install Dependencies', 'Uninstall Dependencies', 'Exit']
        }
    ]);

    if (action === 'Exit') {
        console.log('Exiting.');
        return;
    }

    const answers = await inquirer.prompt([
        {
            type: 'checkbox',
            name: 'deps',
            message: `Select dependencies to ${action.toLowerCase()}:`,
            choices: dependencies
        }
    ]);

    const { deps } = answers;
    if (deps.length === 0) {
        console.log('No dependencies selected. Exiting.');
        return;
    }

    const command = action === 'Install Dependencies' ? 'install' : 'uninstall';
    console.log(`${action} ${deps.join(', ')}...`);

    const npmCommand = `npm ${command} ${deps.join(' ')}`;
    const npmProcess = exec(npmCommand);

    npmProcess.stdout.on('data', (data) => {
        console.log(data.toString());
    });

    npmProcess.stderr.on('data', (data) => {
        console.error(data.toString());
    });

    npmProcess.on('exit', (code) => {
        if (code === 0) {
            console.log(`Dependencies ${command}ed successfully.`);
        } else {
            console.error(`Failed to ${command} dependencies. Exit code: ${code}`);
        }
    });
}

main();
