//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BWContract {
    uint256 public ticketPrice;
    uint256 public max_supply;
    uint256 public stakePrice;
    //Following how much tickets we have selled
    uint256 public selledTickets = 0;
    //0x253e05D045C99612c99B4b111d37E8026055af40    

    receive() external payable{}
    struct Participants {
        address[] stacker;
    }
    Participants[] participantsArray;
    address[] arrayParticipants;

    constructor(){
        ticketPrice = 500000000000000000;
        max_supply = 100000;
        stakePrice = 15 ether;
    }
    mapping(address => string) public lattestDestination;
    mapping(address => uint256) public ownedTokens;
    mapping(address => bool) public isParticipant;
    mapping(address => uint256) public boughtTickets;
    mapping(address => uint256) public stakedEther;

    //Events
    event buyATicket(
        string destination,
        uint boughtTicketsNumber    
    );
    event becomeAParticipant(
        bool isParticipant,
        uint256 ownedTokens
    );
    event leavingTheDAO(
        bool isParticipant,
        uint256 ownedTokens,
        uint256 stakedEther
    );
    

    function buyTicket(string memory _destination) public payable {
        require(msg.value >= ticketPrice, "You must pay 500000000000000000 wei");
        if(msg.value > ticketPrice){
            uint changeForUser = msg.value - ticketPrice;
            payable(msg.sender).transfer(changeForUser);
        }

        payable(address(this)).transfer(1);
        lattestDestination[msg.sender] = _destination;
        selledTickets++;
        boughtTickets[msg.sender] = selledTickets;
        emit buyATicket(_destination, boughtTickets[msg.sender]);
    }
    function becomeParticipant() public payable {
        require(isParticipant[msg.sender] == false, "You are already a member");
        require(msg.value == stakePrice, "You have to stake 15 ethers in order to become a member");
        require(max_supply <= 100000, "There is no more tokens avaiable, sorry :(");
        isParticipant[msg.sender] = true;
        //Token formula
         uint256 calculateTokens = max_supply *  2 / 100;
        ownedTokens[msg.sender] = calculateTokens;
        max_supply -= calculateTokens;
        //Pushing address into participant array
        arrayParticipants.push(msg.sender);
        Participants memory participants = Participants(arrayParticipants);
        participantsArray.push(participants);
        stakedEther[msg.sender] = stakePrice;

        emit becomeAParticipant(
            isParticipant[msg.sender],
            ownedTokens[msg.sender]
        );
    }
    function leaveDAO() public {
        require(isParticipant[msg.sender] == true, "You are not participant");
        isParticipant[msg.sender] = false;
         uint256 calculateTokens = max_supply *  2 / 100;
        payable(address(this)).transfer(calculateTokens);
        ownedTokens[msg.sender] = 0;
        max_supply += calculateTokens;
        payable(msg.sender).transfer(stakePrice);
        stakedEther[msg.sender] = 0;

        emit leavingTheDAO(
            isParticipant[msg.sender],
            ownedTokens[msg.sender],
            stakedEther[msg.sender]
        );
    }
    
    function getNumberOfPeople() public view returns(uint256){
            return participantsArray.length;
    }

    function viewBalance() public view returns(uint256){
        return address(this).balance;
    }
}