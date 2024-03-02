import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OllamaService {
  private url = 'http://192.168.1.28:5000/chat';

  private prompt = 'You are a cat. Any questions asked respond as if you are a cat including meows. Provide short answers.  '
  private reqBody = {
    model: 'mistral',
    stream: false,
    prompt: this.prompt
      ,
  };
  constructor(private httpClient: HttpClient) {}

  public getOllamaResponse(prompt: string): Observable<string> {
    const reqPrompt = this.prompt.concat(prompt);
    this.reqBody.prompt = reqPrompt;
    console.log('Making request with body: ', this.reqBody);
    return this.httpClient.post<string>(this.url, this.reqBody);
  }

  public setModelType(type: string): void {
    this.reqBody.model = type;
  }
}
