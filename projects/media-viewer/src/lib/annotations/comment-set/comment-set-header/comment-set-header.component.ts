import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewEncapsulation} from '@angular/core';
import { Annotation } from '../../annotation-set/annotation-view/annotation.model';
import {select, Store} from '@ngrx/store';
import * as fromStore from '../../../store/reducers';
import * as fromTagSelectors from '../../../store/selectors/tags.selectors';
import * as fromAnnoSelector from '../../../store/selectors/annotations.selectors';
import {combineLatest, Subscription} from 'rxjs';

@Component({
  selector: 'mv-comment-set-header',
  templateUrl: './comment-set-header.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CommentSetHeaderComponent implements OnInit, OnDestroy {

  @Input() public showCommentSummary: boolean;
  @Output() public readonly showCommentSummaryDialog = new EventEmitter();

  tabs: {isFiltered?: boolean; label: string}[] = [];
  tabSelected = 'comments';
  isFiltered: boolean;
  navigationList: Annotation[];
  $ubscriptions: Subscription;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit(): void {
    const tagFilter$ = this.store.pipe(select(fromTagSelectors.getTagFilters));
    const filteredAnnotation$ = this.store.pipe(select(fromAnnoSelector.getFilteredAnnotations));

    this.$ubscriptions = combineLatest([tagFilter$, filteredAnnotation$]).subscribe(([formData, filteredAnno]) => {
      this.navigationList = filteredAnno;
      this.tabs = this.navigationList.length > 0 ?
        [{label: 'comments'}, {label: 'filter'}, {label: 'search'}] : [{label: 'comments'}];
      this.isFiltered = !formData.length;
      this.tabs = [...this.tabs].map((tab) => {
        return !this.isFiltered && tab.label === 'filter' ? {...tab, isFiltered: true} : {...tab, isFiltered: false};
      });
    });
  }

  public toggleCommentsSummary(): void {
    this.showCommentSummaryDialog.emit();
  }

  selectTab(tab: string) {
    this.tabSelected = tab !== this.tabSelected ? tab : undefined;
  }

  ngOnDestroy(): void {
    this.$ubscriptions.unsubscribe();
  }
}
