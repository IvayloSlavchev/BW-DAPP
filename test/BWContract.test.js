const { expect } = require('chai');
const { ethers } = require('hardhat');
const ERC20ABI = require('../artifacts/contracts/BWContract.sol/BWContract.json')

describe("BWContract", () => {
    let BWContract, bwcontract, deployer, addr1, addr2;
    beforeEach(async () => {
        BWContract = await ethers.getContractFactory("BWContract");
        bwcontract = await BWContract.deploy();
        await bwcontract.deployed();

        [deployer, addr1, addr2] = await ethers.getSigners();
    });

    describe("Buying a ticket, joining the oranization and leaving the organization", () => {
        it('Should buy a ticket, send the price to the contract and increase selled tickets', async () => {
            const buyATicket = await bwcontract.buyTicket("Dubai", {value: '500000000000000000' });
            expect(buyATicket).to.not.be.reverted;

            const balance = await bwcontract.viewBalance();
            expect(balance).to.be.equal('500000000000000000');

             const ticketsSelled = await bwcontract.selledTickets();
             expect(ticketsSelled).to.be.equal(1);
        });
        it('Should allow user to join as a participant in the DAO', async () => {
            const becomeAParticipant = await bwcontract.becomeParticipant({ value: '15000000000000000000' });
            expect(becomeAParticipant).to.not.be.reverted;

            const participantArrayTest = await bwcontract.getNumberOfPeople();
            expect(participantArrayTest).to.be.equal(1);
        });
        it("Should transfer money to the user, user should join in the DAO receive 2000 tokens, also he should be able to leave", async () => {
            await bwcontract.becomeParticipant({value: '15000000000000000000'})
            const stakedEtherTest = await bwcontract.stakedEther(deployer.address);
            expect(stakedEtherTest).to.be.equal('15000000000000000000');

            //User will leave the DAO and get back his money, but he will pay a tax for that
            await bwcontract.leaveDAO();
            const ownedTokens = await bwcontract.ownedTokens(deployer.address)
            expect(ownedTokens).to.be.equal(0);
            const stakedEtherAfterLeavingTheDAO = await bwcontract.stakedEther(deployer.address);
            expect(stakedEtherAfterLeavingTheDAO).to.be.equal(0);
        });
    })
    describe("If user doesn't provide correct values", () => {
        it('Should fail if user doesn\'t provide correct price for the ticket', () => {
            expect(bwcontract.buyTicket("LA", { value: '200000000000000000' })).to.be.reverted;
        });
        it('Should not allow user to join the DAO if doesn\'t provide enough ether', async () => {
            expect(bwcontract.becomeParticipant({value: '13000000000000000000'})).to.be.reverted;
            const stakedEtherTest = await bwcontract.stakedEther(deployer.address);
            expect(stakedEtherTest).to.be.equal(0);
        })
    })
})
