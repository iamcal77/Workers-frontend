import React, { useState } from 'react';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
  
    setLoading(true);
    setResults(null); // Clear previous results
  
    console.log(`Making request to: http://localhost:7050/api/search/search?q=${query}`); // Log request
  
    try {
      const response = await fetch(`http://localhost:7050/api/search/search?q=${query}`);
      console.log('Response:', response); // Log full response
      if (!response.ok) {
        throw new Error(`Search request failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Data received:', data); // Log the data received
  
      setResults({
        users: data.users || [],
        posts: data.posts || [],
        comments: data.comments || []
      });
    } catch (error) {
      console.error('Search error:', error);
      alert('Error occurred while searching');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className="flex items-center bg-gray-100 p-1 rounded-md shadow-sm">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search here..."
        className="w-full px-2 py-1 text-sm text-black rounded-l-md focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="px-2 py-1 text-sm bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-300"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>

      {/* Display Search Results */}
      {results && (
        <div className="mt-2 bg-white p-2 rounded-lg shadow-md">
          <h3 className="font-semibold">Search Results</h3>

          {/* Users Section */}
          <div>
            <h4 className="font-bold">Users</h4>
            {results.users && results.users.length > 0 ? (
              <ul>
                {results.users.map((user) => (
                  <li key={user.id}>{user.name} ({user.email})</li>
                ))}
              </ul>
            ) : (
              <p>No users found</p>
            )}
          </div>

          {/* Posts Section */}
          <div>
            <h4 className="font-bold">Posts</h4>
            {results.posts && results.posts.length > 0 ? (
              <ul>
                {results.posts.map((post) => (
                  <li key={post.id}>{post.title}</li>
                ))}
              </ul>
            ) : (
              <p>No posts found</p>
            )}
          </div>

          {/* Comments Section */}
          <div>
            <h4 className="font-bold">Comments</h4>
            {results.comments && results.comments.length > 0 ? (
              <ul>
                {results.comments.map((comment) => (
                  <li key={comment.id}>{comment.content}</li>
                ))}
              </ul>
            ) : (
              <p>No comments found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
