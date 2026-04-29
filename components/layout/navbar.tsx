import React from 'react'
import { wordpressApi } from '@/lib/wordpress'
import { NavbarClient } from './navbar-client'

const MENU_CATEGORIES = ["Featured", "News", "History", "Viral", "Science", "Analysis"];

export async function Navbar() {
  const allCategories = await wordpressApi.getCategories();

  const navigation = MENU_CATEGORIES.map(name => {
    const category = allCategories.find(cat => cat.name.toLowerCase() === name.toLowerCase());
    if (category) {
      return {
        name: category.name,
        href: `/${category.slug}`,
      };
    }
    // Fallback for categories not found via API, using a sensible default slug
    return {
      name: name,
      href: `/${name.toLowerCase()}`,
    };
  }).filter(Boolean);

  return <NavbarClient navigation={navigation} />
}
