import autores from "../models/Autor.js";

class AutorController{
    
    static listarAutores = (req, res) =>{
        autores.find((err, autores) => {
            res.status(200).json(autores)
        })
    }
    
    static buscarPeloId = (req, res) =>{
        let id = req.params.id;
        autores.findById(id, (err, autores) => {
            if(!err){
                return res.status(200).json(autores);
            }
            res.status(400).send({message: `${err.message} - Id não localizado`})
        })
    }
    
    static cadastrarAutor = (req, res) =>{
        let autor = new autores(req.body);
        autor.save((err) =>{
            if(err){
                return res.status(500).send({message: `${err.message} - falha ao cadastrar autor`});
            }            
            res.status(201).json(autor);            
        })
    }

    static atualizarAutor = (req, res) =>{
        let id = req.params.id;
        autores.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
            if(!err) {
                return res.status(200).send({message: "autor atualizado com sucesso"})
            }
            res.status(500).send({message: err.message})
        })
    }

    static deletarAutor = (req, res) =>{
        let id = req.params.id;
        autores.findByIdAndDelete(id, (err, autores) => {
            if(!err){
                return res.status(400).send("autor excluido com sucesso");
            }
            res.status(400).send({message: `${err.message} - Id não localizado`})
        })
    }

}

export default AutorController;