module.exports = async ({ getNamedAccounts, deployments }) => {
    const { firstAccount } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("Deploying wnft contract")
    await deploy("WrappedMyToken", {
        contract: "WrappedMyToken",
        from: firstAccount,
        log: true,
        args: ["WrappedMyToken", "WMT"]
    })
    log("wnft contract deployed successful")
}

//在我们的设计中，nft是部署在sourcechain上。在destinationchain中我们会部署wnft
module.exports.tags = ["destchain", "all"]