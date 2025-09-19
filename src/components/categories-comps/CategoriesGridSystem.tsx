"use client";

import { Categories } from "@/app/types/category.model";
import { Subcategory } from "@/app/types/subcategory.model";
import React, { useState } from "react";
import CategoryCard from "./CategoryCard";
import { getSubCategories } from "@/app/actions/subcategories.action";

export default function CategoriesGridSystem({
  category,
}: {
  category: Categories[];
}) {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleCategoryClick = async (
    categoryId: string,
    categoryName: string
  ) => {
    const response = await getSubCategories(categoryId);
    if (response?.data) {
      setSubcategories(response.data);
      setSelectedCategory(categoryName);
    }
  };

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {category.map((cat) => (
          <CategoryCard
            key={cat._id}
            cat={cat}
            onCategoryClick={handleCategoryClick}
          />
        ))}
      </div>

      {/* Subcategories Section */}
      {subcategories.length > 0 && (
        <div className="mt-8 p-6 bg-white border border-gray-200 rounded-sm shadow-sm">
          <h3 className="text-xl font-semibold mb-4">
            Subcategories for {selectedCategory}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subcategories.map((subcat) => (
              <div
                key={subcat._id}
                className="p-3 bg-gray-50 hover:bg-gray-100 rounded-sm cursor-pointer transition-colors"
              >
                {subcat.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
