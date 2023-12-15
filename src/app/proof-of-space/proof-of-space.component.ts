import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProofOfSpaceService } from '../proof-of-space.service';
import { Subscriber, Subscription } from 'rxjs';

@Component({
  selector: 'app-proof-of-space',
  templateUrl: './proof-of-space.component.html',
  styleUrls: ['./proof-of-space.component.scss']
})
export class ProofOfSpaceComponent implements OnInit, OnDestroy {
  proofOfSpaceResults: { [userId: string]: any } = {};
  proofOfSpaceSubscription!: Subscription;
  awaitingProofOfSpace: { [userId: string]: boolean } = {};

  users = [
    { id: '1', name: 'Maks', spaceSize: 300, timeSpent: 300, rewardReceived: false },
    { id: '2', name: 'Hubert', spaceSize: 500, timeSpent: 1000, rewardReceived: false },
    { id: '3', name: 'Tomek', spaceSize: 400, timeSpent: 3500, rewardReceived: false },
    { id: '4', name: 'Basia', spaceSize: 1000, timeSpent: 9000, rewardReceived: false },
    { id: '5', name: 'Kasia', spaceSize: 100, timeSpent: 3000, rewardReceived: false },
    { id: '6', name: 'Michał', spaceSize: 50, timeSpent: 3000, rewardReceived: false },
    { id: '7', name: 'Krzyś', spaceSize: 200, timeSpent: 5000, rewardReceived: false },
    { id: '8', name: 'Alex', spaceSize: 100, timeSpent: 20000, rewardReceived: false },
    { id: '9', name: 'Zygmunt', spaceSize: 10000, timeSpent: 13000, rewardReceived: false },
    { id: '10', name: 'Kuba', spaceSize: 2000, timeSpent: 9000, rewardReceived: false },
  ];

  constructor(private proofOfSpaceService: ProofOfSpaceService) { }

  ngOnInit(): void {
    this.refreshProofOfSpaceResults();
  }

  generateProofOfSpace(user: any) {
    this.awaitingProofOfSpace[user.id] = true;
  
    this.proofOfSpaceSubscription = this.proofOfSpaceService.generateProofOfSpace(user.id, user.spaceSize, user.timeSpent).subscribe({
      next: (result) => {
        this.proofOfSpaceResults[user.id] = result.data;
      },
      error: (error) => {
        console.error('Error generating Proof of Space:', error);
      }
    });

  }
  
  ngOnDestroy() {
    this.proofOfSpaceSubscription.unsubscribe();
  }

  refreshProofOfSpaceResults() {
    for (const user of this.users) {
      this.proofOfSpaceService.getProofOfSpaceResult(user.id).subscribe({
        next: (result) => {
          this.proofOfSpaceResults[user.id] = result.data;
        },
        error: (error) => {
          console.error(`Error getting Proof of Space result for user ${user.id}:`, error);
        }
      });
    }
  }
}