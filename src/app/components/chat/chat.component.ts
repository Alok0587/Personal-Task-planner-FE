import {AfterViewChecked, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewChecked {

  userQuestion: string = '';
  chatHistory: { question: string, answer: string }[] = [];

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(private chatService: ChatService) {
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  submitQuestion() {

    if (this.userQuestion.trim() === '') return; // Ignore empty input

    this.chatHistory.push({question: this.userQuestion, answer: '...'}); // Placeholder for the answer

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
    } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

}
