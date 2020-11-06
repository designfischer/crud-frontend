import React from "react";

function Card({
  book_title,
  book_releaseYear,
  book_author,
  book_coauthor,
  book_isbn,
  book_category,
  book_price,
  handle_delete,
  handle_update,
  is_loading,
}) {
  return (
    <>
      <div className="card">
        <div className="card__maininfo">
          <h2>{book_title}</h2>
          <h3>{book_releaseYear}</h3>
        </div>
        <div className="card__authors">
          <h3>{book_author}</h3>
          {book_coauthor &&
            book_coauthor.map((coauthor) => (
              <span key={coauthor}>{coauthor}</span>
            ))}
        </div>
        <div className="card__meta">
          <h4>{book_isbn}</h4>
          {book_category &&
            book_category.map((category) => (
              <span key={category}>{category}</span>
            ))}
        </div>
        <div className="card__price">
          <h2>{`R$ ${book_price}`}</h2>
        </div>
        <div className="card__actions">
          <button onClick={handle_update}>Editar</button>
          {is_loading ? (
            <div>
              <p>Removendo...</p>
            </div>
          ) : (
            <button className="card__actions__remove" onClick={handle_delete}>
              Remover
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
