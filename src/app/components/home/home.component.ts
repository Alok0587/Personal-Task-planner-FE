import { Component, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewChecked {
  userQuestion: string = '';
  chatHistory: { question: string, answer: string }[] = [];
  savedChats: string[] = [];

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(private chatService: ChatService) { }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  submitQuestion() {
    // if (this.userQuestion.trim()) {
    //   const answer = this.getAnswer(this.userQuestion);
    //   this.chatHistory.push({ question: this.userQuestion, answer });
    //   this.userQuestion = '';
    // }

    if (this.userQuestion.trim() === '') return; // Ignore empty input
    // Add the user's question to the chat history
    this.chatHistory.push({ question: this.userQuestion, answer: '...' }); // Placeholder for the answer

    // Call the Spring Boot API
    this.chatService.getChatResponse(this.userQuestion).subscribe({
      next: (response: string) => {
        // Update the last item in the chat history with the API response
        this.chatHistory[this.chatHistory.length - 1].answer = response;
      },
      error: (error: any) => {
        // Handle errors
        this.chatHistory[this.chatHistory.length - 1].answer = 'Error: Unable to fetch response.';
        console.error('Error fetching chat response:', error);
      },
      complete: () => {
        // Optional: Handle completion if needed
        console.log('API call completed.');
      }
    });
  }
  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch(err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  getSavedChats() {
    return this.savedChats=["Plan for my motorbike learning in 20 days.","Plan for my algebra learning in 30 days.","Plan for mastering data science learning in 1 months."];
  }
}
