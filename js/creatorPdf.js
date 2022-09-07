
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



generarPdfEstudiantes = (estudiantes, representante, comuna, cedula) => {

  console.log(representante, estudiantes);


  var dd = {
    content: [
      { text: representante.REPRE_NOMBRE + " " + representante.REPRE_APELLIDO, style: 'header', alignment: 'center', },
      {

        text: `Cedula: ${cedula}`,
      },
      {

        text: `Comuna: ${comuna}`,
      },
      {

        text: `Barrio: ${representante.REPRE_BARRIO}`,
      },
      {

        text: `Direccion: ${representante.REPRE_DIRECCION}`,
      },
      {

        text: `Estudiantes registrados: ${estudiantes.length}`,
        margin: [0, 0, 0, 15]
      },

      {

        text: "Estudiantes", style: 'subheader',
      },
      estudiantes.map(function (item) {
        return [{ text: "Nombres: " + item.EST_NOMBRES + " " + item.EST_APELLIDOS },
        { text: "Cédula: " + item.CED_EST },
        { text: "Celular: " + item.EST_CELL },
        { text: "Correo: " + item.EST_CORREO.replace('&#x40;', '@') },
        {
          text: "Institución: " + item.INST_DESCRIP,
          margin: [0, 0, 0, 15]

        }]
      }),

      {
        // if you specify both width and height - image will be stretched
        image: representante.REPRE_FOT_DOM,
        fit: [500, 500],
        pageBreak: 'after',
        alignment: 'center'

      },
      {
        image: representante.REPRE_FOT_CRO,
        alignment: 'center',
        fit: [500, 500],
        // if you specify both width and height - image will be stretched
      },




    ]



    ,
    styles: {
      header: {
        fontSize: 18,
        bold: true,

      },
      subheader: {
        fontSize: 15,
        bold: true
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

generarTexto = (representante, comuna) => {
  const contenido = [
    { text: representante.REPRE_NOMBRE + " " + representante.REPRE_APELLIDO, style: 'header', alignment: 'center', },
    {

      text: `Cedula: ${representante.CED_REPRE}`,
    },
    // {

    //   text: `Comuna: ${comuna.COM_DESCRIP}`,
    // },
    {

      text: `Barrio: ${representante.REPRE_BARRIO}`,
    },
    {

      text: `Barrio: ${representante.REPRE_DIRECCION}`,
    },
    // {

    //   text: `Estudiantes registrados: ${estudiantes.length}`,
    // },
    {
      columns: [
        {
          // if you specify both width and height - image will be stretched
          image: representante.REPRE_FOT_DOM,
          width: 250,

        },
        {
          image: representante.REPRE_FOT_CRO,
          width: 250,
          // if you specify both width and height - image will be stretched
        },

      ]
    }

  ]
  return contenido;

}



generarPdfRepresentantes = async (representantes, institucion) => {

  let contenido = [];
  contenido = await representantes.map(async (r) => {

    const body = await obtenerDatos(`repre?ced=${r.CED_REPRE}`);
    console.log(body)
    const estudiantes = await obtenerDatos(`estrepre?ced=${r.CED_REPRE}`);
    console.log(estudiantes)



    const representante = body[0];

    const comuna = await obtenerComuna(representante.ID_PARROQUIA, representante.REPRE_COMUNA);
    console.log(comuna)

    const contenido = await generarTexto(representante, comuna);
    console.log(contenido)


    console.log(representantes, institucion);

    var dd = {
      content: [
        contenido

      ]


    }

    console.log("pdfff")
    pdfMake.createPdf(dd).open();
  });





  // TODO Recorrer el arreglo

  // TODO obtener representante por cedula

  // TODO obtener la comuna del representante

  // TODO obtener los estudiantes







  // var dd = {
  //   content: [
  //     { text: representante.REPRE_NOMBRE + " " + representante.REPRE_APELLIDO, style: 'header', alignment: 'center', },
  //     {

  //       text: `Cedula: ${cedula}`,
  //     },
  //     {

  //       text: `Comuna: ${comuna}`,
  //     },
  //     {

  //       text: `Barrio: ${representante.REPRE_BARRIO}`,
  //     },
  //     {

  //       text: `Barrio: ${representante.REPRE_DIRECCION}`,
  //     },
  //     {

  //       text: `Estudiantes registrados: ${estudiantes.length}`,
  //     },
  //     {
  //       columns: [
  //         {
  //           // if you specify both width and height - image will be stretched
  //           image: representante.REPRE_FOT_DOM,
  //           width: 250,

  //         },
  //         {
  //           image: representante.REPRE_FOT_CRO,
  //           width: 250,
  //           // if you specify both width and height - image will be stretched
  //         },

  //       ]
  //     }


  //     , {

  //       text: "Estudiantes", style: 'subheader',
  //     }
  //     , estudiantes.map(function (item) {
  //       return [{ text: "Nombres: " + item.EST_NOMBRES + " " + item.EST_APELLIDOS },
  //       { text: "Cédula: " + item.CED_EST },
  //       { text: "Celular: " + item.EST_CELL },
  //       { text: "Correo: " + item.EST_CORREO.replace('&#x40;', '@') },
  //       {
  //         text: "Institución: " + item.INST_DESCRIP,
  //         margin: [0, 0, 0, 15]

  //       }]
  //     })
  //   ]



  //   ,
  //   styles: {
  //     header: {
  //       fontSize: 18,
  //       bold: true,

  //     },
  //     subheader: {
  //       fontSize: 15,
  //       bold: true
  //     },
  //     table: {
  //       border: [false, false, false, false],
  //       fillColor: '#eeeeee',

  //     },
  //     tableHeader: {
  //       border: false,
  //       bold: true,
  //       fontSize: 13,
  //       color: 'white',
  //       fillColor: '#11E869'


  //     }
  //   }
  // }
  // pdfMake.createPdf(dd).open();
}