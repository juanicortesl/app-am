import { Injectable } from '@angular/core';
import { RegionesYcomunas } from '../mocks/regions';
@Injectable({
  providedIn: 'root',
})
export class RegionsService {
  constructor() {}
  getRegions() {
    return RegionesYcomunas;
  }
}
