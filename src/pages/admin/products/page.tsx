import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const [products] = useState([
    {
      id: 1,
      name: 'Air Jordan 1 Retro High OG "Chicago"',
      brand: 'Nike',
      category: 'スニーカー',
      price: 85000,
      status: 'active',
      views: 1247,
      bids: 23,
      image: 'https://readdy.ai/api/search-image?query=Air%20Jordan%201%20Chicago%20red%20white%20black%20sneaker%20product%20photography%20clean%20white%20background&width=100&height=100&seq=1&orientation=squarish',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      name: 'Nike Dunk Low "Panda"',
      brand: 'Nike',
      category: 'スニーカー',
      price: 45000,
      status: 'sold',
      views: 892,
      bids: 18,
      image: 'https://readdy.ai/api/search-image?query=Nike%20Dunk%20Low%20Panda%20black%20white%20sneaker%20product%20photography%20clean%20white%20background&width=100&height=100&seq=2&orientation=squarish',
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      name: 'Yeezy Boost 350 V2 "Zebra"',
      brand: 'Adidas',
      category: 'スニーカー',
      price: 120000,
      status: 'active',
      views: 2156,
      bids: 41,
      image: 'https://readdy.ai/api/search-image?query=Yeezy%20Boost%20350%20V2%20Zebra%20white%20black%20stripe%20sneaker%20product%20photography%20clean%20white%20background&width=100&height=100&seq=3&orientation=squarish',
      createdAt: '2024-01-10'
    },
    {
      id: 4,
      name: 'Air Max 90 "Infrared"',
      brand: 'Nike',
      category: 'スニーカー',
      price: 32000,
      status: 'draft',
      views: 0,
      bids: 0,
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Max%2090%20Infrared%20white%20grey%20red%20sneaker%20product%20photography%20clean%20white%20background&width=100&height=100&seq=4&orientation=squarish',
      createdAt: '2024-01-18'
    },
    {
      id: 5,
      name: 'Off-White x Nike Air Force 1',
      brand: 'Nike',
      category: 'スニーカー',
      price: 250000,
      status: 'active',
      views: 3421,
      bids: 67,
      image: 'https://readdy.ai/api/search-image?query=Off-White%20Nike%20Air%20Force%201%20white%20sneaker%20collaboration%20product%20photography%20clean%20white%20background&width=100&height=100&seq=5&orientation=squarish',
      createdAt: '2024-01-08'
    }
  ]);

  const [stats] = useState({
    total: 1247,
    active: 89,
    draft: 12,
    sold: 1146
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return b.price - a.price;
      case 'views':
        return b.views - a.views;
      case 'bids':
        return b.bids - a.bids;
      default:
        return 0;
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">公開中</span>;
      case 'draft':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">下書き</span>;
      case 'sold':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">売却済み</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">商品管理</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                サイトに戻る
              </Link>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <i className="ri-user-line text-white text-sm"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link 
              to="/admin" 
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              ダッシュボード
            </Link>
            <Link 
              to="/admin/products" 
              className="border-b-2 border-black text-black py-4 px-1 text-sm font-medium"
            >
              商品管理
            </Link>
            <Link 
              to="/admin/auctions" 
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              オークション管理
            </Link>
            <Link 
              to="/admin/users" 
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              ユーザー管理
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <i className="ri-shopping-bag-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">総商品数</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.total}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="ri-eye-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">公開中</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.active}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    <i className="ri-draft-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">下書き</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.draft}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">売却済み</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.sold}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="商品名で検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                >
                  <option value="all">全てのステータス</option>
                  <option value="active">公開中</option>
                  <option value="draft">下書き</option>
                  <option value="sold">売却済み</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                >
                  <option value="name">商品名順</option>
                  <option value="price">価格順</option>
                  <option value="views">閲覧数順</option>
                  <option value="bids">入札数順</option>
                </select>
              </div>

              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800">
                <i className="ri-add-line mr-2"></i>
                新商品追加
              </button>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    商品
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ブランド
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    価格
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    統計
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    作成日
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    アクション
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          <img
                            className="h-12 w-12 rounded-lg object-cover"
                            src={product.image}
                            alt={product.name}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {product.category}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {product.brand}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ¥{product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <i className="ri-eye-line mr-1"></i>
                          {product.views}
                        </span>
                        <span className="flex items-center">
                          <i className="ri-hand-heart-line mr-1"></i>
                          {product.bids}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.createdAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-black hover:text-gray-700">
                          <i className="ri-eye-line"></i>
                        </button>
                        <button className="text-black hover:text-gray-700">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminProductsPage;