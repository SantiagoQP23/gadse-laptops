
let repre, comuna = '', estudiantes, cedula;

{/* <div class="card my-2">

    <div class="card-body div-card">
    <ul class="list-group list-group-flush" style="width: 100%;">
      <li class=""><b> ${est.EST_APELLIDOS + " " + est.EST_NOMBRES}</b></li>
      <li class=""><b>Cédula:      </b> ${"      " + est.CED_EST}</li>
      <li class=""><b>Institución: </b> ${est.INST_DESCRIP}</li>
      <li class=""><b>Correo:      </b> ${est.EST_CORREO}</li>
      <li class=""><b>Celular:     </b> ${est.EST_CELL}</li>
    </ul>

    </div>
  </div> */}


const initialRepresentante = {
  REPRE_APELLIDO: 'Apellidos',
  REPRE_NOMBRE: 'Nombres',
  REPRE_CELL: '-',
  REPRE_BARRIO: '-',
  REPRE_DIRECCION: '-',

}

const initialEstudiante = {
  EST_APELLIDOS: 'Apellidos',
  EST_NOMBRES: 'Nombres',
  CED_EST: '-',
  EST_CELL: '-',
  EST_ANIO_BASICO: '-',
  EST_CORREO: '-',
  INST_DESCRIP: '-'
}


const representanteHtml = (repre, cedula, comuna) => {

  return `
  <div class="card card-repre ">
  <div class="col-sm-12 p-3 ">
    <h5 class="d-flex  align-items-center" >
    <i class="bi bi-person icon-card"></i>${repre.REPRE_APELLIDO} ${repre.REPRE_NOMBRE}
    </h5>
  </div>
  <div class="card-body card-body-repre"> 
  
    <div class="row justify-content-center">
      <div class="col-sm-6">
        <div class="card card-prop">
          <div class="card-body  ">
            <div class="icon-prop d-flex justify-content-center align-items-center">

              <i class="bi bi-file-person-fill"></i>
            </div>
            <div class="body-card-prop d-flex align-items-center">
              <p>
                <b class="text-prop">CÉDULA</b><br>
                ${cedula}
              </p>
            </div>
          </div>
        </div>

          </div>
      <div class="col-sm-6">
        <div class="card card-prop">
          <div class="card-body ">
            <div class="icon-prop d-flex justify-content-center align-items-center">

            <i class="bi bi-telephone"></i>
            </div>
            <div class="body-card-prop d-flex align-items-center">
              <p>
                <b class="text-prop">CELULAR</b><br>
                ${repre.REPRE_CELL}
              </p>
            </div>
          </div>
        </div>

      </div>

         
          <div class="col-sm-6">
          <div class="card card-prop">
          <div class="card-body ">
            <div class="icon-prop d-flex justify-content-center align-items-center">

            <i class="bi bi-map"></i>
            </div>
            <div class="body-card-prop d-flex align-items-center">
              <p>
                <b class="text-prop">COMUNA</b><br>
                ${comuna}
              </p>
            </div>
          </div>
        </div>
          </div>
          
          <div class="col-sm-6">
          <div class="card card-prop">
          <div class="card-body  ">
            <div class="icon-prop d-flex justify-content-center align-items-center">

            <i class="bi bi-building"></i>
            </div>
            <div class="body-card-prop d-flex align-items-center">
              <p>
                <b class="text-prop">BARRIO</b><br>
                ${repre.REPRE_BARRIO}
              </p>
            </div>
          </div>
        </div>

          </div>
          <div class="col-sm-12">
          <div class="card card-prop">
          <div class="card-body">
            <div class="icon-prop d-flex justify-content-center align-items-center">

            <i class="bi bi-geo-alt-fill"></i>
                            </div>
            <div class="body-card-prop d-flex align-items-center">
              <p>
                <b class="text-prop">DIRECCION</b><br>
                ${repre.REPRE_DIRECCION}
              </p>
            </div>
          </div>
        </div>

        </div>
      </div>
      
  </div>
  </div>`


}




