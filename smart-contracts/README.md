# Smart Contracts

This folder contains the smart contracts for the Infinity. The smart contract is built using Solidity language and implements the ERC-721 standard for non-fungible tokens.


## Requirements
- Solidity version 0.8.0 or higher
- Truffle Framework


## Getting started

### Installation
To install the dependencies, run the following command:
```sh
npm install
```

### Usage
1. To compile the smart contract, run the following command:
```sh
truffle compile
```

The `truffle compile` command will compile the Solidity smart contracts and generate the necessary JSON files in the `build/contracts` directory.

2. To deploy the smart contract, run the following command:
```sh
truffle migrate
```

The `truffle migrate` command will deploy the smart contracts to the blockchain. By default, it will use the development network. You can change the network settings in the `truffle-config.js` file.

3. To deploy the smart contract, run the following command:
```sh
truffle test
```

The `truffle test` command will run the test suite for the smart contracts, which is located in the `test` directory. It uses the Ganache CLI to spin up a local blockchain for testing.

Note that you will need to have a running instance of Ganache CLI in order to run the tests. Alternatively, you can specify a different network in the `truffle-config.js` file.


## Structure
The folder structure of this project is as follows:
smart-contracts/
├── contracts/
│   ├── Migrations.sol
│   ├── NFT.sol
│   └── NFTMetadata.sol
├── migrations/
│   ├── 1_initial_migration.js
│   ├── 2_deploy_nft.js
├── test/
│   └── nft.js
├── package.json
├── truffle-config.js
└── README.md

- `contracts/`: Contains the smart contract files.
- `migrations/`: Contains the deployment scripts.
- `test/`: Contains the test scripts.
- `package.json`: Contains the dependencies and scripts for the project.
- `truffle-config.js`: Contains the configuration for Truffle.
- `README.md`: Contains information about the smart contracts.


## License
This project is licensed under the Ryan-Le License.
