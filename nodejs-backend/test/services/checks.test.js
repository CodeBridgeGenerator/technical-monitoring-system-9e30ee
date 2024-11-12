const assert = require('assert');
const app = require('../../src/app');

describe('\'checks\' service', () => {
  it('registered the service', () => {
    const service = app.service('checks');

    assert.ok(service, 'Registered the service (checks)');
  });
});
