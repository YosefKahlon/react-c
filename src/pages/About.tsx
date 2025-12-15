function About() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px' }}>
      <h1>TanStack Query Project - Implementation Summary</h1>
      
      <section>
        <h2>Step 1: Install React Query DevTools</h2>
        <p> Installed <code>@tanstack/react-query-devtools</code> package to help visualize and debug queries.</p>
      </section>

      <section>
        <h2>Step 2: Choose a Fake API</h2>
        <p><strong>I chose DummyJSON.</strong></p>
        <ul>
          <li><strong>List endpoint:</strong> <code>/products</code></li>
          <li><strong>Detail endpoint:</strong> <code>/products/:id</code></li>
        </ul>
        <p>DummyJSON provides a comprehensive products API with categories, making it perfect for demonstrating filtering and caching.</p>
      </section>

      <section>
        <h2>Step 3: Create First Query - List Page</h2>
        <p> Created the <strong>Products</strong> page </p>
        <p><strong>Features implemented:</strong></p>
        <ul>
          <li>Used <code>useQuery</code> hook from TanStack Query (no useEffect!)</li>
          <li>Shows loading message while fetching</li>
          <li>Shows error message if fetch fails</li>
          <li>Displays real data from the API in a list</li>
          <li>Each product shows title and price</li>
        </ul>
        <p><strong>Key code:</strong> <code>queryKey: ['products', category]</code> and <code>queryFn: fetchProducts</code></p>
      </section>

      <section>
        <h2>Step 4: Detail Page (Dependent Query)</h2>
        <p> Created <strong>ProductDetail</strong> page at <code>/products/:id</code></p>
        <p><strong>Features implemented:</strong></p>
        <ul>
          <li>Reads <code>id</code> from URL using <code>useParams()</code></li>
          <li>Fetches product details using TanStack Query</li>
          <li><strong>Dependent query:</strong> Uses <code>enabled: !!id</code> to only run when ID exists</li>
          <li>Displays full product info: image, price, category, brand, rating, stock, description</li>
          <li>Clickable links from the list page navigate to detail page</li>
        </ul>
      </section>

      <section>
        <h2>Step 5: Bonus - Query Key with Filters</h2>
        <p> <strong>Implemented category filtering with smart caching</strong></p>
        <p><strong>Features:</strong></p>
        <ul>
          <li>Dropdown to filter products by category (Beauty, Fragrances, Furniture, Groceries)</li>
          <li>Query key includes filter: <code>['products', selectedCategory]</code></li>
          <li>Shows <code>isFetching</code> indicator (🔄) during data fetch</li>
        </ul>
        <p><strong>Cache behavior demonstration:</strong></p>
        <ul>
          <li>Each category creates a <strong>separate cache entry</strong></li>
          <li>Switch between categories you've visited → data appears <strong>instantly from cache</strong></li>
          <li>TanStack Query refetches in the background to keep data fresh</li>
          <li>Different query keys = different cache entries = no data conflicts</li>
        </ul>
      </section>

      <section>
        <h2>What Makes This TanStack Query?</h2>
        <ul>
          <li><code>useQuery</code> hook manages all async state automatically</li>
          <li><code>QueryClientProvider</code> in main.tsx provides global query context</li>
          <li>Automatic caching based on query keys</li>
          <li>Built-in loading, error, and fetching states</li>
          <li>No manual <code>useEffect</code> or <code>useState</code> for data fetching</li>
        </ul>
      </section>
    </div>
  );
}

export default About;