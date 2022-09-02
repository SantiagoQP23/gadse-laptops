


const buscarRepresentante = async (e) => {

  document.querySelector('#btn-buscar').addEventListener("click", async function (event) {
    event.preventDefault();
    event.stopImmediatePropagation();

    const cargando = document.querySelector('#cargando-representante');

    cargando.classList.remove('ocultar');


    const cedula = document.querySelector('#cedula').value;


    let cardRepresentante = '';
    const alerta = `<div class="alert alert-danger" role="alert">
      No se encontro al representante
      </div>`
    const seccionDatos = document.querySelector('#datos-representante');
    seccionDatos.innerHTML = '';

    try {
      const resp = await fetch(`http://128.201.163.185:8080/wsRegistro/api/v1/services/repre?ced=${cedula}`);
      const body = await resp.json();


      const repre = body[0];
      console.log(repre)
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
      return;

    } catch (error) {
      seccionDatos.innerHTML = alerta;
      cargando.classList.add('ocultar');

    }


  });


}



const obtenerCantones = async () => {

  const resp = await fetch('http://128.201.163.185:8080/wsRegistro/api/v1/services/cantones');
  const body = await resp.json();
  return body;
}

const mostrarCantones = async () => {
  const data = await obtenerCantones();
  const selectCantones = document.querySelector('#select-cantones')


  data.forEach(canton => {
    selectCantones.innerHTML += `<option value="${canton.ID_CANTON}">${canton.CAN_DESCRIPCION}</option>`;
  });

  const idCanton = data[0].ID_CANTON
  selectCantones.value = idCanton;

  mostrarParroquias(idCanton);


  // $(document).ready(function () {
  //   $('#data-table-cantones').DataTable({
  //     "data": data,
  //     "columns": [
  //       { "data": "CAN_DESCRIPCION" },
  //       { "data": "ID_CANTON" },
  //     ]
  //   });
  // });

}
const obtenerParroquias = async (idCanton) => {

  const resp = await fetch(`http://128.201.163.185:8080/wsRegistro/api/v1/services/parroquias?canton=${idCanton}`);
  const body = await resp.json();
  return body;
}

const mostrarParroquias = async (idCanton) => {

  const insertarComunas = document.querySelector('#select-comunas');

  insertarComunas.disabled = true;


  insertarComunas.innerHTML = "";


  const data = await obtenerParroquias(idCanton);


  const insertarParroquia = document.querySelector('#select-parroquias');
  insertarParroquia.disabled = false;
  insertarParroquia.innerHTML = `<option selected disabled value="">Elija una...</option>`;

  data.forEach(parroquia => {
    insertarParroquia.innerHTML += `<option value="${parroquia.ID_PARROQUIA}">${parroquia.PARR_DESCRIP}</option>`;

  });
  // $(document).ready(function () {
  //   $('#data-table-parroquias').DataTable({
  //     "data": data,
  //     "columns": [
  //       { "data": "PARR_DESCRIP" },
  //       { "data": "ID_PARROQUIA" },
  //     ]
  //   });
  // });

}

const obtenerComunas = async (idParroquia) => {

  try {
    const resp = await fetch(`http://128.201.163.185:8080/wsRegistro/api/v1/services/comunas?parroquia=${idParroquia}`);
    const body = await resp.json();
    return body;

  } catch (error) {
    return false;
  }
}

const mostrarComunas = async (idParroquia) => {

  const insertarComunas = document.querySelector('#select-comunas');


  const data = await obtenerComunas(idParroquia);

  if (!data) {
    insertarComunas.disabled = true;
    return;
  }
  insertarComunas.disabled = false;


  insertarComunas.innerHTML = "";
  data.forEach(comuna => {
    insertarComunas.innerHTML += `<option value="${comuna.ID_COMUNA}">${comuna.COM_DESCRIP}</option>`;

  });

  // $(document).ready(function () {
  //   $('#data-table-comunas').DataTable({
  //     "data": data,
  //     "columns": [
  //       { "data": "COM_DESCRIP" },
  //       { "data": "ID_COMUNA" },
  //     ]
  //   });
  // });

}


const obtenerInstituciones = async (idParroquia) => {

  // selecciona el elemento


  try {



    const resp = await fetch(`http://128.201.163.185:8080/wsRegistro/api/v1/services/parrinst?parroquia=${idParroquia}`);
    const body = await resp.json();

    return body;




  } catch (error) {

    return false;
  }

}


const obtenerRepresentantes = async (idInstitucion) => {

  const alerta = `
  <div class="alert alert-danger" role="alert">
    No se han registrado representantes
  </div>`;


  const seccionDatos = document.querySelector(`#section-${idInstitucion}`);

  try {
    const resp = await fetch(`http://128.201.163.185:8080/wsRegistro/api/v1/services/repreins?inst=${idInstitucion}`);
    const body = await resp.json();
    return body;

  } catch (error) {
    seccionDatos.innerHTML = alerta;
    return false;
  }


}

/* 
 "CED_REPRE": "0922419239",
        "REPRE_APELLIDO": "SANTISTEVAN ROSALES",
        "REPRE_NOMBRE": "FRANKLIN STALIN ",
        "PARR_DESCRIP": "Colonche"
         */


const mostrarRepresentantes = async (idInstitucion, institucion) => {
  const data = await obtenerRepresentantes(idInstitucion);

  const resp = await fetch('../js/idioma.json');

  const configIdioma = await resp.json();

  const btnGenerarPdf = document.querySelector(`#pdf-${idInstitucion}`);

  console.log('INstitucion', institucion)

  btnGenerarPdf.addEventListener('click', function () {

    generarPdf(data, institucion);

  });



  $(document).ready(function () {
    $(`#data-table-${idInstitucion}`).DataTable({
      "data": data,
      scrollX: true,
      "columns": [
        { "data": "CED_REPRE" },
        { "data": "REPRE_APELLIDO" },
        { "data": "REPRE_NOMBRE" },
        { "data": "PARR_DESCRIP" },
      ],
      dom: 'Bfrtip',
      buttons: [
        {
          text: 'Alert',
          action: function (e, dt, node, config) {
            alert('Activated!');
            this.disable(); // disable button
          },
          className: 'btn btn-primary'

        }

      ],
      retrieve: true,

      "language": configIdioma


    });
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


  const alerta = `
  <div class="alert alert-danger" role="alert">
    No se han registrado instituciones
  </div>`;

  const accordionInstituciones = document.querySelector('#accordion-instituciones');



  accordionInstituciones.innerHTML = cargando;

  const data = await obtenerInstituciones(idParroquia);



  if (!data) {
    accordionInstituciones.innerHTML = alerta;
    return;
  }


  accordionInstituciones.innerHTML = '';

  data.forEach(inst => {
    console.log(inst);
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

const cargarCantones = async () => {

  const tabla = `
  <section class="p-2">
  
  <table id="data-table-${inst.ID_INSTITUCION}" class="table ">
  <thead>
      <tr>
        <th>Cedula</th>
        <th>Nombres</th>
        <th>Apellidos</th>
        <th>Parroquia</th>
      </tr>
    </thead>
    </table>
    
    </section> `;
}




document.body.onload = async function () {

  mostrarCantones();
  /*  mostrarParroquias();
   mostrarComunas(); 
   mostrarInstituciones();
   */
  buscarRepresentante();


}