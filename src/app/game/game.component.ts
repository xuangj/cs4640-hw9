import { Component, OnInit } from '@angular/core';
import { WordleAppService } from '../wordle-app.service';

@Component({
  selector: 'app-game',
  standalone: false,
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'

})
export class GameComponent implements OnInit{
  backgroundColor = 'lightpink';
  pageClass = 'page-background';
  correctWord: string = '';
  userGuess: string = '';
  gameMessage: string = '';
  guesses: { word: string; correctChars: number; correctPlaces: number; lengthHint: string }[] = [];
  gameWon: boolean = false;

  constructor(private wordleService: WordleAppService) {}

  ngOnInit(): void {
    this.startNewGame();
  }

  startNewGame(): void {
    this.gameMessage = 'New game started, start guessing!';
    this.wordleService.getRandomWord().subscribe((response) => {
      this.correctWord = response.word.trim().toLowerCase();
      this.guesses = [];
      this.userGuess = '';
      this.gameWon = false;
    });
  }

  enterGuess(): void {
    const guess = this.userGuess.toLowerCase();
    if (!guess) return;  // prevent empty guess

    const correctChars = this.getCorrectChars(guess);
    const correctPlaces = this.getCorrectPlaces(guess);
    const lengthHint = this.getLengthHint(guess);

    this.guesses.push({ word: guess, correctChars, correctPlaces, lengthHint });

    if (guess === this.correctWord) {
      this.gameWon = true;
      this.gameMessage = "Nicely done! You got the wordle! Click 'Start new game' to play again!";
    } 
    this.userGuess = '';
  }

  getCorrectChars(guess: string): number {
    let totalCorrect = 0;
    const tempStr = this.correctWord.split('');
    for(let c of guess) {
      const index = tempStr.indexOf(c);
      if(index !== -1) {
        totalCorrect++;
        tempStr.splice(index, 1);
      }
    }
    return totalCorrect;
  }

  getCorrectPlaces(guess: string): number {
    let totalCorrect = 0;
    const minLen = Math.min(guess.length, this.correctWord.length);
    for(let i = 0; i < minLen; i++) {
      if(guess[i] === this.correctWord[i]){
        totalCorrect++;
      }
    }
    return totalCorrect;
  }

  getLengthHint(guess: string): string {
    if (guess.length > this.correctWord.length) return 'Guess is longer than correct word';
    if (guess.length < this.correctWord.length) return 'Guess is shorter than correct word';
    return 'Guess is right length';
  }
}
