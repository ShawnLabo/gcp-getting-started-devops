/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';
import { catchError, concatMap, delay, map, repeat } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  count: number = 0;

  constructor(private apiService: ApiService) { }

  reset() {
    this.count = 0;
  }

  beginNormalCountUp(): Observable<number> {
    return of(this.count).pipe(
      concatMap(() => this.apiService.accessNormalEndpoint()),
      map(res => {
        if (res.status === 200) this.count++;
        return this.count;
      }),
      catchError((err) => {
        return of(this.count);
      }
      ),
      delay(1000),
      repeat(),
    );
  }

  beginBenchCountUp(): Observable<number> {
    return of(this.count).pipe(
      concatMap(() => this.apiService.accessBenchEndpoint()),
      map(res => {
        if (res.status === 200) this.count++;
        return this.count;
      }),
      catchError((err) => {
        return of(this.count);
      }
      ),
      delay(2000),
      repeat(),
    );
  }
}
