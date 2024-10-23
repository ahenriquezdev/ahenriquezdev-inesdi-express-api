const Ajv = require('ajv');
const ajv = new Ajv();

const employeeSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'integer' },
    phone: {
      type: 'object',
      properties: {
        personal: { type: 'string' },
        work: { type: 'string' },
        ext: { type: 'string' }
      },
    },
    privileges: { type: 'string' },
    favorites: {
      type: 'object',
      properties: {
        artist: { type: 'string' },
        food: { type: 'string' }
      },
    },
    finished: { type: 'array', items: { type: 'integer' } },
    badges: { type: 'array', items: { type: 'string' } },
    points: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          points: { type: 'integer' },
          bonus: { type: 'integer' }
        },
      }
    }
  },
  required: ['name', 'age', 'phone', 'privileges', 'favorites', 'finished', 'badges', 'points']
};

const validate = (data) => {
  return ajv.validate(employeeSchema, data);
}

module.exports = {
  validate
}
