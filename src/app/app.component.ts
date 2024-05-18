import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SpeechServiceService } from './speech-service.service';


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

  colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];

  currentColor = 'beige';

  constructor() {
    effect(() => {
      if (this.sp.voiceResult() !== "") {
        this.setResult(this.sp.voiceResult())
      }
    });
  }


  record() {
    this.sp.record();
  }

  setResult(res: string) {
    this.result = `was: ${res}, is: ${res.replace(/\s+/g, '').toLowerCase()}`;
    this.currentColor = res.replace(/\s+/g, '').toLowerCase();
    //this.changeDetectorRef.detectChanges();
  }
}
