import { getCurrentUrlPath } from './browserUtils';

describe('getCurrentUrlPath', () => {
  const originalLocation = window.location;

  beforeAll(() => {
    // @ts-ignore
    delete window.location;
    // @ts-ignore
    window.location = { pathname: '' };
  });

  afterAll(() => {
    // @ts-ignore
    window.location = originalLocation;
  });

  it('should return true if the current URL path matches the given path', () => {
    window.location.pathname = '/test-path';
    expect(getCurrentUrlPath('/test-path')).toBe(true);
  });

  it('should return false if the current URL path does not match the given path', () => {
    window.location.pathname = '/test-path';
    expect(getCurrentUrlPath('/different-path')).toBe(false);
  });
});
