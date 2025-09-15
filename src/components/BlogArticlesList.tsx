'use client';
import React from 'react';
import Masonry from "react-masonry-css";
import styles from "@/app/blog/blog.module.css";
import { Article } from '@/data/blog';
import BlogArticleCard from './BlogArticleCard';
import RotatingProductBanner from '@/components/RotatingProductBanner';

interface BlogArticlesListProps {
  articles: Article[];
  loading: boolean;
}

export default function BlogArticlesList({ articles, loading }: BlogArticlesListProps) {
  if (loading) {
    return (
      <div className="text-center text-gray-500 py-16">
        Cargando artículos...
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center text-gray-500 py-16">
        No hay artículos para esta categoría.
      </div>
    );
  }

  return (
    <Masonry
      breakpointCols={{ default: 2, 900: 1 }}
      className={styles["masonry-grid"]}
      columnClassName={styles["masonry-column"]}
    >
      {articles.map((article, i) => {
        // Insertar banner de productos cada 4 artículos
        const shouldShowBanner = i > 0 && (i + 1) % 5 === 0;
        
        return (
          <React.Fragment key={article._id}>
            {shouldShowBanner && <RotatingProductBanner />}
            <BlogArticleCard article={article} />
          </React.Fragment>
        );
      })}
    </Masonry>
  );
} 