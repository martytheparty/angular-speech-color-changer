import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  recognition: any;

  constructor() {
    if ('SpeechRecongition' in window) {
      this.recognition =  new SpeechRecognition();
      console.log('Speech Recognition Exists');
    }  else if ('webkitSpeechRecognition' in window) {
      this.recognition =  new webkitSpeechRecognition();
      console.log('Using Webkit Speech Recognition');
    }

    if(this.recognition) {
      this.recognition.continuous = false;
      //this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;

      console.log('default lang',this.recognition.lang);

      this.recognition.start();

      this.recognition.onresult = (result: any) => {
        console.log('result', result);
      }
    } else {
      console.log('Speech recognition not supported!');
    }

    console.log('recognition',this.recognition);

  }
}
