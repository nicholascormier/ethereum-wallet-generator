import { ethers } from 'ethers';
import { writeFile } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import * as readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const outputPath = path.resolve(`./${randomUUID()}.txt`)

let prompt = () => new Promise( res => {
    rl.question('number of private keys to generate: ', val => { res(val); rl.close() } )
})

let numberOfTasks = await prompt()

let generatedKeys = [];

for (let i = 0; i < numberOfTasks; i++) {
    let wallet = ethers.Wallet.createRandom()
    console.log(`generated: ${wallet.privateKey}:${wallet.address} \r`)
    generatedKeys[i] = wallet.privateKey
}

if ( generatedKeys.length > 0 ) {
    await writeFile(outputPath, generatedKeys.join('\r\n'), { encoding: 'utf-8' })
    console.log(`output keys to: ${outputPath}`)
}

process.exit()