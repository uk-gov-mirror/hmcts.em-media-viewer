import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
import { ElementRef, Injectable } from '@angular/core';
import { DocumentLoadProgress, PdfJsWrapper } from './pdf-js-wrapper';
import { Subject } from 'rxjs';
import { ToolbarEventService } from '../../../toolbar/toolbar-event.service';

@Injectable({providedIn: 'root'})
export class PdfJsWrapperFactory {

  private linkService: pdfjsViewer.PDFLinkService;
  private eventBus: pdfjsViewer.EventBus;
  private pdfJsWrapper: PdfJsWrapper;

  constructor(
    private readonly toolbarEvents: ToolbarEventService) {
    this.linkService = new pdfjsViewer.PDFLinkService();
    this.eventBus = new pdfjsViewer.EventBus();
  }

  public create(container: ElementRef): PdfJsWrapper {
    const pdfFindController = new pdfjsViewer.PDFFindController({
      linkService: this.linkService,
      eventBus: this.eventBus
    });

    const pdfViewer = new pdfjsViewer.PDFViewer({
      container: container.nativeElement,
      linkService: this.linkService,
      findController: pdfFindController,
      eventBus: this.eventBus,
      imageResourcesPath: '/assets/images/'
    });

    this.linkService.setViewer(pdfViewer);

    this.pdfJsWrapper = new PdfJsWrapper(
      pdfViewer,
      new pdfjsViewer.DownloadManager({}),
      this.toolbarEvents,
      new Subject<string>(),
      new Subject<DocumentLoadProgress>(),
      new Subject<any>(),
      new Subject(),
      new Subject<{pageNumber: number, source: {rotation: number, scale: number, div: HTMLElement}}>()
    );

    return this.pdfJsWrapper;
  }

  public getLinkService() {
    return this.linkService;
  }

  public navigateTo(destination: any[]) {
    this.pdfJsWrapper.navigateTo(destination);
  }
}
