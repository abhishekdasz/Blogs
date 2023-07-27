"use client"
// pages/index.js

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Homepage = () => {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to BlogZenith</h1>
        <p>Explore the world through our insightful blog posts.</p>
        <Link href="/blogs"> View All Blogs </Link>
        <Link href="/profile"> Profile Page </Link>
      </header>

      <main>
        <section className="image-section">
          <div className="image-container">
            <Image src="/home.jpg" alt="Blog Image" width={800} height={400} layout="responsive"/>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2023 BlogZenith. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;

