import { TestBed } from '@angular/core/testing';

import { CookieService } from './cookie.service';

describe('CookieService', () => {
  let service: CookieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should store a value to be retrieved',() => {
    service.setCookie('sample','value',1)
    expect(service.getCookie('sample')).toBe('value')
  })
  it('should delete a value if requested',() => {
    service.setCookie('sample','value',1)
    expect(service.getCookie('sample')).toBe('value')
    service.deleteCookie('sample')
    expect(service.getCookie('sample')).not.toBeDefined()
  })  
});
