import { useEffect, useMemo, useState } from "react";
import ProductHero from "../components/product/ProductHero";
import ProductFilter from "../components/product/ProductFilter";
import ProductGridCard from "../components/product/ProductGridCard";
import ProductService from "../services/product.service";

export default function Products() {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("popular");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    ProductService.getPublicProducts().then(data => {
      // Map data to match ProductGridCard expectation
      const mapped = data.map((p: any) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        image: p.image || "/assets/products/default.png",
        desc: p.description,
        rating: 5, // Placeholder
        category: p.category?.name || "all"
      }));
      setProducts(mapped);
    }).catch(console.error);
  }, []);

  const filtered = useMemo(() => {
    let list =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);

    if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    }
    if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [category, sort]);

  return (
    <>
      <ProductHero />
      <ProductFilter
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-2">Sản phẩm nổi bật</h2>
        <p className="text-gray-500 mb-8">
          Các dòng sữa hạt được yêu thích nhất tháng này
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductGridCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
