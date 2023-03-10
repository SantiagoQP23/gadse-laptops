

getFecha = () => {
  const fecha = new Date();

  var options = { year: 'numeric', month: 'long', day: 'numeric' };

  return fecha.toLocaleDateString("es-MX", options); // Saturday, September 17, 2016


}

getBase64ImageFromURL = (url) => {
  return new Promise((resolve, reject) => {
    var img = new Image();
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = () => {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/png");

      resolve(dataURL);
    };

    img.onerror = error => {
      reject(error);
    };

    img.src = url;
  });
}


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



generarPdfEstudiantes = async (estudiantes, representante, comuna, cedula, parroquia) => {

  console.log(representante, estudiantes);

  fecha = getFecha();

  var dd = '';

  dd = {
    footer: function(currentPage, pageCount, pageSize) {
      // you can apply any logic and return any valid pdfmake element
  
      return [{
        columns: [
          { text: 'Santa Elena, ' + fecha, alignment: 'left' },
          { text: currentPage, alignment: 'right' },
        ],
        margin: [20, 0, 20, 15]
      },
      ]
    },

    content: [

      {
        columns: [
          [
            { 
              columns: [
                {
                  image: await getBase64ImageFromURL('../img/laptop-1.jpg'),
                  width: 120,
                  height: 80,
                },
               {
                  text: 'REGISTRO DE ENTREGA DE LAPTOP',
                  style: 'header',
                  alignment: 'center',
                  margin: [0, 30, 0, 15]
                  
                },
                
              ]
              
            },

            {
              canvas: [
                { type: 'line', x1: 0, y1: 0, x2: 510, y2: 0, lineWidth: 1 }, //Up line
                
              ],
              margin: [0, 10]
            },

            
            {
              text: representante.REPRE_NOMBRE + " " + representante.REPRE_APELLIDO,
              alignment: 'center',
              style: 'subheader',
              margin: [0, 15, 0, 0]
      
            },
            {
              columns: [
                {
                  width: 90,
                  text: 'Cédula',
                },
                {
                  width: '*',
                  text: `${cedula}`
                }
              ],
              margin: [0, 15, 0, 10],
              style: 'prop'
            },
            {
              columns: [
                {
                  width: 90,
                  text: 'Parroquia',
                },
                {
                  width: '*',
                  text: `${parroquia}`
                }
              ],
              margin: [0, 0, 0, 10],
              style: 'prop'
              
            },
            {
              columns: [
                {
                  width: 90,
                  text: 'Comuna',
                },
                {
                  width: '*',
                  text: `${comuna}`
                }
              ],
              margin: [0, 0, 0, 10],
              style: 'prop'
              
            },
            {
              columns: [
                {
                  width: 90,
                  text: 'Barrio',
                  style: 'prop'
                },
                {
                  width: '*',
                  text: `${representante.REPRE_BARRIO}`
                }
              ],
              margin: [0, 0, 0, 10]
      
            },
            {
              columns: [
                {
                  width: 90,
                  text: 'Direccion',
                  style: 'prop'
                },
                {
                  width: '*',
                  text: `${representante.REPRE_DIRECCION}`
                }
              ],
              margin: [0, 0, 0, 10]
      
            },
            {
              columns: [
                {
                  width: 90,
                  text: 'Celular',
                  style: 'prop'
                },
                {
                  width: '*',
                  text: `${representante.REPRE_CELL}`
                }
              ],
              margin: [0, 0, 0, 10]
      
            },
            {
              columns: [
                {
                  width: 90,
                  text: 'Estudiantes',
                  style: 'prop'
                },
                {
                  width: '*',
                  text: `${estudiantes.length}`
                }
              ],
              margin: [0, 0, 0, 10]
      
            },
      
            {
      
              text: "Estudiantes", style: 'subheader',
              margin: [0, 15, 0, 15],
              alignment: 'center'
      
            },
      




          ],
          /*    type: 'rect',
     x: 15,
    y: 0, //could be negative to account for padding
    w: 30,
    h: 15,
   */
          {
            width: 10,
            canvas: [
              // { type: 'rect', x1: 0, y1: -80, x2: 0, y2: 150, color: 'green', lineWidth: 12}, //Up line
              {type: 'rect', x: 10, y: -80, w: 15, h: 200, color: 'green'},
              {type: 'rect', x: 10, y: 120, w: 15, h: 200, color: 'yellow'}
            ],

          },
        ]
      },




     


      estudiantes.map(function (est) {
        return [

          {
            columns: [
              {
                width: 90,
                text: 'Nombres',
              },
              {
                width: '*',
                text: `${est.EST_APELLIDOS} ${est.EST_NOMBRES}`,
                
              }
            ],
            margin: [0, 0, 0, 10],
            style: 'prop'

          },
          
          {
            columns: [
              {
                width: 90,
                text: 'Cédula',
              },
              {
                width: '*',
                text: `${est.CED_EST}`
              }
            ],
            margin: [0, 0, 0, 10],
            style: 'prop'
            
          },
          {
            columns: [
              {
                width: 90,
                text: 'Institución',
                style: 'prop'
              },
              {
                width: '*',
                text: `${est.INST_DESCRIP}`
              }
            ],
            margin: [0, 0, 0, 10],
            style: 'prop'
            
          },
          {
            columns: [
              {
                width: 90,
                text: 'Curso',
                style: 'prop'
              },
              {
                width: '*',
                text: `${est.EST_ANIO_BASICO}° de Bachillerato`
              }
            ],
            margin: [0, 0, 0, 10]
            
          },
          {
            columns: [
              {
                width: 90,
                text: 'Correo',
                style: 'prop'
              },
              {
                width: '*',
                text: `${est.EST_CORREO.replace('&#x40;', '@')}`
              }
            ],
            margin: [0, 0, 0, 10]
            
          },
          {
            columns: [
              {
                width: 90,
                text: 'Celular',
                style: 'prop'
              },
              {
                width: '*',
                text: `${est.EST_CELL}`
              }
            ],
            margin: [0, 0, 0, 25]

          },
          
          
          

 

        ]

      }),

      {
        pageBreak: 'before',
        text: 'Domicilio',
        style: 'subheader',
        alignment: 'center',
        margin: [0, 0, 0, 10]
      },





      {
        // if you specify both width and height - image will be stretched
        image: representante.REPRE_FOT_DOM,
        fit: [500, 800],

        alignment: 'center'

      },
      {
        text: 'Croquis',
        style: 'subheader',
        alignment: 'center',
        margin: [0, 20, 0, 10]
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
        fontSize: 17,
        bold: true,
        border: true

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


      },
      fecha: {
        alignment: 'right'
      },
      prop: {
        bold: true
      },

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