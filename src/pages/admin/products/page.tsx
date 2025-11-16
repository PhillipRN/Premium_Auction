import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  status: string;
  views: number;
  bids: number;
  image: string;
  description?: string;
  size?: string;
  category?: string;
}

export default function AdminProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    size: '',
    category: 'sneakers',
    status: 'published',
    images: [] as File[]
  });

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

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('商品情報が更新されました！');
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductForm(prev => ({
        ...prev,
        images: Array.from(e.target.files || [])
      }));
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('新商品を保存:', productForm);
    alert('商品が正常に追加されました！');
    setShowAddModal(false);
    setProductForm({
      name: '',
      brand: '',
      description: '',
      price: '',
      size: '',
      category: 'sneakers',
      status: 'published',
      images: []
    });
  };

  return (
    <div className="min-h-screen bg-white">
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

              <button 
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 whitespace-nowrap cursor-pointer"
              >
                <i className="ri-add-line mr-2"></i>
                新商品追加
              </button>
            </div>
          </div>
        </div>

        {/* Add Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">新商品追加</h2>
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <i className="ri-close-line text-xl"></i>
                  </button>
                </div>

                <form onSubmit={handleAddSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        商品名 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={productForm.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="例: Air Jordan 1 Retro High OG"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ブランド <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={productForm.brand}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="例: Nike"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      商品説明
                    </label>
                    <textarea
                      name="description"
                      value={productForm.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="商品の詳細説明を入力してください..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        開始価格 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={productForm.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="10000"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        サイズ
                      </label>
                      <input
                        type="text"
                        name="size"
                        value={productForm.size}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="例: 27.5cm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        カテゴリ
                      </label>
                      <select
                        name="category"
                        value={productForm.category}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="sneakers">スニーカー</option>
                        <option value="limited">限定品</option>
                        <option value="vintage">ヴィンテージ</option>
                        <option value="collaboration">コラボレーション</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      商品画像
                    </label>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                    <p className="text-sm text-gray-500 mt-1">複数の画像を選択できます（推奨: 1200x1200px以上）</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ステータス
                    </label>
                    <select
                      name="status"
                      value={productForm.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="published">公開中</option>
                      <option value="draft">下書き</option>
                      <option value="sold">売却済み</option>
                    </select>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap cursor-pointer"
                    >
                      キャンセル
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 whitespace-nowrap cursor-pointer"
                    >
                      商品を追加
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* 商品編集モーダル */}
        {showEditModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-black">商品編集</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedProduct(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-2xl"></i>
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.name}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="商品名を入力"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ブランド <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedProduct.brand}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="ブランド名を入力"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品説明
                  </label>
                  <textarea
                    defaultValue={selectedProduct.description || ''}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent resize-none"
                    placeholder="商品の詳細説明を入力（最大500文字）"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      価格 <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">¥</span>
                      <input
                        type="number"
                        defaultValue={selectedProduct.price}
                        required
                        min="0"
                        className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      サイズ
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedProduct.size || ''}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="例: M, 26.5cm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    カテゴリ <span className="text-red-500">*</span>
                  </label>
                  <select
                    defaultValue={selectedProduct.category || 'sneakers'}
                    required
                    className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer"
                  >
                    <option value="sneakers">スニーカー</option>
                    <option value="bags">バッグ</option>
                    <option value="watches">時計</option>
                    <option value="accessories">アクセサリー</option>
                    <option value="apparel">アパレル</option>
                    <option value="other">その他</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品画像
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-black transition-colors cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      id="edit-product-images"
                    />
                    <label htmlFor="edit-product-images" className="cursor-pointer">
                      <i className="ri-image-add-line text-4xl text-gray-400 mb-2"></i>
                      <p className="text-sm text-gray-600">クリックして画像を選択</p>
                      <p className="text-xs text-gray-400 mt-1">複数選択可能（最大10枚）</p>
                    </label>
                  </div>
                  {selectedProduct.image && (
                    <div className="mt-2">
                      <p className="text-xs text-gray-500 mb-2">現在の画像:</p>
                      <img src={selectedProduct.image} alt={selectedProduct.name} className="w-20 h-20 object-cover rounded" />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ステータス <span className="text-red-500">*</span>
                  </label>
                  <select
                    defaultValue={selectedProduct.status}
                    required
                    className="w-full px-4 py-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer"
                  >
                    <option value="公開中">公開中</option>
                    <option value="下書き">下書き</option>
                    <option value="売却済み">売却済み</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 font-medium whitespace-nowrap cursor-pointer"
                  >
                    変更を保存
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-white text-gray-700 py-3 rounded-md border border-gray-300 hover:bg-gray-50 font-medium whitespace-nowrap cursor-pointer"
                  >
                    キャンセル
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-black hover:text-gray-700 cursor-pointer">
                          <i className="ri-eye-line"></i>
                        </button>
                        <button 
                          onClick={() => handleEdit(product)}
                          className="text-black hover:text-gray-700 cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="text-red-600 hover:text-red-800 cursor-pointer">
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
}