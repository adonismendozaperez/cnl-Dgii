const   axios  = require('axios'),
        colors = require('colors'),
        argv   = require('yargs')
                 .command('buscar',`Imprime en consola la información relacionada al número de documento introducido`,
                            {
                                doc:{
                                    demand:true,
                                    alias:'d'
                                }
                            })
                 .help()
                 .argv;

let comando = argv._[0];

switch(comando){
    case "buscar":
           axios.get(`http://adamix.net/gastosrd/api.php?act=GetContribuyentes&rnc=${argv.doc}`)
           .then(function (response) {
               if(!response.data == 0){
                    console.log(`Número de documento: ${response.data.RGE_RUC.green}`);
                    console.log(`Nombre/Razón Social: ${response.data.RGE_NOMBRE.green}`);
                    console.log(`Nombre Comercial   : ${response.data.NOMBRE_COMERCIAL.green}`);
                    console.log(`Estado             : ${(response.data.ESTATUS === '2')? 'Activo'.green : 'Inactivo'.red }`);
               }
               else{
                    console.log(`RNC/CED No encontrado.... `.red);
               }

           })
           .catch(function (error) {
             console.log(error.red);
           });

    break;
    default:
        console.log("Comando no reconocido!".red)
}