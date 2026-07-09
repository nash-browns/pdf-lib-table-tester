export const subheadingColumnDefs = [
  {
    parentId:'product', // this is the column that the subheader will line up with
    columnId:'type', 
    header: 'Type',
    type: 'text', //text/number/currency
    wrapText: true, //optional
  },
  {
    parentId: 'price', // this is the column that the subheader will line up with
    columnId:'total',
    header: 'Total',
    type: 'number', //text/number/currency
    wrapText: true, //optional
  }
]
