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
  @Output() autocompleteSelected: EventEmitter<{}> = new EventEmitter<{}>();
  @Output() create: EventEmitter<{}> = new EventEmitter<{}>();

  snapshot$;
  name = '';
  placeholder = '';
  items;
  itemsCount = true;

  constructor(private _af: AngularFirestore) {
  }

  ngOnInit() {
    this.placeholder = 'What ' + this.type + ' do you want?';
    this.snapshot$ = this._af.collection(this.type)
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
      const filteredArr = dataArr.filter(item => item.name.startsWith(searchInput));
      this.itemsCount = filteredArr.length;
      return filteredArr;
    });
  }

  onCreate(name) {
    this.create.emit({name, type:this.type});
  }

  selectItem(item) {
    this.autocompleteSelected.emit({item, type: this.type});
  }
}
