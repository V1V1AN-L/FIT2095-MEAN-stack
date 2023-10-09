import { Component } from '@angular/core';
import { io } from 'socket.io-client';

@Component({
  selector: 'app-string-translation',
  templateUrl: './string-translation.component.html',
  styleUrls: ['./string-translation.component.css']
})
export class StringTranslationComponent {
  socket: any;
  inputString: string = '';
  selectedLanguage: string = '';
  translatedText: string = '';

  constructor() {
    this.socket = io();
  }

  translateText() {
    this.socket.emit('inputString', { text: this.inputString, language: this.selectedLanguage });
    this.socket.on('translatedText', (translatedText: string) => {
      this.translatedText = translatedText;
    });
  }

}
