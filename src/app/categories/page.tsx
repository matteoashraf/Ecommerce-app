import React from "react";
import { getCategories } from "../actions/categories.action";
import CategoriesGridSystem from "@/components/categories-comps/CategoriesGridSystem";

export default async function CategoriesPage() {
  const { data: category } = await getCategories();
  return (
    <div>
      <CategoriesGridSystem category={category} />
    </div>
  );
}
