import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '@envs/environment.development';

@Pipe({
  name: 'imageUrl',
})
export class ImageUrlPipe implements PipeTransform {
  transform(value: string, source: string = 'product'): unknown {
    if (value.startsWith('blob')) return value;

    return `${environment.baseUrl}/files/${source}/${value}`;
  }
}
