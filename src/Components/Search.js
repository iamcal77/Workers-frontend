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
  
    try {
      const response = await fetch(`http://localhost:7050/api/search/search?q=${query}`);
      
      if (!response.ok) {
        throw new Error(`Search request failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      
      // Update to match the correct keys in the response (lowercase)
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
            {results.Users && results.Users.length > 0 ? (
              <ul>
                {results.Users.map((user) => (
                  <li key={user.id}>{user.Name} ({user.Email})</li>
                ))}
              </ul>
            ) : (
              <p>No users found</p>
            )}
          </div>

          {/* Posts Section */}
          <div>
            <h4 className="font-bold">Posts</h4>
            {results.Posts && results.Posts.length > 0 ? (
              <ul>
                {results.Posts.map((post) => (
                  <li key={post.id}>{post.Title}</li>
                ))}
              </ul>
            ) : (
              <p>No posts found</p>
            )}
          </div>

          {/* Comments Section */}
          <div>
            <h4 className="font-bold">Comments</h4>
            {results.Comments && results.Comments.length > 0 ? (
              <ul>
                {results.Comments.map((comment) => (
                  <li key={comment.id}>{comment.Content}</li>
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
