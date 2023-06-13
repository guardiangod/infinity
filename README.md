# Infinity

This repository contains the implementation of a Non-Fungible Token (NFT) portal that allows users to claim (mint) NFTs through a web interface.

The project consists of three main parts:

1. `smart-contracts/` - a set of Solidity smart contracts that define the NFT data structure and logic, and provide methods for minting and managing NFTs on the Ethereum blockchain.
2. `api/` - a backend API implemented using Go, which manages the storage and retrieval of NFT data in a PostgreSQL database.
3. `webapp/` - a React web application that allows users to mint and claim NFTs, and displays their metadata and images.


## Prerequisites
To run the project, you need to have the following tools installed:
- Node.js
- Docker
- Go
- Truffle


## Installation and Usage
To install and run the application, follow these steps:

1. Copy the project to your local machine and navigate to the project directory:
```sh
cd infinity
```

2. Install the dependencies for the API and the web app:
```sh
cd api
go mod download
cd ../webapp
npm install
cd ..
```
3. Create a `.env` file from the `.env.example` file and set the environment variables for the API:
```sh
cd api
cp .env.example .env
```

4. Start the Docker containers for the API and the PostgreSQL database:
```sh
docker-compose up -d
```

5. Deploy the smart contracts to the local blockchain:
```sh
cd smart-contracts
truffle migrate --reset
```

6. Start the API server:
```sh
cd ../api
npm run start
```

7. In another terminal, start the web app:
```sh
cd ../webapp
npm start
```

8. Open your web browser and go to `http://localhost:3000`.


## Testing
To run the tests for the API, run the following command in the `api` directory:
```sh
npm run test
```

To run the tests for the smart contracts, run the following command in the `smart-contracts` directory:
```sh
truffle test
```


## Project structure
Here's the structure for the repository:

infinity/
├── api/
│   ├── db/
│   │   ├── migrations/
│   │   │   ├── 0001_init.up.sql
│   │   │   ├── 0001_init.down.sql
│   │   ├── postgres/
│   │   │   ├── Dockerfiled
│   │   │   ├── init.sql
│   ├── docker-compose.yaml
│   ├── Dockerfile
│   ├── go.mod
│   ├── go.sum
│   ├── main.go
│   ├── README.md
├── smart-contracts/
│   ├── contracts/
│   │   ├── Migrations.sol
│   │   ├── NFT.sol
│   │   └── NFTMetadata.sol
│   ├── migrations/
│   │   ├── 1_initial_migration.js
│   │   └── 2_deploy_nft.js
│   ├── test/
│   │   └── nft.js
│   ├── package.json
│   ├── truffle-config.js
│   └── README.md
├── webapp/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── ClaimNFT.js
│   │   │   ├── NFTImage.js
│   │   │   ├── NFTMetadata.js
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── index.css
│   │   ├── index.js
│   ├── .dockerignore
│   ├── Dockerfile
│   ├── package.json
│   ├── docker-compose.yaml
│   └── README.md
├── .env.example
├── .gitignore
├── docker-compose.yaml
├── package.json
└── README.md


## License
This project is licensed under the Ryan-Le License.
