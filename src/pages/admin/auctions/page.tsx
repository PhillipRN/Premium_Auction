import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminAuctionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('endTime');
  const [showBidsModal, setShowBidsModal] = useState(false);
  const [selectedAuction, setSelectedAuction] = useState<any>(null);

  const [stats] = useState({
    total: 89,
    active: 45,
    scheduled: 12,
    ended: 32
  });

  const [auctions] = useState([
    {
      id: 1,
      title: 'Air Jordan 1 Retro High "Bred"',
      brand: 'Nike',
      image: 'https://readdy.ai/api/search-image?query=Air%20Jordan%201%20Retro%20High%20Bred%20sneakers%20product%20photography%20clean%20white%20background%20professional%20lighting&width=400&height=400&seq=auction1&orientation=squarish',
      startPrice: 50000,
      currentPrice: 85000,
      bidCount: 23,
      status: 'active',
      endTime: '2024-01-15 18:00',
      highestBidder: '田中太郎',
      views: 1247
    },
    {
      id: 2,
      title: 'Nike Dunk Low "Panda"',
      brand: 'Nike',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Dunk%20Low%20Panda%20black%20white%20sneakers%20product%20photography%20clean%20white%20background%20professional%20lighting&width=400&height=400&seq=auction2&orientation=squarish',
      startPrice: 30000,
      currentPrice: 45000,
      bidCount: 18,
      status: 'active',
      endTime: '2024-01-16 20:00',
      highestBidder: '佐藤花子',
      views: 892
    },
    {
      id: 3,
      title: 'Yeezy Boost 350 V2 "Zebra"',
      brand: 'Adidas',
      image: 'https://readdy.ai/api/search-image?query=Yeezy%20Boost%20350%20V2%20Zebra%20white%20black%20stripe%20sneakers%20product%20photography%20clean%20white%20background%20professional%20lighting&width=400&height=400&seq=auction3&orientation=squarish',
      startPrice: 80000,
      currentPrice: 120000,
      bidCount: 31,
      status: 'active',
      endTime: '2024-01-17 15:30',
      highestBidder: '鈴木一郎',
      views: 1856
    },
    {
      id: 4,
      title: 'Air Max 90 "Infrared"',
      brand: 'Nike',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Max%2090%20Infrared%20white%20grey%20red%20sneakers%20product%20photography%20clean%20white%20background%20professional%20lighting&width=400&height=400&seq=auction4&orientation=squarish',
      startPrice: 25000,
      currentPrice: 0,
      bidCount: 0,
      status: 'scheduled',
      endTime: '2024-01-20 12:00',
      highestBidder: '-',
      views: 234
    },
    {
      id: 5,
      title: 'Jordan 4 Retro "Black Cat"',
      brand: 'Nike',
      image: 'https://readdy.ai/api/search-image?query=Air%20Jordan%204%20Retro%20Black%20Cat%20all%20black%20sneakers%20product%20photography%20clean%20white%20background%20professional%20lighting&width=400&height=400&seq=auction5&orientation=squarish',
      startPrice: 60000,
      currentPrice: 95000,
      bidCount: 27,
      status: 'ended',
      endTime: '2024-01-10 19:00',
      highestBidder: '山田次郎',
      views: 1543
    },
    {
      id: 6,
      title: 'New Balance 550 "White Green"',
      brand: 'New Balance',
      image: 'https://readdy.ai/api/search-image?query=New%20Balance%20550%20White%20Green%20sneakers%20product%20photography%20clean%20white%20background%20professional%20lighting&width=400&height=400&seq=auction6&orientation=squarish',
      startPrice: 35000,
      currentPrice: 52000,
      bidCount: 15,
      status: 'active',
      endTime: '2024-01-18 16:45',
      highestBidder: '高橋美咲',
      views: 678
    }
  ]);

  const handleShowBids = (auction: any) => {
    setSelectedAuction(auction);
    setShowBidsModal(true);
  };

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || auction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'currentPrice':
        return b.currentPrice - a.currentPrice;
      case 'bidCount':
        return b.bidCount - a.bidCount;
      case 'views':
        return b.views - a.views;
      case 'endTime':
      default:
        return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">進行中</span>;
      case 'scheduled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">予定</span>;
      case 'ended':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">終了</span>;
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
              <h1 className="text-2xl font-bold text-gray-900">オークション管理</h1>
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
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              商品管理
            </Link>
            <Link 
              to="/admin/auctions" 
              className="border-b-2 border-black text-black py-4 px-1 text-sm font-medium"
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <i className="ri-auction-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">総オークション数</dt>
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
                    <i className="ri-play-circle-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">進行中</dt>
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
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <i className="ri-time-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">予定</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.scheduled}</dd>
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
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">終了</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.ended}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">検索</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="オークション名またはブランドで検索..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black text-sm"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ステータス</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black text-sm"
                >
                  <option value="all">すべて</option>
                  <option value="active">進行中</option>
                  <option value="scheduled">予定</option>
                  <option value="ended">終了</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">並び替え</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black text-sm"
                >
                  <option value="endTime">終了時間順</option>
                  <option value="title">オークション名順</option>
                  <option value="currentPrice">現在価格順</option>
                  <option value="bidCount">入札数順</option>
                  <option value="views">閲覧数順</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Auctions Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">オークション一覧</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">オークション</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">価格情報</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">入札情報</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ステータス</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">終了時間</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedAuctions.map((auction) => (
                    <tr key={auction.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-16 w-16">
                            <img className="h-16 w-16 rounded-lg object-cover" src={auction.image} alt={auction.title} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{auction.title}</div>
                            <div className="text-sm text-gray-500">{auction.brand}</div>
                            <div className="text-xs text-gray-400">{auction.views} 回閲覧</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div>開始価格: ¥{auction.startPrice.toLocaleString()}</div>
                          <div className="font-medium">現在価格: ¥{auction.currentPrice.toLocaleString()}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div>{auction.bidCount} 件の入札</div>
                          <div className="text-gray-500">最高入札者: {auction.highestBidder}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(auction.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {auction.endTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleShowBids(auction)}
                            className="text-black hover:text-gray-700"
                          >
                            <i className="ri-list-unordered"></i>
                          </button>
                          {auction.status === 'active' && (
                            <button className="text-red-600 hover:text-red-900">
                              <i className="ri-stop-circle-line"></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 入札一覧モーダル */}
        {showBidsModal && selectedAuction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-black">入札一覧 - {selectedAuction.title}</h2>
                <button
                  onClick={() => setShowBidsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* オークション情報 */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">現在価格</p>
                    <p className="text-lg font-bold text-black">¥{selectedAuction.currentPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">入札数</p>
                    <p className="text-lg font-bold text-black">{selectedAuction.bidCount}件</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">終了日時</p>
                    <p className="text-lg font-bold text-black">{selectedAuction.endDate}</p>
                  </div>
                </div>
              </div>

              {/* 入札一覧テーブル */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        入札者
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        入札額
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        入札日時
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ステータス
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        操作
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        id: 1,
                        bidder: '田中太郎',
                        email: 'tanaka@example.com',
                        amount: 85000,
                        bidTime: '2024-01-15 14:30',
                        status: '最高額',
                        isWinning: true
                      },
                      {
                        id: 2,
                        bidder: '佐藤花子',
                        email: 'sato@example.com',
                        amount: 82000,
                        bidTime: '2024-01-15 13:45',
                        status: '落札済み',
                        isWinning: false
                      },
                      {
                        id: 3,
                        bidder: '鈴木一郎',
                        email: 'suzuki@example.com',
                        amount: 78000,
                        bidTime: '2024-01-15 12:20',
                        status: '落札済み',
                        isWinning: false
                      },
                      {
                        id: 4,
                        bidder: '高橋美咲',
                        email: 'takahashi@example.com',
                        amount: 75000,
                        bidTime: '2024-01-15 11:15',
                        status: '落札済み',
                        isWinning: false
                      },
                      {
                        id: 5,
                        bidder: '山田健太',
                        email: 'yamada@example.com',
                        amount: 70000,
                        bidTime: '2024-01-15 10:30',
                        status: '落札済み',
                        isWinning: false
                      }
                    ].map((bid) => (
                      <tr key={bid.id} className={bid.isWinning ? 'bg-green-50' : ''}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <i className="ri-user-line text-gray-600"></i>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-black">{bid.bidder}</div>
                              <div className="text-sm text-gray-500">{bid.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-black">¥{bid.amount.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{bid.bidTime}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            bid.isWinning 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {bid.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <i className="ri-mail-line"></i>
                            </button>
                            <button className="text-red-600 hover:text-red-800">
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 統計情報 */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-blue-600">総入札数</div>
                  <div className="text-2xl font-bold text-blue-800">5件</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-green-600">最高入札額</div>
                  <div className="text-2xl font-bold text-green-800">¥85,000</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <div className="text-sm text-yellow-600">平均入札額</div>
                  <div className="text-2xl font-bold text-yellow-800">¥78,000</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-sm text-purple-600">入札者数</div>
                  <div className="text-2xl font-bold text-purple-800">5人</div>
                </div>
              </div>

              {/* 閉じるボタン */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowBidsModal(false)}
                  className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  閉じる
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminAuctionsPage;