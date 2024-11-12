const assert = require('assert');
const app = require('../../src/app');

describe('\'breakDownTickets\' service', () => {
  it('registered the service', () => {
    const service = app.service('breakDownTickets');

    assert.ok(service, 'Registered the service (breakDownTickets)');
  });
});