const estudianteHtml = (est) => {
  return ` 
  <div class="card card-repre ">
    <div class="col-sm-12 p-3 ">
      <h5 class="d-flex  align-items-center" >
      <i class="bi bi-person icon-card"></i>${est.EST_APELLIDOS} ${est.EST_NOMBRES}
      </h5>
    </div>
    <div class="card-body card-body-repre"> 
    
      <div class="row ">
        <div class="col-sm-6">
          <div class="card card-prop">
            <div class="card-body  ">
              <div class="icon-prop d-flex justify-content-center align-items-center">

                <i class="bi bi-fingerprint"></i>
              </div>
              <div class="body-card-prop d-flex align-items-center">
                <p>
                  <b class="text-prop">CÉDULA</b><br>
                  ${est.CED_EST}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card card-prop">
            <div class="card-body  ">
              <div class="icon-prop d-flex justify-content-center align-items-center">

                <i class="bi bi-telephone"></i>
              </div>
              <div class="body-card-prop d-flex align-items-center">
                <p>
                  <b class="text-prop">CELULAR</b><br>
                  ${est.EST_CELL}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-sm-6">
          <div class="card card-prop">
            <div class="card-body ">
              <div class="icon-prop d-flex justify-content-center align-items-center">

              <i class="bi bi-book"></i>
              </div>
              <div class="body-card-prop d-flex align-items-center">
                <p>
                  <b class="text-prop">INSTITUCIÓN</b><br>
                  ${est.INST_DESCRIP}
                </p>
              </div>
            </div>
          </div>

        </div>


        <div class="col-sm-6">
          <div class="card card-prop">
            <div class="card-body  ">
              <div class="icon-prop d-flex justify-content-center align-items-center">

              <i class="bi bi-mortarboard-fill"></i>
              </div>
              <div class="body-card-prop d-flex align-items-center">
                <p>
                  <b class="text-prop">CURSO</b><br>
                  ${est.EST_ANIO_BASICO}° de Bachillerato
                </p>
              </div>
            </div>
          </div>
        </div>

         
        <div class="col-sm-6">
          <div class="card card-prop">
            <div class="card-body ">
              <div class="icon-prop d-flex justify-content-center align-items-center">

                <i class="bi bi-at"></i>
              </div>
              <div class="body-card-prop d-flex align-items-center">
                <p class="content-card-prop">
                  <b class="text-prop">CORREO</b><br>
                    <input type="text" value="${est.EST_CORREO}" class="input-correo" readonly></input>
                </p>
              </div>
            </div>
          </div>
        </div>
          
        

        
      
      </div>
    </div>
  </div>
          
`


}

var currentValue = 0;
function handleClick(myRadio) {

  if (currentValue === myRadio.value) return;

  console.log(myRadio.value)
  document.querySelector('#cedula').value = '';

  if (myRadio.value === '1') {
    document.querySelector('#titulo-datos').innerHTML = 'Datos del representante';

    document.querySelector('#datos-estudiante').classList.add('ocultar');
    document.querySelector('#datos-representante').classList.remove('ocultar');
    document.querySelector('#datos-representante').innerHTML = representanteHtml(initialRepresentante, '-','-');

  } else {

    document.querySelector('#titulo-datos').innerHTML = 'Datos del estudiante';

    document.querySelector('#datos-representante').classList.add('ocultar');
    document.querySelector('#datos-estudiante').classList.remove('ocultar');
    document.querySelector('#datos-estudiante').innerHTML = estudianteHtml(initialEstudiante);

  }

  currentValue = myRadio.value;
}



const buscar = () => {


  const cedula = document.querySelector('#cedula').value;

  if (cedula.length !== 10 && cedula.length !== 9) {

    Swal.fire({
      icon: 'info',
      title: 'Atención',
      text: 'Longitud de Cedula no es correcta',
      footer: 'Registro Estudiantil'
    });
    return;


  }

  var radios = document.getElementsByName('select');
  /*  console.log(radios[0].id, radios[0].checked)
   console.log(radios[1].id, radios[1].checked) */



  for (var radio of radios) {
    if (radio.id === 'option-1' && radio.checked) {
      buscarRepresentanteAjax(cedula);
      break;
    } else {
      buscarEstudiante(cedula);
      break;
    }
  }
}

const buscarEstudiante = (cedula) => {
  const seccionDatos = document.querySelector('#datos-estudiante');

  document.getElementById("spinner").style.display = "flex";


  $.ajax({
    type: "GET",
    url: BASE_URL + `estced?ced=${cedula}`,
    dataType: "json",
    async: true,
    success: async function (data) {

      console.log(data);
      document.getElementById("spinner").style.display = "none";

      seccionDatos.innerHTML = '';
      seccionDatos.innerHTML = estudianteHtml(data[0]);



    },
    error: function () {
      document.getElementById("spinner").style.display = "none";

      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'No se encontro al estudiante',
        footer: 'Registro Estudiantil'
      });
    }
  })


}

