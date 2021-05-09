import React from 'react';
import requester from "../utilities/requester"

const createSitemap = (products) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${products
        .map(({ productId }) => {
            return `
                    <url>
                        <loc>${`https://aboulazm.com/product/${productId}`}</loc>
                    </url>
                    <url>
                        <loc>${`https://aboulazm.com/ar/product/${productId}`}</loc>
                    </url>
                `;
        })
        .join('')}
        
    </urlset>
    `;

class Sitemap extends React.Component {
    static async getInitialProps({ res }) {
        const product_en = await requester.get(`/products/activeProducts/en`).catch(() => { });
        res.setHeader('Content-Type', 'text/xml');
        // console.log(product_en.data);
        res.write(createSitemap(product_en.data));
        res.end();
    }
}

export default Sitemap;
