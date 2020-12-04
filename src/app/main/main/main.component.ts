import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('rendererCanvas', { static: true })
  public rendererCanvas: ElementRef<HTMLCanvasElement>;

  constructor(public mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.createScene(this.rendererCanvas);
  }
}
