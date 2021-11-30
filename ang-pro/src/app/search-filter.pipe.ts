//yritin luoda hakukentän angular-pipen kautta, ei onnistunut :)
//myös ei onnistunut jostain syystä poistaa nämä 2 tiedostoa niin jätin tolleen
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'searchFilter' })
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    return list ? list.filter(item => item.name.search(new RegExp(filterText, 'i')) > -1) : [];
  }
}