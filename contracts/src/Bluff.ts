import { PrivateKey } from '@truffle/hdwallet-provider/dist/constructor/types';
import { Field, SmartContract, state, State, Bool, PublicKey, Signature, Poseidon, method } from 'o1js';

// Tictactoe example: https://github.com/o1-labs/zkapp-cli/blob/main/examples/tictactoe/ts/src/run.ts

// Game logic:
// 1. Randomly distribute the game to the players. Depending on the amount of players. some players may have more cards than others.
  // Maybe we'll need to keep it to a specific amount of player to make it simpler.
// 2. Take cards and play them. Say what it is
// 3. Anybody can say "Bullshit" at any time. If the person is right. The person that played the card gets them back. If the person is wrong. He gets the cards

// Simplified version:
// 1. Randomly distribute 13 cards per player to the 2 players.
// 2. Play in between 1 and 3 cards and say what it is. (e.g. 3 Aces)
// 3. Anybody can say "Bullshit" at any time. If the person is right, the person that played the card gets the stack. If the person is wrong, he gets the stack.


 export { Board };

// function Optional<T>(type: Provable<T>) {
//   return class Optional_ extends Struct({ isSome: Bool, value: type }) {
//     constructor(isSome: boolean | Bool, value: T) {
//       super({ isSome: Bool(isSome), value });
//     }

//     toFields() {
//       return Optional_.toFields(this);
//     }
//   };
// }

class OptionalBool extends Optional(Bool) {}

class Board {
  board: OptionalBool[][];

  constructor(serializedBoard: Field) {
  }

  serialize(): Field {

  }

  update(x: Field, y: Field, playerToken: Bool) {

  }

  printState() {

  }

  checkWinner(): Bool {
  }
}

export class Bluff extends SmartContract {

  @state(Field) shuffleSeed = State<Field>();
  @state(PublicKey) player1 = State<PublicKey>();
  @state(Field) player1Commitment = State<Field>();

  @state(PublicKey) player2 = State<PublicKey>();
  @state(Field) player2Commitment = State<Field>();

  init() {
    super.init();
    this.player1.set(PublicKey.empty());
    this.player2.set(PublicKey.empty());

    this.player1Commitment.set(Field.empty());
    this.player2Commitment.set(Field.empty());

    this.shuffleSeed.set(Field.empty());
  }


  @method commitRandomPlayer1(pubkey: PublicKey, random: Field) {
    this.player1.get().assertEquals(PublicKey.empty())
    this.player1Commitment.get().assertEquals(Field.empty())

    this.player1.set(pubkey)
    this.player1Commitment.set(Poseidon.hash(random))
  }

  @method commitRandomPlayer2(pubkey: PublicKey, random: Field) {
    this.player2.get().assertEquals(PublicKey.empty())
    this.player2Commitment.get().assertEquals(Field.empty())

    this.player2.set(pubkey)
    this.player2Commitment.set(Poseidon.hash(random))
  }

  @method revealRandom(privateKey: PrivateKey, signature: Signature,  random: Field) {
    // const commitment = player.equals(new Field(1))

    const pk = privateKey.toPublicKey();

    pk.equals(this.player1).or(pk.equals(this.player2)).assertEquals(true);
    Signature.verify(pk, random, signature);
    Poseidon.hash(random).equals(this.player1Commitment).or(Poseidon.hash(random).equals(this.player2Commitment)).assertEquals(true);

    let oldSeed = this.shuffleSeed.get()
    this.shuffleSeed.set(oldSeed+random)
  }


  @method draw() {

  }

  @method
  verify(value: Field) {

  }

  // @method play(pubkey: PublicKey, signature: Signature, x: Field, y: Field) {
  //   // 1. if the game is already finished, abort.
  //   this.gameDone.requireEquals(Bool(false)); // precondition on this.gameDone
  // }
}
