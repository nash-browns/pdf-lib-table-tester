import { faker } from '@faker-js/faker';
import { singlePageDefaults } from '../../lib/exampleDefaults';

export class SinglePage {
  constructor() {

  }

  get defaultSettings() {
    return singlePageDefaults();
  }

  get columnDefs() {
    return  [
      {
        columnId:'serial',
        header: 'Serial',
        type: 'text', //text/number/currency
      },
      {
        columnId:'product',
        header: 'Product',
        type: 'text', //text/number/currency
      },
      {
        columnId:'description',
        header: 'Description',
        type: 'text', //text/number/currency
      },
      {
        columnId:'department',
        header: 'Department',
        type: 'text', //text/number/currency
      },
      {
        columnId:'price',
        header: 'Price',
        type: 'text', //text/number/currency
      },
    ]
  }
    
  get data() {
    if (this._data) return this._data; //keep rows stable across redraws while settings change

    const dataTemplate = () => ({
      serial: faker.commerce.isbn(10),
      product: 'Gloves',
      description: faker.commerce.productDescription(),
      department: faker.commerce.department(),
      price: faker.commerce.price(),
    });

    this._data = faker.helpers.multiple(dataTemplate, {
      count: 8,
    });

    return this._data;
  }
}
