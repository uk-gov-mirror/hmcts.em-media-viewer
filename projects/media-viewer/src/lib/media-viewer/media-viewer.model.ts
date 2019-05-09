import { Subject } from 'rxjs';

export class ActionEvents {
  rotate: Subject<RotateOperation>;
  search: Subject<SearchOperation>;
  zoom: Subject<ZoomOperation>;

  constructor() {
    this.rotate = new Subject<RotateOperation>();
    this.search = new Subject<SearchOperation>();
    this.zoom = new Subject<ZoomOperation>();
  }
}

export class RotateOperation {

  rotation: number;
  action = "rotate";

  constructor(rotation: number) {
    this.rotation = rotation;
  }
}

export class ZoomOperation {

  zoomFactor: number;
  action = "zoom";

  constructor(zoomFactor: number) {
    this.zoomFactor = zoomFactor;
  }
}

export class SearchOperation {

  searchTerm: string;
  previous: boolean;
  action = "search";

  constructor(searchTerm: string, previous?: boolean) {
    this.searchTerm = searchTerm;
    this.previous = previous;
  }
}
