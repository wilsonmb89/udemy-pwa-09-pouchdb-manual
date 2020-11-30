

// Entrenamiento PouchDB

// 1- Crear la base de datos
// Nombre:  mensajes
const db = new PouchDB('mensajes');


// Objeto a grabar en base de datos
let mensaje = {
    _id: new Date().toISOString(),
    user: 'spiderman',
    mensaje: 'Mi tía hizo unos panqueques muy buenos',
    sincronizado: false
};


// 2- Insertar en la base de datos
db.put(mensaje)
    .then(console.log('Insertado!'))
    .catch(console.log);


// 3- Leer todos los mensajes offline y mostrar en la consola
db.allDocs({ include_docs: true, descending: true }).then(
    doc => {
        console.log('Elementos:', doc.rows);
    }
);


// 4- Cambiar el valor 'sincronizado' de todos los objetos
//  en la BD a TRUE
/* db.allDocs({ include_docs: true, descending: true }).then(
    doc => {
        doc.rows.forEach(row => {
            row.doc.sincronizado = true;
            db.put(row.doc)
                .then(console.log('Actualizado!'))
                .catch(console.log);
        });
    }
); */



// 5- Borrar todos los registros, uno por uno, evaluando
// cuales estan sincronizados
// deberá de comentar todo el código que actualiza
// el campo de la sincronización 
db.allDocs({ include_docs: true, descending: true }).then(
    doc => {
        doc.rows.forEach(row => {
            if (!!row.doc.sincronizado) {
                db.remove(row.doc)
                    .then(console.log('Eliminado!'));
            }
        });
    }
);





