import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class VerificationGuard implements CanActivate{

    constructor(private router: Router, private afAuth: AngularFireAuth){}

    canActivate():Observable<boolean>{
        return this.afAuth.authState.pipe(
            map( auth => {
                if(!auth.emailVerified){
                    this.router.navigate(['/verification']);
                    return false;
                }
                else{
                    return true;
                }
            })
        )
    }
}