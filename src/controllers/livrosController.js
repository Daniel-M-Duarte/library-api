import livros from "../models/Livro.js";

class LivroController{
    
    static listarLivros = (req, res) =>{
        livros.find()
          .populate('autor')
          .exec((err, livros) => {
            res.status(200).json(livros)
        })
    }
    
    static buscarPeloId = (req, res) =>{
        let id = req.params.id;
        livros.findById(id)
          .populate('autor', 'nome')
          .exec((err, livros) => {
            if(!err){
                return res.status(200).json(livros);
            }
            res.status(400).send({message: `${err.message} - Id não localizado`})
        })
    }
    
    static cadastrarLivro = (req, res) =>{
        let livro = new livros(req.body);
        livro.save((err) =>{
            if(err){
                return res.status(500).send({message: `${err.message} - falha ao cadastrar livro`});
            }            
            res.status(201).json(livro);            
        })
    }

    static atualizarLivro = (req, res) =>{
        let id = req.params.id;
        livros.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
            if(!err) {
                return res.status(200).send({message: "Livro atualizado com sucesso"})
            }
            res.status(500).send({message: err.message})
        })
    }

    static deletarLivro = (req, res) =>{
        let id = req.params.id;
        livros.findByIdAndDelete(id, (err, livros) => {
            if(!err){
                return res.status(400).send("Livro excluido com sucesso");
            }
            res.status(400).send({message: `${err.message} - Id não localizado`})
        })
    }

    static buscarPelaEditora = (req, res) =>{
        const editora = req.query.editora;

        livros.find({'editora': editora}, {}, (err, livros) =>{            
            if(!err) {
                return res.status(200).send(livros)
            }
            res.status(500).send({message: err.message})            
        })
    }

    static buscarPeloTitulo = (req, res) =>{
        const titulo = req.query.titulo;
        livros.find({'titulo': titulo}, {}, (err, livros) =>{
            res.status(200).send(livros)
        })
    }

}

export default LivroController;