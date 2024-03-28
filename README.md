### About the project 
Simplified version of the card game Bluff
- Randomly distribute 13 cards per player to the 2 players. 
- The remaining cards are discarded.
- Play in between 1 and 4 cards and say what it is (e.g., 3 Aces)
- Any player can say "Bluff" at any time. If the last player was bluffing, he gets the stack. If he wasn’t bluffing, the player that said “bluff” gets the stack.

**Zk-Aspect** proves if a player was bluffing or not without revealing the cards.

### Implementation Challenges
- **State Management:**
  Keeping track of game state (e.g., cards in play, turns, and claims made) that is both private and verifiable. Ensuring the state is updated accurately while using zk-SNARKs for verification requires careful planning.

- **Cost of Transactions:**
  Depending on how the game is implemented on the Mina Protocol, the cost associated with transactions (for submitting proofs, for example) could become a factor. It's important to optimize the number and size of transactions to keep the game affordable.

- **Proof Size and Verification Time:**
  While zk-SNARKs are known for their efficiency, the size of the proofs and the time required to verify them can still be significant, depending on the complexity of the game logic. Optimizing both proof size and verification time without compromising security is essential.

- **Trustless Deck Shuffling:**
  Implementation of the deck shuffling mechanism takes effort as the source of randomness should be trustless and reliable, as we can’t use on-chain data to generate this random. Thus, the source of entropy should be collected from players.

- **Claim/Challenge Mechanism:**
  An in-protocol way to validate and prove players' claims without revealing additional meta-information.

- **Punish Inactivity:**
  There should be a mechanism to prevent a losing player from stopping making turns and stalling the game forever.

### Addressing the challenges
