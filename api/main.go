package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

type NFTRequest struct {
	NRIC          string `json:"nric" binding:"required"`
	WalletAddress string `json:"wallet_address" binding:"required"`
}

func main() {
	// Set up database connection
	db, err := sql.Open("postgres", "host=db user=mercedes password=mercedes dbname=infinity sslmode=disable")
	if err != nil {
		panic(err)
	}
	defer db.Close()

	// Create Gin router
	router := gin.Default()

	// Create NFT endpoint
	router.POST("/nft", func(c *gin.Context) {
		// Parse request body
		var req NFTRequest
		if err := c.ShouldBindJSON(&req); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		// Check if NRIC already exists
		var count int
		if err := db.QueryRow("SELECT COUNT(*) FROM nft WHERE nric = $1", req.NRIC).Scan(&count); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
			return
		}
		if count > 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "nric already exists"})
			return
		}

		// Check if wallet address is already associated with an NRIC
		var walletCount int
		if err := db.QueryRow("SELECT COUNT(*) FROM nft WHERE wallet_address = $1", req.WalletAddress).Scan(&walletCount); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
			return
		}
		if walletCount > 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "wallet address already associated with an nric"})
			return
		}

		// Insert NRIC and wallet address into database
		if _, err := db.Exec("INSERT INTO nft (nric, wallet_address) VALUES ($1, $2)", req.NRIC, req.WalletAddress); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "database error"})
			return
		}

		// Produce receipt
		receipt := fmt.Sprintf("%s:%s", req.NRIC, req.WalletAddress)

		// Return receipt
		c.JSON(http.StatusOK, gin.H{"receipt": receipt})
	})

	// Start server
	if err := router.Run(":8080"); err != nil {
		panic(err)
	}
}
