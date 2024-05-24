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
  audioStart =  signal<VoiceResponse | undefined>(undefined);
  audioEnd =  signal<any>(undefined);

  resultCount = 0;

  constructor() {
    if ('SpeechRecongition' in window) {
      this.recognition =  new SpeechRecognition();
    }  else if ('webkitSpeechRecognition' in window) {
      this.recognition =  new webkitSpeechRecognition();
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
        console.log('1: Publish result')
        this.resultCount++;
        this.voiceResult.set({color: result.results[0][0].transcript, confidence: result.results[0][0].confidence, count: this.resultCount});
      }

      this.recognition.onend = (result: any) => {
        console.log("1: Publish End")
       this.audioEnd.set(result);
      }

      this.recognition.onaudiostart = (result: any) => {
        this.audioStart.set(result);
       
      }
    }

  }
}
