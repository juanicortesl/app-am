import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'usersFilter',
})
export class UsersFilterPipe implements PipeTransform {
  transform(users: any[], options: any) {
    return users.filter((user) => {
      console.log(user.interests, 'INTERESTS');
      let userString = `${user.description?.toLowerCase()} ${user.first_name?.toLowerCase()} ${user.interests?.reduce(
        (acc: string, cur: string) => {
          return acc + ' ' + cur?.toLowerCase();
        },
        ''
      )}`;
      let isSearchInputOk = options.searchInput
        ? userString.includes(options.searchInput?.toLowerCase())
        : true;
      return isSearchInputOk;
    });
  }
}
