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
    success: function(data){
      return data;
      
    },
    error: function(data) {
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



const buscarRepresentante = async (e) => {

  document.querySelector('#btn-buscar').addEventListener("click", async function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const cargando = document.querySelector('#cargando-representante');

    const cedula = document.querySelector('#cedula').value;

    let cardRepresentante = '';

    const seccionDatos = document.querySelector('#datos-representante');

    seccionDatos.innerHTML = '';

    try {
      cargando.classList.remove('ocultar');

      body = await obtenerDatos(`repre?ced=${cedula}`);

      const repre = body[0];

      var imagenCro = new Image();
      imagenCro.src = repre.REPRE_FOT_CRO;
      var image = new Image();
      image.src = repre.REPRE_FOT_DOM;

      cardRepresentante = ` 
      <div class="card">
          <div class="row">
          <div class="col-sm">
              <img src=${image.src} width="100%" alt="Card image cap">
              </div>
              <div class="col-sm">
              <img src=${imagenCro.src} width="100%" alt="Card image cap">
          </div>
        
        </div>

        <h5 class="card-title" style="padding: 20px 0 0 20px;">${repre.REPRE_APELLIDO} ${repre.REPRE_NOMBRE}</h5>
        
        <div class="card-body">
          <ul class="list-group list-group-flush" style="width: 100%;">
              <li class="list-group-item">Comuna: ${repre.REPRE_COMUNA}</li>
              <li class="list-group-item">Barrio: ${repre.REPRE_BARRIO}</li>
              <li class="list-group-item">Direccion: ${repre.REPRE_DIRECCION}</li>
              <li class="list-group-item">Celular: ${repre.REPRE_CELL}</li>
              </ul>
            </div>
          </div>`;


      cargando.classList.add('ocultar');
      seccionDatos.innerHTML = cardRepresentante;

    } catch (error) {


      seccionDatos.innerHTML = alertaHtml('No se encontro al representante');
      cargando.classList.add('ocultar');

    }


  });


}



const mostrarCantones = async () => {

  const data = await obtenerDatos('cantones');
   await obtenerDatos ('cantones');
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


  const data = await obtenerDatos(`repreins?inst=${idInstitucion}`);

  if (!data) {
    const seccionDatos = document.querySelector(`#section-${idInstitucion}`);

    seccionDatos.innerHTML = alertaHtml('No se han registrado representantes');
    return;
  }

  const resp = await fetch('../js/idioma.json');

  const configIdioma = await resp.json();

  const btnGenerarPdf = document.querySelector(`#pdf-${idInstitucion}`);


  btnGenerarPdf.addEventListener('click', function () {

    generarPdf(data, institucion);

  });




  $(`#data-table-${idInstitucion}`).DataTable({
    "data": data,
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