const assert = require('assert');
const app = require('../../src/app');

describe('\'timerServices\' service', () => {
  it('registered the service', () => {
    const service = app.service('timerServices');

    assert.ok(service, 'Registered the service (timerServices)');
  });
});
