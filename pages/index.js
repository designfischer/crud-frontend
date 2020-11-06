import React, { useState } from "react";
import Head from "next/head";

import InputGroup from "../components/input";
import Card from "../components/card";

import { apiFetch } from "../services";

export default function Home(props) {
  const [books, setBooks] = useState(props.props);

  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [coAuthor, setCoAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [category, setCategory] = useState("");
  const [releaseYear, setReleaseYear] = useState(2020);
  const [price, setPrice] = useState(0.0);

  const [isLoading, setLoading] = useState(false);

  async function createBook(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await apiFetch.post("/books", {
        name,
        author,
        coAuthor,
        ISBN: isbn,
        category,
        releaseYear,
        price,
      });
      await getBooks();
      alert("Livro cadastrado com sucesso!");
      setName("");
      setAuthor("");
      setCoAuthor("");
      setIsbn("");
      setCategory("");
      setReleaseYear(2020);
      setPrice(0);
      setLoading(false);
    } catch (err) {
      alert("Não foi possível cadastrar o livro!");
      setLoading(false);
    }
  }

  async function getBooks() {
    try {
      const books = await apiFetch.get("/books");
      setBooks(books.data);
    } catch (err) {
      alert("Não foi possível obter a lista atualizada de livros");
      setBooks(props.props);
    }
  }

  async function deleteBook(book_id) {
    setLoading(true);
    try {
      await apiFetch.delete(`/books/${book_id}`);
      alert("Livro removido com sucesso!");
      await getBooks();
      setLoading(false);
    } catch (err) {
      alert("Erro ao remover livro. Tente novamente");
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="page__container">
        <div className="content">
          <div className="content__header">
            <h1>Gerenciamento de Livros</h1>
            <form>
              <InputGroup
                input_id="name"
                input_type="text"
                input_label="Nome do Livro"
                input_first="input__first"
                input_value={name}
                set_value={setName}
              />
              <div className="form__columns">
                <InputGroup
                  input_id="author"
                  input_type="text"
                  input_label="Autor do Livro"
                  input_value={author}
                  set_value={setAuthor}
                />
                <InputGroup
                  input_id="coauthor"
                  input_type="text"
                  input_label="Coautor(es) do Livro"
                  input_value={coAuthor}
                  set_value={setCoAuthor}
                />
                <InputGroup
                  input_id="ISBN"
                  input_type="text"
                  input_label="ISBN do Livro"
                  input_value={isbn}
                  set_value={setIsbn}
                />
                <InputGroup
                  input_id="category"
                  input_type="text"
                  input_label="Categoria(s) do Livro"
                  input_value={category}
                  set_value={setCategory}
                />
                <InputGroup
                  input_id="releaseyear"
                  input_type="number"
                  input_label="Ano de Lançamento do Livro"
                  input_min="1900"
                  input_value={releaseYear}
                  set_value={setReleaseYear}
                />
                <InputGroup
                  input_id="price"
                  input_type="number"
                  input_label="Preço do Livro"
                  input_value={price}
                  set_value={setPrice}
                />
              </div>
              {isLoading ? (
                <p className="sending">Enviando...</p>
              ) : (
                <button onClick={createBook}>Adicionar Livro</button>
              )}
            </form>
          </div>
          <div className="content__body">
            {books.map((book) => (
              <Card
                key={book._id}
                book_title={book.name}
                book_author={book.author}
                book_coauthor={book.coAuthor}
                book_isbn={book.isbn}
                book_category={book.category}
                book_releaseYear={book.releaseYear}
                book_price={book.price}
                handle_delete={() => {
                  deleteBook(book._id);
                }}
                is_loading={isLoading}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

Home.getInitialProps = async () => {
  const response = await fetch("https://crud-book-api.herokuapp.com/books");
  const responseJson = await response.json();
  return { props: responseJson };
};
