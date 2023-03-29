import React from 'react';
import './index.scss';

function Collection({ name, images }) {
  return (
    <div className="collection">
      <img className="collection__big" src={images[0]} alt="Item" />
      <div className="collection__bottom">
        <img className="collection__mini" src={images[1]} alt="Item" />
        <img className="collection__mini" src={images[2]} alt="Item" />
        <img className="collection__mini" src={images[3]} alt="Item" />
      </div>
      <h4>{name}</h4>
    </div>
  );
}

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
];

function App() {

  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {

    const category = categoryId ? `category=${categoryId}` : '';
    

    setIsLoading(true);

    fetch(`https://642412d2d6152a4d4805e540.mockapi.io/photo_collections?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных')
      }).finally(() => setIsLoading(false))
  }, [categoryId, page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) => (<li onClick={() => setCategoryId(i)} className={categoryId === i ? "active" : ''} key={obj.name}>{obj.name}</li>))
          }
        </ul>
        <input onChange={e => setSearchValue(e.target.value)} value={searchValue} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идёт загрузка...</h2>
        ) : (

          collections.filter((obj) =>
            obj.name.toLowerCase().includes(searchValue.toLowerCase())
          )
            .map((obj, index) => (
              <Collection
                key={index}
                name={obj.name}
                images={obj.photos}
              />

            ))
        )}
      </div>
      <ul className="pagination">
        {
          [...Array(3)].map((_, i) => (
            <li onClick={() => setPage(i + 1)} className={page === i + 1 ? "active" : ''}>{i + 1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
