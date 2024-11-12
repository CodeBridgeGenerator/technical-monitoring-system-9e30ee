const assert = require('assert');
const app = require('../../src/app');

describe('\'checkListForms\' service', () => {
  it('registered the service', () => {
    const service = app.service('checkListForms');

    assert.ok(service, 'Registered the service (checkListForms)');
  });
});
