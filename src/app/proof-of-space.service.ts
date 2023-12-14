import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProofOfSpaceService {
  private backendUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  generateProofOfSpace(userId: string, spaceSize: number, timeSpent: number): Observable<any> {
    const url = `${this.backendUrl}/generate-proof`;
    const requestBody = { userId, spaceSize, timeInterval: timeSpent };

    return this.http.post(url, requestBody);
  }

  getProofOfSpaceResult(userId: string): Observable<any> {
    const url = `${this.backendUrl}/proof-of-space-result/${userId}`;
    return this.http.get(url);
  }
}
