export const TOKEN = [
    // { regx: 'mail$'         , faker: 'internet.email'       , type: 'string' },
    {
        regx: 'mail$',
        type: 'string',
        faker: {
            "internet.email": ["#{name}"]
        }
    },
    { regx: 'phone$', faker: 'phone.phoneNumber', type: 'string' },
    { regx: 'cell', faker: 'phone.phoneNumber', type: 'string' },
    { regx: 'firstname', faker: 'name.firstName', type: 'string' },
    { regx: 'lastname', faker: 'name.lastName', type: 'string' },
    { regx: 'username', faker: 'name.findName', type: 'string' },
    { regx: 'name', faker: 'name.findName', type: 'string' },
    { regx: 'title', faker: 'name.title', type: 'string' },
    { regx: 'addr', faker: 'address.streetAddress', type: 'string' },
    { regx: 'dob', faker: 'date.past', type: 'date' },
    { regx: 'date$', faker: 'date.future', type: 'date' },
    { regx: 'time$', faker: 'date.future', type: 'date' },
    { regx: 'seq$', faker: 'random.number', type: 'integer' },
    { regx: 'id$', faker: 'random.number', type: 'integer' },
]
