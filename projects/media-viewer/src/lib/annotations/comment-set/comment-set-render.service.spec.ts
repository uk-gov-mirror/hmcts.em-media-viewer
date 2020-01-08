import { CommentSetRenderService } from './comment-set-render.service';
import { async, inject, TestBed } from '@angular/core/testing';
import { CommentComponent } from './comment/comment.component';
import { AnnotationService } from '../annotation.service';


describe('CommentSetRenderService', () => {
  const componentList = [
    {
      _rectangle: { x: 70, y: 30, height: 150, width: 200 },
      form: { nativeElement: {
          getBoundingClientRect: () =>  ({ height: 45 })
      }}
    },
    {
      _rectangle: { x: 40, y: 60, height: 100, width: 250 },
      form: { nativeElement: {
        getBoundingClientRect: () => ({ height: 55 })
      }}
    }
  ] as CommentComponent[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [CommentSetRenderService]
    })
      .compileComponents();
  }));

  it('should sort comment components, rotation 90',
    inject([CommentSetRenderService], (service: CommentSetRenderService) => {
      const commentList = [...componentList];
      service.sortComponents(commentList, 100, 90, 1);

      expect(commentList[0].rectTop).toBe(40);
  }));

  it('should sort comment components, rotation 180',
    inject([CommentSetRenderService], (service: CommentSetRenderService) => {
      const commentList = [...componentList];

      service.sortComponents(commentList, 100, 180, 1);

      expect(commentList[0].rectTop).toBe(-80);
  }));

  it('should sort comment components, rotation 270',
    inject([CommentSetRenderService], (service: CommentSetRenderService) => {
      const commentList = [...componentList];

      service.sortComponents(commentList, 100, 270, 1);

      expect(commentList[0].rectTop).toBe(-190);
  }));

  it('should sort comment components, rotation 0',
    inject([CommentSetRenderService], (service: CommentSetRenderService) => {
      const commentList = [...componentList];

      service.sortComponents(commentList, 100, 0, 1);

      expect(commentList[0].rectTop).toBe(30);
  }));

  it('should sort comment components, zoomed 200%',
    inject([CommentSetRenderService], (service: CommentSetRenderService) => {
      const commentList = [...componentList];

      service.sortComponents(commentList, 100, 0, 2);

      expect(commentList[0].rectTop).toBe(30);
    }));


});