import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpeechServiceService } from './speech-service.service';
import { VoiceResponse } from './interfaces';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  sp: SpeechServiceService = inject(SpeechServiceService);
  result: string = '';
  addMessage = '';
  lastConfidence = 0;

  colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

  colorsDict: Dictionary = {};
  confidenceDict: Dictionary = {};

  currentColor = 'beige';

  constructor() {

    this.colors.forEach(
      (color: string) => {
        this.colorsDict[color] = 0;
        this.confidenceDict[color] = 0;
      }
    );

    effect(() => {
      if (this.sp.voiceResult() !== undefined) {
        const result = this.sp.voiceResult() as VoiceResponse;
        if (this.addMessage === "") {
          this.setResult(result.color, result.confidence);
        } else {
          this.addMessage = "";
          this.addNewColor(result.color, result.confidence);
        }

      }
    });
  }


  record() {
    this.sp.record();
  }

  setResult(res: string, confidence: number) {
    this.result = `was: ${res}, is: ${res.replace(/\s+/g, '').toLowerCase()}`;
    this.currentColor = res.replace(/\s+/g, '').toLowerCase();

    if (this.colorsDict[this.currentColor] !== undefined) {
      this.colorsDict[this.currentColor] = this.colorsDict[this.currentColor] + 1;
      this.confidenceDict[this.currentColor] =  confidence;
    } else {
      this.lastConfidence = confidence;
      setTimeout( () => {
        this.addMessage = `${this.currentColor} is not a color that I recognize.  Say "YES" to add it to the list.`
        this.record();
      }, 1000 );

    }
  }

  addNewColor(res: string, confidence: number) {
    if (res.toLowerCase() === 'yes') {
      this.colors.unshift(this.currentColor);
      this.colorsDict[this.currentColor] = 1;
      this.confidenceDict[this.currentColor] = this.lastConfidence;
    }

  }
}


type Dictionary = {
  [key: string]: number;
};