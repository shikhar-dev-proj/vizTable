import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { APIResponse } from "../types/api.response";

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {}

  private handleError(err: string): Promise<APIResponse> {
    return Promise.reject(err);
  }

  private handleResponse(promise: Promise<any>): Promise<APIResponse> {
    return promise.catch(this.handleError);
  }

  public doGet(url: string): Promise<APIResponse> {
    return this.handleResponse(this.http.get(url).toPromise());
  }
}