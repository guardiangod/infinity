# API

This directory contains the source code for the Golang API of the Infinity.


## Technologies/Frameworks Used
- Go 1.16
- PostgreSQL 13
- Gin-Gonic 1.7.4


## How to Setup and Run
1. Start the PostgreSQL database by running `docker-compose` up in the `/api` directory.
2. In a separate terminal, run the API server by running `docker build -t infinity-api . && docker run -p 8080:8080 infinity-api`.
3. You can test the API by sending a POST request to `http://localhost:8080/nft` with a JSON body containing the NRIC and wallet address. The API will return a receipt in the response body.

Note that you may need to wait a few seconds after running `docker-compose up` for the PostgreSQL database to finish initializing before sending requests to the API.


## API Endpoints

### POST /nft
Create a new NFT record with the given NRIC and wallet address.

#### Request Body:
```json
{
  "nric": "S1234567A",
  "wallet_address": "0x1234567890123456789012345678901234567890"
}
```

#### Response Body:
```json
{
  "receipt": "S1234567A:0x1234567890123456789012345678901234567890"
}
```

The `receipt` is produced by concatenating the NRIC and wallet address.

#### Possible Errors:
- `400 Bad Request`: A record with the same NRIC or wallet address already exists in the database.


## Testing
To run the tests for the Golang API, run the following command in the `api` directory:
```sh
go test -v
```

This will run all the tests in the `api` directory and its subdirectories.


## License
This project is licensed under the Ryan-Le License.
