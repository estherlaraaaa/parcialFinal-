const editores = require ('../models/editores'); 

exports.create = (req, res) => {
    console.log(req.body);
    let claseNueva = new editores({
        name: req.body.name,
        propietario: req.body.propietario, 
    });
    
    claseNueva.save()
    .then(data =>{
        res.send({
            ok:true,
            message: 'editor creado con exito', 
            editores: data, 
        });
    })
    .catch(err=>{
        return res.status(500).send({
            ok:false,
            message:'no se pudo crear',
            error: err, 
        });
    })
}

exports.findAll = (req, res) =>{
    editores.find()
    .then(data=>{
        res.send({
            ok:true,
            message: 'editor encontrado con exito ',
            editor: data, 
        });
    })
    .catch(err=>{
        return res.status(500).send({
            ok:false,
            message: 'no se encontro el editor solicitado',
            error: err, 
        });
    })
}

exports.update = (req, res) =>{
    editores.findByIdAndUpdate(req.params.editorId, {
        name: req.body.name,
        propietario: req.body.propietario,
    }, {new:true})
    .then(updated=>{
        res.send({
            ok:true,
            message: 'se ha actualizado con exito',
            updated: updated,
        });
    })
    .catch(err=>{
        return res.status(500).send({
            ok:false,
            message: 'ocurrio un error al actualizar',
            error: err, 
        });
    })
}

exports.delete = (req, res) =>{
    editores.findByIdAndDelete(req.params.editorId)
    .then(deleted=>{
        res.send({
            ok:true,
            message: 'editor eliminado con exito',
            deleted: deleted, 
        });
    })
    .catch(err=>{
        return res.status(500).send({
            ok:false,
            message: 'no se pudo eliminar',
            error: err, 
        });
    })
}