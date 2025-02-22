// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingPool {
    address public admin;
    string public poolName;
    uint256 public startTime;
    uint256 public endTime;
    string[] public candidates;
    mapping(string => uint256) public votesReceived;
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public isVoter;

    event VoteCasted(address indexed voter, string candidate);

    constructor(
        address _admin,
        string memory _poolName,
        uint256 _startTime,
        uint256 _endTime,
        string[] memory _candidates,
        address[] memory _voters
    ) {
        admin = _admin;
        poolName = _poolName;
        startTime = _startTime;
        endTime = _endTime;
        candidates = _candidates;

        for (uint256 i = 0; i < _voters.length; i++) {
            isVoter[_voters[i]] = true;
        }
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    modifier votingActive() {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Voting inactive");
        _;
    }

    modifier onlyRegisteredVoter(address voter) {
        require(isVoter[voter], "Not a registered voter");
        _;
    }

    function getPoolName() public view returns (string memory) {
        return poolName;
    }

    function getCandidates() external view returns (string[] memory) {
        return candidates;
    }

    function vote(string memory candidate) external votingActive onlyRegisteredVoter(msg.sender) {
        require(!hasVoted[msg.sender], "Already voted");
        hasVoted[msg.sender] = true;
        votesReceived[candidate] += 1;

        emit VoteCasted(msg.sender, candidate);
    }

    function getVoteCount(string memory candidate) external view onlyAdmin returns (uint256) {
        return votesReceived[candidate];
    }

    function getAllVotes() external view onlyAdmin returns (string[] memory, uint256[] memory) {
        uint256[] memory results = new uint256[](candidates.length);
        for (uint256 i = 0; i < candidates.length; i++) {
            results[i] = votesReceived[candidates[i]];
        }
        return (candidates, results);
    }
}

contract VotingFactory {
    address public admin;
    VotingPool[] public votingPools;
    mapping(address => bool) public isVoter;
    address[] public registeredVoters;

    event VotingPoolCreated(address indexed poolAddress, string poolName);
    event VoterAdded(address indexed voter);

    constructor(address[] memory _voters) {
        admin = msg.sender;
        for (uint256 i = 0; i < _voters.length; i++) {
            isVoter[_voters[i]] = true;
            registeredVoters.push(_voters[i]);
        }
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    function createVotingPool(
        string memory _poolName,
        uint256 _startTime,
        uint256 _endTime,
        string[] memory _candidates
    ) external onlyAdmin {
        VotingPool newPool = new VotingPool(
            msg.sender,
            _poolName,
            _startTime,
            _endTime,
            _candidates,
            registeredVoters
        );
        votingPools.push(newPool);

        emit VotingPoolCreated(address(newPool), _poolName);
    }

    function getAllPools() external view returns (VotingPool[] memory) {
        return votingPools;
    }

    function addVoter(address voter) external onlyAdmin {
        require(!isVoter[voter], "Voter already registered");
        isVoter[voter] = true;
        registeredVoters.push(voter);
        emit VoterAdded(voter);
    }

    function getRegisteredVoters() external view returns (address[] memory) {
        return registeredVoters;
    }

    function countVoters() external view returns (uint256) {
        return registeredVoters.length;
    }
}
