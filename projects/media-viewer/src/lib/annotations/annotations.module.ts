import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgtUniversalModule } from '@ng-toolkit/universal';
import { AnnotationApiService } from './annotation-api.service';
import { AnnotationComponent } from './annotation.component';
import { RectangleComponent } from './rectangle/rectangle.component';
import { CommentComponent } from './comment/comment.component';
import { AngularDraggableModule } from 'angular2-draggable';
import { PopupToolbarComponent } from './rectangle/popup-toolbar/popup-toolbar.component';

@NgModule({
  imports: [
    NgtUniversalModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AngularDraggableModule
  ],
  declarations: [
    AnnotationComponent,
    RectangleComponent,
    CommentComponent,
    PopupToolbarComponent
  ],
  entryComponents: [
    AnnotationComponent
  ],
  providers: [
    AnnotationApiService
  ],
  exports: [
    AnnotationComponent
  ]
})
export class AnnotationsModule { }
