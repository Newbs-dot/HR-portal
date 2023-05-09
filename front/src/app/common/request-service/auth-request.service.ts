import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthRequestService {

    constructor(
        protected http: HttpClient
    ) {
    }

}