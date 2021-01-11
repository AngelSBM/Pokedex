import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weight'
})
export class WeightPipe implements PipeTransform {

  transform(value: string): any {

    const weightNumber = parseInt(value);

    const weight = weightNumber / 10;

    return weight
    
  }

}
