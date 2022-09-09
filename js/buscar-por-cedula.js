
let repre, comuna, estudiantes, cedula;

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

const estudianteHtml = (est) => {
  return ` 
  <div class="card card-repre ">
    <div class="col-sm-12 p-3 ">
      <h5 class="d-flex  align-items-center" >
      <i class="bi bi-person icon-card"></i>${est.EST_APELLIDOS} ${est.EST_NOMBRES}
      </h5>
    </div>
    <div class="card-body card-body-repre"> 
    
      <div class="row justify-content-center">
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
      
      </div>
    </div>
  </div>
          
`


}

const buscarRepresentanteAjax = () => {
  const seccionDatos = document.querySelector('#datos-representante');
  seccionDatos.innerHTML = '';

  const cargando = document.querySelector('#cargando-representante');
  cargando.classList.remove('ocultar');

  cedula = document.querySelector('#cedula').value;

  if (cedula.length !== 10) {
    cargando.classList.add('ocultar');

    seccionDatos.innerHTML = alertaHtml('Por favor, ingrese un número de cédula válido');
    return;

  }





  $.ajax({
    type: "GET",
    url: BASE_URL + `repre?ced=${cedula}`,
    dataType: "json",
    async: true,
    success: async function (data) {

      repre = data[0];

      const estudiantes = await obtenerDatos(`estrepre?ced=${cedula}`);

      console.log(repre)
      respComuna = await obtenerComuna(repre.ID_PARROQUIA, repre.REPRE_COMUNA);
      comuna = respComuna.COM_DESCRIP;


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


      let htmlEstudiantes = '';

      estudiantes.forEach(e => {
        htmlEstudiantes += estudianteHtml(e);
      });


      // Añadir la información del representante en el card
      let cardRepresentante = ` 

      <section class="py-3 border-bottom" style="margin-bottom:15px !important">
      <div class="container d-flex justify-content-between">
       
          
        <h5 class="font-weight-bold mb-0">Datos del representante</h5>
        <button class="btn btn-secondary" id="pdf-representante"><i class="bi bi-filetype-pdf"></i> PDF</button>
      </div>
    </section>
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
      </div>
              



      <section class="py-3 border-bottom" style="margin-bottom:15px !important">
      <div class="container">
        <div class="row">
          <div class="col-lg-9">
            <h5 class="font-weight-bold mb-0">Estudiantes</h5>
          </div>
        </div>
      </div>
    </section>



        ${estudiantes.length > 0 && htmlEstudiantes
        }
        <div class="row">
          <div class="col-12 col-sm-6">
          <div class="card" >
          <div class="card-header">Domicilio</div>
          <img class="rounded" src=${image.src}
              title="Domicilio"
              style="
              object-fit:contain;

              width: 100%;
              height: 350px;
              align: center;" 
              
              
              alt="Card image cap">
              
              <div class="card-body">
                <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#modalDomicilio" ><i class="bi bi-eye"></i></a>
                <a class="btn btn-primary" download="${repre.REPRE_APELLIDO}-domicilio.jpg" href="data:image/jpg;${image.src}"><i class="bi bi-download"></i></a>
              </div>
            </div>
          </div>


        <div class="col-12 col-sm-6">
          <div class="card bg-warning">
            <div class="card-header">Croquis</div>
            <img class="rounded" src=${imagenCro.src}
            title="Croquis"
            style="
            object-fit:contain;

            width: 100%;
            height: 350px;
            align: center;" 
            
            
            alt="Card image cap">
            
            <div class="card-body">
              <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#modalCroquis" ><i class="bi bi-eye"></i></a>
              <a class="btn btn-primary" download="${repre.REPRE_APELLIDO}-croquis.jpg" href="data:image/jpg;${image.src}"><i class="bi bi-download"></i></a>
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


      seccionDatos.innerHTML = alertaHtml('No se encontro al representante');
    },
    complete: function () {
      cargando.classList.add('ocultar');

    }
  });



}

const buscarRepresentante = async (e) => {

  document.querySelector('#btn-buscar').addEventListener("click", async function (event) {



    event.preventDefault();
    event.stopImmediatePropagation();


    buscarRepresentanteAjax();

    return;
    const cargando = document.querySelector('#cargando-representante');

    const cedula = document.querySelector('#cedula').value;

    let cardRepresentante = '';

    const seccionDatos = document.querySelector('#datos-representante');

    seccionDatos.innerHTML = '';

    let repre, estudiantes, comuna;

    try {
      cargando.classList.remove('ocultar');

      const body = await obtenerDatos(`repre?ced=${cedula}`);
      estudiantes = await obtenerDatos(`estrepre?ced=${cedula}`);
      console.log(estudiantes);

      repre = body[0];
      console.log(repre)
      comuna = await obtenerComuna(repre.ID_PARROQUIA, repre.REPRE_COMUNA);

      // console.log(comunas);
      // comuna = comunas.find(com => com.ID_COMUNA === repre.REPRE_COMUNA);
      // console.log(comuna)

      var imagenCro = new Image();
      imagenCro.src = repre.REPRE_FOT_CRO;
      var image = new Image();
      image.src = repre.REPRE_FOT_DOM;


      cardRepresentante = ` 
      <div class="card">
        <h5 class="card-title" style="padding: 20px 0 0 20px;">
        ${repre.REPRE_APELLIDO} ${repre.REPRE_NOMBRE}
        <button class="btn btn-secondary" id="pdf-representante">Generar PDF</button>
        
        </h5>
        
        <div class="card-body">
          <ul class="list-group list-group-flush" style="width: 100%;">
              <li class="">cedula: ${cedula}</li>
              <li class="">Comuna: ${comuna.COM_DESCRIP}</li>
              <li class="">Barrio: ${repre.REPRE_BARRIO}</li>
              <li class="">Direccion: ${repre.REPRE_DIRECCION}</li>
              <li class="">Celular: ${repre.REPRE_CELL}</li>
              </ul>
        </div>
        <div class="row p-3" >
          <div class="col-sm" style="display: flex; justify-content: center;" >
            <img src=${image.src}
            style="
           
            width: 100%;
            height: 350px;
            align: center;" 
            
            data-toggle="modal" data-target="#modalDomicilio" 
            alt="Card image cap">
          </div>
          <div class="col-sm" style="display: flex; justify-content: center;" >
            <img 
              data-toggle="modal" data-target="#modalCroquis"
              src=${imagenCro.src} 
              style="
              object-fit:contain;
              width: 100%;
              height: 350px;

              align: center;" 
              alt="Card image cap" >
          </div>
      
        </div>
      </div>`;




      cargando.classList.add('ocultar');
      seccionDatos.innerHTML = cardRepresentante;

    } catch (error) {


      seccionDatos.innerHTML = alertaHtml('No se encontro al representante');
      cargando.classList.add('ocultar');

    }

    const btnGenerarPdf = document.querySelector(`#pdf-representante`);


    btnGenerarPdf.addEventListener('click', function () {

      generarPdfEstudiantes(estudiantes, repre, comuna.COM_DESCRIP, cedula);

    });

  });


}




