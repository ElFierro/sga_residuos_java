import { AbstractControl } from "@angular/forms";
import { UserService } from "../services/user.service";
import { map } from "rxjs";

export class MyValidations{
    static validateEmail(userService: UserService) {
        return (control: AbstractControl) => {
          const value = control.value;
          return userService.checkEmail(value)
          .pipe(
            map(({isEmailAvailable}) =>(isEmailAvailable) ? {notAvailable:true} : null)
          );
        };
      }

      static validateEmailWithIdUser(userService: UserService, idUser: string) {
        return (control: AbstractControl) => {
          const value = control.value;
          return userService.checkEmailWithIdUser(value, idUser)
          .pipe(
            map(({isEmailAvailable}) =>(isEmailAvailable) ? {notAvailable:true} : null)
          );
        };
      }
}