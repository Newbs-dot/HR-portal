import { IAuthResponse } from '../dto';
import jwt_decode from 'jwt-decode';

export class AuthModel {

    public readonly role: string = '';

    public readonly token: string;

    public readonly refreshToken: string;

    public readonly email: string;

    constructor(
        authResponse: IAuthResponse
    ) {
        this.email = authResponse.email;
        this.token = authResponse.token;
        this.refreshToken = authResponse.refreshToken;
        this.role = jwt_decode<any>(authResponse.token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
}