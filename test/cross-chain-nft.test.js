const { getNamedAccounts, ethers, deployments } = require("hardhat")
const { expect } = require("chai")

let firstAccount
let ccipSimulator
let nft
let wnft
let nFTPoolLockAndRelease
let nFTPoolBurnAndMint

before(async function () {
    // prepare variables: contract, account
    firstAccount = (await getNamedAccounts()).firstAccount
    // 所有的合约都会部署
    await deployments.fixture("all")
    ccipSimulator = await ethers.getContract("CCIPLocalSimulator", firstAccount)
    nft = await ethers.getContract("MyToken", firstAccount)
    nFTPoolLockAndRelease = await ethers.getContract("NFTPoolLockAndRelease", firstAccount)
    wnft = await ethers.getContract("WrappedMyToken", firstAccount)
    nFTPoolBurnAndMint = await ethers.getContract("NFTPoolBurnAndMint", firstAccount)
})


describe("souce chain -> dest chain tests", async function () {

    it("test if user can mint a nft from nft contract successfully", async function () {
        await nft.safeMint(firstAccount)
        const owner = await nft.ownerOf(0)
        expect(owner).to.equal(firstAccount)
    })
})

// test if user can lock the nft in the pool on source chain

// test if user can mint the wnft in dest chain

// dest chain -> souce chain
//  test if user can burn the wnft and send ccip message on dest chain

//  test if user have the nft unlocked on source chain