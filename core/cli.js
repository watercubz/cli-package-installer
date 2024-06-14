import inquirer from "inquirer";
import { exec } from "child_process";
import chalk from "chalk";

const dependencies = [
  { name: "express", checked: true },
  { name: "body-parser", checked: true },
  { name: "mongodb", checked: true },
  { name: "mocha chai", checked: true },
  { name: "mongoose", checked: true },
  { name: "jsonwebtoken", checked: true },
  { name: "passport", checked: true },
];

async function listDependencies() {
  exec("npm list --depth=0", (err, stdout, stderr) => {
    if (err) {
      console.error(chalk.red(`Error listing dependencies: ${stderr}`));
      return;
    }
    console.log(chalk.green(`Dependencies:\n${stdout}`));
  });
}

async function getPackageInfo(packageName) {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    if (!response === 201) throw new Error("Package not found");
    const data = await response.json();
    console.log(chalk.blue(`Name: ${data.name}`));
    console.log(chalk.blue(`Version: ${data["dist-tags"].latest}`));
    console.log(chalk.blue(`Description: ${data.description}`));
  } catch (error) {
    console.error(chalk.red(`Error fetching package info: ${error.message}`));
  }
}

async function main() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What would you like to do?",
      choices: [
        "Install Dependencies",
        "Uninstall Dependencies",
        "List Dependencies",
        "Get Package Info",
        "Exit",
      ],
    },
  ]);

  if (action === "Exit") {
    console.log("Exiting.");
    return;
  }

  if (action === "List Dependencies") {
    await listDependencies();
    return;
  }

  if (action === "Get Package Info") {
    const { packageName } = await inquirer.prompt([
      {
        type: "input",
        name: "packageName",
        message: "Enter the package name:",
      },
    ]);
    await getPackageInfo(packageName);
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "checkbox",
      name: "deps",
      message: `Select dependencies to ${action.toLowerCase()}:`,
      choices: dependencies,
    },
  ]);

  const { deps } = answers;
  if (deps.length === 0) {
    console.log("No dependencies selected. Exiting.");
    return;
  }

  const command = action === "Install Dependencies" ? "install" : "uninstall";
  console.log(`${action} ${deps.join(", ")}...`);

  const npmCommand = `npm ${command} ${deps.join(" ")}`;
  const npmProcess = exec(npmCommand);

  npmProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  npmProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  npmProcess.on("exit", (code) => {
    if (code === 0) {
      console.log(`Dependencies ${command}ed successfully.`);
    } else {
      console.error(`Failed to ${command} dependencies. Exit code: ${code}`);
    }
  });
}

main();
