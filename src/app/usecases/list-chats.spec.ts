import { TestBed } from '@angular/core/testing';

import { ListChats } from './list-chats';

describe('ListChats', () => {
  let service: ListChats;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListChats);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
