import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Rectangle } from './rectangle.model';
import { IResizeEvent } from 'angular2-draggable/lib/models/resize-event';

@Component({
  selector: 'mv-anno-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.scss']
})
export class RectangleComponent {

  @Input() selected: boolean;
  @Input() rectangle: Rectangle;
  @Input() color: String;
  @Input() zoom: number;
  @Input() draggable = true;

  @Output() click = new EventEmitter();
  @Output() update = new EventEmitter<Rectangle>();

  onClick() {
    this.click.emit();
  }

  onMove(el: HTMLElement) {
    const [left, top] = el.style.transform.match(/\d+/g);

    this.rectangle.x = +left / this.zoom;
    this.rectangle.y = +top / this.zoom;

    this.update.emit(this.rectangle);
  }

  onResize(event: IResizeEvent) {
    this.rectangle.width = event.size.width / this.zoom;
    this.rectangle.height = event.size.height / this.zoom;

    this.update.emit(this.rectangle);
  }
}
