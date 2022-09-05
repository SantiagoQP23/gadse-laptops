
function buildTableBody(data, columns) {
  var body = [];

  body.push([{ text: 'CEDULA', style: 'tableHeader', border: [false, false, false, false], alignment: 'center' },
  { text: 'APELLIDOS', style: 'tableHeader', border: [false, false, false, false], alignment: 'center' },
  { text: 'NOMBRES', style: 'tableHeader', border: [false, false, false, false], alignment: 'center' },
  { text: 'PARROQUIA', style: 'tableHeader', border: [false, false, false, false], alignment: 'center' }]);

  data.forEach(function (row) {
    var dataRow = [];

    columns.forEach(function (column) {
      dataRow.push({
        text: row[column].toString(), border: [false, false, false, false],
      });
    })

    body.push(dataRow);
  });

  return body;
}

function table(data, columns) {
  return {
    table: {
      widths: [70, 'auto', 'auto', 100],
      headerRows: 1,
      body:
        buildTableBody(data, columns),
      style: 'table',

    },
    layout: {
      fillColor: function (rowIndex, node, columnIndex) {
        return (rowIndex % 2 === 0) ? '#F0F7F3' : null;
      }
    }
  };
}



generarPdf = (representantes, institucion) => {

  var dd = {
    content: [
      { text: institucion, style: 'header', alignment: 'center', },
      {

        text: `Representantes registrados: ${representantes.length}`,
        margin: [0, 20]
      },/* {

        table: {
          widths: [70, 'auto', 'auto', 100],
          headerRows: 1,
          body: ['CED_REPRE', 'REPRE_APELLIDO', 'REPRE_NOMBRE', 'PARR_DESCRIP']
        }
      } */

      table(representantes, ['CED_REPRE', 'REPRE_APELLIDO', 'REPRE_NOMBRE', 'PARR_DESCRIP'])
      ,

    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,

      },
      table: {
        border: [false, false, false, false],
        fillColor: '#eeeeee',

      },
      tableHeader: {
        border: false,
        bold: true,
        fontSize: 13,
        color: 'white',
        fillColor: '#11E869'
      }
    }

  }
  pdfMake.createPdf(dd).open();
}