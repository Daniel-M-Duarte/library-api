import express  from "express";
import LivroController from "../controllers/livrosController.js";

const router = express.Router();

router
  .get("/livros", LivroController.listarLivros)
  .get("/livros/busca", LivroController.buscarPelaEditora)
  .get("/livros/busca-titulo", LivroController.buscarPeloTitulo)
  .get("/livros/:id", LivroController.buscarPeloId)
  .post("/livros", LivroController.cadastrarLivro)
  .put("/livros/:id", LivroController.atualizarLivro)
  .delete("/livros/:id", LivroController.deletarLivro)
  
  export default router;
  
  