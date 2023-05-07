import { useEffect, useState } from "react";
import { getCategories } from "./api/categories";
import { getProducts } from "./api/products";
import { getSellers } from "./api/sellers";

function App() {
  const [sellersData, setSellersData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    getSellers().then((sellers) => setSellersData(sellers));
    getProducts().then((products) => setProductsData(products));
    getCategories().then((categories) => setCategoriesData(categories));
  }, []);

  return (
    <div>
      <div>sellers</div>
      {sellersData.length
        ? sellersData.map(({ name, phoneNumber, id }) => (
            <div key={id}>
              {name} <span>{phoneNumber}</span>
            </div>
          ))
        : "pending..."}

      <div>products</div>
      {productsData.length
        ? productsData.map(({ title, id, prise }) => (
            <div>
              {title} <span>{prise}</span>
            </div>
          ))
        : "pending..."}

      <div>categories</div>
      {categoriesData.length
        ? categoriesData.map(({ title, id }) => <div key={id}>{title}</div>)
        : "pending..."}
    </div>
  );
}

export default App;
