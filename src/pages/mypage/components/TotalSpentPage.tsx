import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TotalSpentPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const spendingData = [
    {
      id: 1,
      itemName: 'Nike SB Dunk High "Tiffany"',
      itemNameJa: 'ナイキ SB ダンク ハイ "ティファニー"',
      amount: 234000,
      date: '2023-12-28',
      dateJa: '2023年12月28日',
      category: 'Nike SB',
      categoryJa: 'ナイキ SB',
      paymentMethod: 'Credit Card',
      paymentMethodJa: 'クレジットカード',
      image: 'https://readdy.ai/api/search-image?query=Rare%20Nike%20SB%20Dunk%20High%20Tiffany%20sneakers%20in%20distinctive%20aqua%20blue%20suede%20with%20premium%20silver%20accents%20and%20crocodile%20texture%20details%20displayed%20on%20premium%20wooden%20display%20case%20with%20soft%20professional%20lighting%20and%20clean%20white%20background%20showcasing%20luxury%20craftsmanship&width=300&height=200&seq=spent1&orientation=landscape'
    },
    {
      id: 2,
      itemName: 'Nike Air Force 1 "Off-White"',
      itemNameJa: 'ナイキ エアフォース1 "オフホワイト"',
      amount: 156000,
      date: '2024-01-05',
      dateJa: '2024年1月5日',
      category: 'Nike',
      categoryJa: 'ナイキ',
      paymentMethod: 'Bank Transfer',
      paymentMethodJa: '銀行振込',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Force%201%20Off-White%20collaboration%20sneakers%20featuring%20deconstructed%20design%20with%20exposed%20foam%20and%20distinctive%20zip%20tie%20detail%20displayed%20on%20luxury%20glass%20platform%20with%20warm%20ambient%20lighting%20and%20sophisticated%20background%20highlighting%20exclusive%20streetwear%20aesthetic&width=300&height=200&seq=spent2&orientation=landscape'
    },
    {
      id: 3,
      itemName: 'Nike Air Jordan 1 "Chicago"',
      itemNameJa: 'ナイキ エアジョーダン1 "シカゴ"',
      amount: 89000,
      date: '2024-01-15',
      dateJa: '2024年1月15日',
      category: 'Air Jordan',
      categoryJa: 'エアジョーダン',
      paymentMethod: 'Credit Card',
      paymentMethodJa: 'クレジットカード',
      image: 'https://readdy.ai/api/search-image?query=Classic%20Nike%20Air%20Jordan%201%20Chicago%20sneakers%20in%20iconic%20white%20red%20and%20black%20colorway%20with%20premium%20leather%20construction%20displayed%20on%20elegant%20white%20marble%20pedestal%20with%20professional%20studio%20lighting%20and%20clean%20minimalist%20background%20showcasing%20authentic%20vintage%20design%20and%20collector%20quality&width=300&height=200&seq=spent3&orientation=landscape'
    },
    {
      id: 4,
      itemName: 'Nike Air Max 1 "Patta Waves"',
      itemNameJa: 'ナイキ エアマックス1 "パッタ ウェーブス"',
      amount: 67500,
      date: '2023-12-20',
      dateJa: '2023年12月20日',
      category: 'Nike',
      categoryJa: 'ナイキ',
      paymentMethod: 'PayPal',
      paymentMethodJa: 'ペイパル',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Max%201%20Patta%20Waves%20collaboration%20sneakers%20featuring%20unique%20wave%20pattern%20design%20with%20premium%20materials%20and%20distinctive%20colorway%20displayed%20on%20modern%20acrylic%20pedestal%20with%20artistic%20lighting%20and%20minimalist%20background%20emphasizing%20collaborative%20streetwear%20innovation&width=300&height=200&seq=spent4&orientation=landscape'
    },
    {
      id: 5,
      itemName: 'Nike Dunk Low "Panda"',
      itemNameJa: 'ナイキ ダンク ロー "パンダ"',
      amount: 45000,
      date: '2024-01-10',
      dateJa: '2024年1月10日',
      category: 'Nike',
      categoryJa: 'ナイキ',
      paymentMethod: 'Credit Card',
      paymentMethodJa: 'クレジットカード',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Dunk%20Low%20Panda%20sneakers%20in%20clean%20white%20and%20black%20colorway%20with%20classic%20basketball%20silhouette%20displayed%20on%20sleek%20black%20acrylic%20stand%20with%20dramatic%20spotlighting%20and%20gradient%20background%20emphasizing%20timeless%20design%20and%20premium%20quality%20construction&width=300&height=200&seq=spent5&orientation=landscape'
    }
  ];

  const filteredData = spendingData.filter(item => {
    const itemDate = new Date(item.date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - itemDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let periodMatch = true;
    switch (selectedPeriod) {
      case 'week':
        periodMatch = diffDays <= 7;
        break;
      case 'month':
        periodMatch = diffDays <= 30;
        break;
      case 'year':
        periodMatch = diffDays <= 365;
        break;
      default:
        periodMatch = true;
    }

    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory;

    return periodMatch && categoryMatch;
  });

  const totalSpent = filteredData.reduce((sum, item) => sum + item.amount, 0);
  const averageSpent = filteredData.length > 0 ? totalSpent / filteredData.length : 0;
  const highestPurchase = filteredData.length > 0 ? Math.max(...filteredData.map(item => item.amount)) : 0;

  // カテゴリ別の支出
  const categorySpending = filteredData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);

  // 月別の支出
  const monthlySpending = filteredData.reduce((acc, item) => {
    const month = new Date(item.date).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long' });
    acc[month] = (acc[month] || 0) + item.amount;
    return acc;
  }, {} as Record<string, number>);

  const categories = ['all', ...Array.from(new Set(spendingData.map(item => item.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                <i className="ri-vip-crown-fill text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-white font-bold text-xl tracking-tight">RARE KICKS</h1>
                <p className="text-white/60 text-xs">レアキックス</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-white/70 hover:text-red-500 transition-colors whitespace-nowrap cursor-pointer">
                Home / ホーム
              </Link>
              <Link to="/auctions" className="text-white/70 hover:text-red-500 transition-colors whitespace-nowrap cursor-pointer">
                Auctions / オークション
              </Link>
              <Link to="/mypage" className="text-white hover:text-red-500 transition-colors whitespace-nowrap cursor-pointer">
                My Page / マイページ
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-orange-500 rounded-full flex items-center justify-center">
                  <i className="ri-user-fill text-white text-sm"></i>
                </div>
                <span className="text-white text-sm">山田 太郎</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <Link to="/mypage" className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
                  <i className="ri-arrow-left-line text-xl"></i>
                </Link>
                <h2 className="text-3xl font-black text-gray-900">Total Spent</h2>
              </div>
              <p className="text-gray-600">支出履歴と分析 - {filteredData.length}件の取引</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 font-bold text-sm">Period:</label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-sm pr-8"
                >
                  <option value="all">All Time / すべて</option>
                  <option value="week">Last Week / 先週</option>
                  <option value="month">Last Month / 先月</option>
                  <option value="year">Last Year / 昨年</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 font-bold text-sm">Category:</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-sm pr-8"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories / すべて' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-yen-circle-fill text-blue-600 text-2xl"></i>
                </div>
                <span className="text-lg font-black text-gray-900">¥{totalSpent.toLocaleString()}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Total Spent</h3>
              <p className="text-gray-500 text-sm">総支出額</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-shopping-bag-fill text-green-600 text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-gray-900">{filteredData.length}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Purchases</h3>
              <p className="text-gray-500 text-sm">購入数</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-bar-chart-fill text-purple-600 text-2xl"></i>
                </div>
                <span className="text-lg font-black text-gray-900">¥{averageSpent.toLocaleString()}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Average</h3>
              <p className="text-gray-500 text-sm">平均支出額</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-trophy-fill text-orange-600 text-2xl"></i>
                </div>
                <span className="text-lg font-black text-gray-900">¥{highestPurchase.toLocaleString()}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Highest</h3>
              <p className="text-gray-500 text-sm">最高額</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Category Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Category Breakdown / カテゴリ別内訳</h3>
              <div className="space-y-4">
                {Object.entries(categorySpending).map(([category, amount]) => {
                  const percentage = (amount / totalSpent) * 100;
                  return (
                    <div key={category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-bold">{category}</span>
                        <span className="text-gray-900 font-bold">¥{amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-red-600 to-orange-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Monthly Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Monthly Breakdown / 月別内訳</h3>
              <div className="space-y-4">
                {Object.entries(monthlySpending).map(([month, amount]) => {
                  const percentage = (amount / totalSpent) * 100;
                  return (
                    <div key={month} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-bold">{month}</span>
                        <span className="text-gray-900 font-bold">¥{amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-600 to-purple-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">{percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Transaction History / 取引履歴</h3>
            <div className="space-y-4">
              {filteredData.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-20 h-20 object-cover object-top rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{item.itemName}</h4>
                    <p className="text-gray-600 text-sm mb-2">{item.itemNameJa}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{item.dateJa}</span>
                      <span>•</span>
                      <span>{item.categoryJa}</span>
                      <span>•</span>
                      <span>{item.paymentMethodJa}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-gray-900">¥{item.amount.toLocaleString()}</p>
                    <button className="mt-2 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-eye-line mr-1"></i>
                      詳細を見る
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredData.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-money-yen-circle-line text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Transactions</h3>
              <p className="text-gray-600 mb-6">選択した期間に取引がありません</p>
              <Link to="/auctions" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all whitespace-nowrap cursor-pointer">
                <i className="ri-auction-fill mr-2"></i>
                Browse Auctions / オークションを見る
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}