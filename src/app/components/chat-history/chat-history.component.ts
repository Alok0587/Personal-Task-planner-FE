import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.css']
})
export class ChatHistoryComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  savedChats: string[] = [];

  getSavedChats() {
    return this.savedChats = ["Plan for my motorbike learning in 20 days.", "Plan for my algebra learning in 30 days.", "Plan for mastering data science learning in 1 months."];
  }

}
