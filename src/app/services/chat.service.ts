import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:8080/demo/chat'; // Replace with your Spring Boot API URL

  constructor(private http: HttpClient) { }

  getChatResponse(message: string): Observable<string> {
    const params = new HttpParams().set('message', message);
    return this.http.post(this.apiUrl, null, { params, responseType: 'text' }).pipe(
      map(response => {
        try {
          // Try to parse the response as JSON
          const jsonResponse = JSON.parse(response);
          return jsonResponse.response; // Assuming the JSON has a 'response' field
        } catch (e) {
          // If parsing fails, assume it's plain text
          return response;
        }
      })
    );
  }
}
