const BASE_URL = 'http://128.201.163.185:8080/wsRegistro/api/v1/services/';


/* 
  .then(function (response) {
            return response.arrayBuffer();
        })
        .then(function (buffer) {
            const decoder = new TextDecoder('iso-8859-1');
            const text = decoder.decode(buffer);
            console.log(text);
            */

// const obtenerDatos = async (url) => {
//   try {
//     const resp = await fetch(BASE_URL + url, {
//       headers: {
//         //'Accept': 'application/json',
//         //'Content-Type': 'application/json'
//         //'Content-Type': 'json',
//         'Content-Type': 'application/x-www-form-urlencoded',
//         //'Content-Type': 'text/plain; charset=ISO-8859-1',
//       }

//     }
//     );

//     const body = resp.json();    



//     return body;
//   } catch (error) {
//     return false;
//   }
// }

const obtenerDatos = async (url) => {
  const data = $.ajax({
    type: "GET",
    url: BASE_URL + url,
    dataType: "json",
    async: true,
    success: function (data) {
      return data;

    },
   
  });
  return data;
}
const obtenerDatosAjax = async (url) => {
  const data = $.ajax({
    type: "GET",
    url: BASE_URL + url,
    contentType: "application/x-www-form-urlencoded;charset=ISO-8859-15",
    //contentType: 'application/xml;charset=ISO-8859-1',
    dataType: "json",
    success: function (data) {
      return data;

    },
    error: function (data) {
      //alert('error');
    },
    complete: function () {

    }
  });
  return data;
}


const alertaHtml = (mensaje) => {
  const alerta = `<div class="alert alert-danger" role="alert">
      ${mensaje}
    </div>`;

  return alerta;
}


const abrirImagen = (imagen) => {
  var imagenCro = new Image();
  imagenCro.src(imagen);
  window.open(imagenCro, "_blank");


}





const mostrarCantones = async () => {

  const data = await obtenerDatos('cantones');
  await obtenerDatos('cantones');
  const selectCantones = document.querySelector('#select-cantones');


  data.forEach(canton => {
    selectCantones.innerHTML += `<option value="${canton.ID_CANTON}">${canton.CAN_DESCRIPCION}</option>`;
  });

  const idCanton = data[0].ID_CANTON;
  selectCantones.value = idCanton;

  mostrarParroquias(idCanton);

}


const mostrarParroquias = async (idCanton) => {

  const insertarComunas = document.querySelector('#select-comunas');

  insertarComunas.disabled = true;

  insertarComunas.innerHTML = "";

  const data = await obtenerDatos(`parroquias?canton=${idCanton}`);

  const insertarParroquia = document.querySelector('#select-parroquias');
  insertarParroquia.disabled = false;
  insertarParroquia.innerHTML = `<option selected disabled value="">Elija una...</option>`;

  data.forEach(parroquia => {
    insertarParroquia.innerHTML += `<option value="${parroquia.ID_PARROQUIA}">${parroquia.PARR_DESCRIP}</option>`;

  });


}



const mostrarComunas = async (idParroquia) => {

  const insertarComunas = document.querySelector('#select-comunas');


  const data = await obtenerDatos(`comunas?parroquia=${idParroquia}`);

  if (!data) {
    insertarComunas.disabled = true;
    return;
  }
  insertarComunas.disabled = false;


  insertarComunas.innerHTML = "";
  data.forEach(comuna => {
    insertarComunas.innerHTML += `<option value="${comuna.ID_COMUNA}">${comuna.COM_DESCRIP}</option>`;

  });



}
const obtenerComuna = async (idParroquia, idComuna) => {
  const comunas = await obtenerDatos(`comunas?parroquia=${idParroquia}`);

  console.log(comunas);
  const comuna = comunas.find(com => com.ID_COMUNA === idComuna);
  console.log(comuna)
  return comuna;
}


const mostrarInstituciones = async (idParroquia) => {

  const cargando = `   
  <div id="cargando-instituciones" class="">
    <div class="spinner-grow text-success" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-primary" role="status">
      <span class="sr-only">Loading...</span>
    </div>
    <div class="spinner-grow text-info" role="status">
      <span class="sr-only">Loading...</span>
    </div>

</div>
`




  const accordionInstituciones = document.querySelector('#accordion-instituciones');



  accordionInstituciones.innerHTML = cargando;

  const data = await obtenerDatos(`parrinst?parroquia=${idParroquia}`);
  console.log(data)

  if (!data) {
    accordionInstituciones.innerHTML = alertaHtml('No se han registrado instituciones');
    return;
  }


  accordionInstituciones.innerHTML = '';

  data.forEach(inst => {
    accordionInstituciones.innerHTML += `
    <div class="card">
    <div class="card-header d-flex justify-content-between" id="headingOne">
    <h5 class="mb-0">
    
          ${inst.INST_DESCRIP}
          
          </h5>
          <button class="btn btn-sm  align-right btn-primary" type="button" data-toggle="collapse"
            data-target="#collapse${inst.ID_INSTITUCION}" onclick="mostrarRepresentantes('${inst.ID_INSTITUCION}', '${inst.INST_DESCRIP}')" aria-expanded="true" aria-controls="collapseOne">
            <i class="bi bi-eye"></i>

            </button>
            
            </div>
            
            <div id="collapse${inst.ID_INSTITUCION}" class="collapse " aria-labelledby="headingOne" data-parent="#accordionExample">
            <section id="section-${inst.ID_INSTITUCION}" class="p-2">
            
            <button class="btn btn-primary" id="pdf-${inst.ID_INSTITUCION}">Generar pdf</button>
            <button class="btn btn-primary" id="pdf-ins-${inst.ID_INSTITUCION}">Generar pdf institución</button>
            
            
            
            <table id="data-table-${inst.ID_INSTITUCION}" class="table table-striped table-bordered dt-responsive nowrap" width="100%" >
            <thead>
            <tr>
            <th>Cedula</th>
            <th>Apellidos</th>
            <th>Nombres</th>
            <th>Parroquia</th>
            </tr>
            </thead>
            </table>
            
            </section> 
            <div class="card-body">
            
            </div>
            </div>
    </div>`;


  });



}




const mostrarRepresentantes = async (idInstitucion, institucion) => {


  const representantes = await obtenerDatos(`repreins?inst=${idInstitucion}`);

  if (!representantes) {
    const seccionDatos = document.querySelector(`#section-${idInstitucion}`);

    seccionDatos.innerHTML = alertaHtml('No se han registrado representantes');
    return;
  }

  const resp = await fetch('../js/idioma.json');

  const configIdioma = await resp.json();

  const btnGenerarPdf = document.querySelector(`#pdf-${idInstitucion}`);


  btnGenerarPdf.addEventListener('click', function () {

    generarPdf(representantes, institucion);

  });
  const btnGenerarPdfInstituciones = document.querySelector(`#pdf-ins-${idInstitucion}`);


  btnGenerarPdfInstituciones.addEventListener('click', function () {

    generarPdfRepresentantes(representantes, institucion);

    //    generarPdfEstudiantes(representantes, institucion);

  });




  $(`#data-table-${idInstitucion}`).DataTable({
    "data": representantes,
    scrollX: true,
    "columns": [
      { "data": "CED_REPRE" },
      { "data": "REPRE_APELLIDO" },
      { "data": "REPRE_NOMBRE" },
      { "data": "PARR_DESCRIP" },
    ],


    retrieve: true,

    "language": configIdioma


  });




}







document.body.onload = async function () {

  mostrarCantones();

  buscarRepresentante();


}