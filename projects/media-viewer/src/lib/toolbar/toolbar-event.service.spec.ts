import {ToolbarEventService} from './toolbar-event.service';

describe('Toolbar Event Service', () => {
  let service: ToolbarEventService;
  beforeEach(() => {
    service = new ToolbarEventService();
    service.drawModeSubject.next(false);
    service.highlightModeSubject.next(false);
  });
  afterEach(() => {
    service = null;
  });
  it('should create', () => {
      expect(service).toBeTruthy();
  });
  it('should turn off drawMode if HighlightMode is toggled on', () => {
      service.highlightModeSubject.next(false);
      service.drawModeSubject.next(true);
      service.toggleHighlightMode();
      expect(service.drawModeSubject.getValue()).toBeFalsy();
  });
  it('should turn off drawMode if drawMode is toggled off', () => {
    service.drawModeSubject.next(true);
    service.toggleDrawMode();
    expect(service.drawModeSubject.getValue()).toBeFalsy();
  });
  it('should turn off HighlightMode if HighlightMode is toggled off', () => {
    service.highlightModeSubject.next(true);
    service.toggleHighlightMode();
    expect(service.highlightModeSubject.getValue()).toBeFalsy();
  });
  it('should turn off highlightMode is drawModel is toggled on', () => {
    service.highlightModeSubject.next(true);
    service.drawModeSubject.next(false);
    service.toggleDrawMode();
    expect(service.highlightModeSubject.getValue()).toBeFalsy();
  });

  it('should reset', () => {
    service.zoomValueSubject.next(2);
    service.drawModeSubject.next(true);
    service.reset();
    expect(service.zoomValueSubject.getValue()).toBe(1);
    expect(service.drawModeSubject.getValue()).toBeFalsy();
  });

});
