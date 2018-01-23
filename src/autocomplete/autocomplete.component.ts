import { Component, OnInit, Input,  Output, EventEmitter, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/combineLatest';

@Component({
  selector: 'auto-complete',
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('myInput') searchInput: NgModel;
  @Input('label') label: string;
  @Input('type') type: string;
  @Input('project') project: string;
  @Output() autocompleteSelected: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() create: EventEmitter<{}> = new EventEmitter<{}>();

  snapshot$;
  name = '';
  placeholder = '';
  items;
  existItems = true;

  constructor(private _af: AngularFirestore) {
  }

  ngOnInit() {
    this.placeholder = 'What ' + this.type + ' do you want?';
    this.snapshot$ = this._af.collection(this.type, ref => ref.where('projectId', '==', this.project))
    .snapshotChanges()
    .map(res => {
      return res.map(a => {
        const data = a.payload.doc.data();
        data.id = a.payload.doc.id;
        return data;
      });
    });

    this.items = this.searchInput.valueChanges
    .combineLatest(this.snapshot$)
    .map(([searchInput, dataArr]) => {
      if (!searchInput) return [];
      const filteredArr = dataArr.filter(item => item.name.startsWith(searchInput));
      this.existItems = filteredArr.length > 0 ? true : false;
      return filteredArr;
    });
  }

  onCreate(name) {
    this.create.emit({name, type:this.type});
  }

  selectItem(item) {
    this.name = item.name;
    this.existItems = false;
    this.autocompleteSelected.emit({item, type: this.type});
  }
}