const buscarRepresentanteAjax = (cedula) => {

  comuna = 'N.A.';
  const seccionDatos = document.querySelector('#datos-representante');
  seccionDatos.innerHTML = '';

  /*  const cargando = document.querySelector('#cargando-representante');
  cargando.classList.remove('ocultar'); */


  document.getElementById("spinner").style.display = "flex";

  $.ajax({
    type: "GET",
    url: BASE_URL + `repre?ced=${cedula}`,
    dataType: "json",
    async: true,
    success: async function (data) {

      repre = data[0];

      const estudiantes = await obtenerDatos(`estrepre?ced=${cedula}`);

      console.log(repre)

      if (repre.REPRE_COMUNA !== '0') {
        respComuna = await obtenerComuna(repre.ID_PARROQUIA, repre.REPRE_COMUNA);
        comuna = respComuna.COM_DESCRIP;

      }



      var imagenCro = new Image();
      imagenCro.src = repre.REPRE_FOT_CRO;
      var image = new Image();
      image.src = repre.REPRE_FOT_DOM;


      document.querySelector('#img-croquis').innerHTML = `
      <img class="rounded" src=${imagenCro.src}
        title="Domicilio"
        style="
        object-fit:contain;

        width: 100%;
        height: 100%;
        align: center;" 
      
      >
      `

      document.querySelector('#img-domicilio').innerHTML = `
      <img class="rounded" src=${image.src}
        title="Domicilio"
        style="
        object-fit:contain;

        width: 100%;
        height: 100%;
        align: center;" 
      
      >
      `
      document.getElementById("spinner").style.display = "none";


      let htmlEstudiantes = '';

      estudiantes.forEach(e => {
        htmlEstudiantes += estudianteHtml(e);
      });


      // Añadir la información del representante en el card
      let cardRepresentante = representanteHtml(repre, cedula, comuna);



      cardRepresentante += ` 

      <section class="py-3 border-bottom" style="margin-bottom:15px !important">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <h5 class="font-weight-bold mb-0">
            ${estudiantes.length > 1 ? 'Datos de los Estudiantes ' : 'Datos del estudiante'}</h5>
          </div>
        </div>
      </div>
    </section>

        ${estudiantes.length > 0 && htmlEstudiantes
        }
        <div class="row">
          <div class="col-12 col-sm-6">
            <div class="card card-img" >
              <img class="rounded card-img-top" src=${image.src}
                  title="Domicilio"
                  style="
                    object-fit: contain;
                    width: 100%;
                    height: 250px;
                    align: center
                  "
                  data-toggle="modal" data-target="#modalDomicilio"

              alt="Card image cap">
              
              <div class="card-body card-img-body">
                <h4 class=" card-img-title">Domicilio</h4>

                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#modalDomicilio" ><i class="bi bi-eye"></i></a>
                <a class="btn btn-primary" download="${repre.REPRE_APELLIDO}-domicilio.jpg" href="data:image/jpg;${image.src}"><i class="bi bi-download"></i></a>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6">
            <div class="card card-img" >
              <img class="rounded card-img-top" src=${imagenCro.src}
                  title="Croquis"
                  style="
                    object-fit: contain;
                    width: 100%;
                    height: 250px;
                    align: center
                  "
                  data-toggle="modal" data-target="#modalCroquis"
                  alt="Card image cap">
              
              <div class="card-body card-img-body">
                <h4 class=" card-img-title">CROQUIS</h4>

                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#modalCroquis" ><i class="bi bi-eye"></i></a>
                <a class="btn btn-primary" download="${repre.REPRE_APELLIDO}-Croquis.jpg" href="data:image/jpg;${imagenCro.src}"><i class="bi bi-download"></i></a>
              </div>
            </div>
          </div>


       
            
          
      </div>
`;


      seccionDatos.innerHTML = cardRepresentante;

      // Boton para generar pdf
      const btnGenerarPdf = document.querySelector(`#pdf-representante`);


      btnGenerarPdf.addEventListener('click', function () {

        generarPdfEstudiantes(estudiantes, repre, comuna, cedula);

      });



    },
    error: function (data) {
      document.getElementById("spinner").style.display = "none";

      Swal.fire({
        icon: 'warning',
        title: 'Atención',
        text: 'No se encontro al representante',
        footer: 'Registro Estudiantil'
      });
    },
    complete: function () {

    }
  });



}



document.body.onload = async function () {

  mostrarCantones();
  document.querySelector('#datos-representante').innerHTML = representanteHtml(initialRepresentante, '-', '-');



  document.querySelector('#btn-buscar').addEventListener("click", async function (event) {



    event.preventDefault();
    event.stopImmediatePropagation();
    buscar();





  });





}




