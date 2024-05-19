import { Injectable, signal } from '@angular/core';
import { VoiceResponse } from './interfaces';

declare var webkitSpeechRecognition: any;
declare var SpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechServiceService {
  recognition: any;
  voiceResult = signal<VoiceResponse | undefined>(undefined);

  constructor() {
    if ('SpeechRecongition' in window) {
      this.recognition =  new SpeechRecognition();
      console.log('Speech Recognition Exists');
    }  else if ('webkitSpeechRecognition' in window) {
      this.recognition =  new webkitSpeechRecognition();
      console.log('Using Webkit Speech Recognition');
    }
  }

  record() {
    if(this.recognition) {
      this.recognition.continuous = false;
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 1;
      this.recognition.start();
      this.recognition.onresult = (result: any) => {
        console.log(result.results[0][0]);
        this.voiceResult.set({color: result.results[0][0].transcript, confidence: result.results[0][0].confidence});
      }
    }
  }
}
