import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToolbarButtonVisibilityService } from '../toolbar-button-visibility.service';
import { ToolbarEventService } from '../toolbar-event.service';

@Component({
  selector: 'mv-tb-middle-pane',
  templateUrl: './middle-pane.component.html',
})
export class ToolbarMiddlePaneComponent {

  @ViewChild('zoomSelect') zoomSelect: ElementRef;

  icpSimplifiedToolbar = false;

  constructor(
    public readonly toolbarButtons: ToolbarButtonVisibilityService,
    public readonly toolbarEvents: ToolbarEventService) {
    this.toolbarEvents.icp.enabled.subscribe(simplify => this.icpSimplifiedToolbar = simplify);
  }

  zoom(zoomFactor: string) {
    this.toolbarEvents.zoom(+zoomFactor);
  }

  stepZoom(zoomFactor: number) {
    this.toolbarEvents.stepZoom(zoomFactor);
    this.zoomSelect.nativeElement.selected = 'selected';
  }

  rotate(rotation: number) {
    this.toolbarEvents.rotate(rotation);
  }
}
