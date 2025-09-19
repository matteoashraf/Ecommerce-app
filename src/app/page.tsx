import CatSliderComp from "@/components/sliders-comps/CatSliderComp";
import MainSlider from "@/components/sliders-comps/MainSlider";
import { getCategories } from "./actions/categories.action";
import { getProducts } from "./actions/products.action";
import ProductsGridSystem from "@/components/products-comps/ProductsGridSystem";

export default async function Home() {
  const categoryResponse = await getCategories();
  const productsResponse = await getProducts();

  return (
    <>
      <MainSlider />
      <div className="my-5">
        <CatSliderComp category={categoryResponse.data} />
      </div>
      <ProductsGridSystem products={productsResponse.data} />
    </>
  );
}
