import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MyPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '山田 太郎',
    email: 'yamada@example.com',
    phone: '090-1234-5678',
    address: '1-2-3 Shibuya',
    city: 'Tokyo',
    postalCode: '150-0001',
    country: 'Japan'
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEditProfile(false);
    // プロフィール保存処理
  };

  const bidHistory = [
    {
      id: 1,
      itemName: 'Nike Air Mag "Back to the Future"',
      itemNameJa: 'ナイキ エアマグ "バック・トゥ・ザ・フューチャー"',
      bidAmount: 125000,
      status: 'winning',
      statusJa: '最高入札中',
      timeLeft: '2日 14時間',
      image: 'https://readdy.ai/api/search-image?query=Ultra%20rare%20Nike%20Air%20Mag%20Back%20to%20the%20Future%20self-lacing%20sneakers%20with%20glowing%20LED%20panels%20and%20metallic%20silver%20finish%20displayed%20on%20premium%20white%20pedestal%20with%20dramatic%20studio%20lighting%20and%20clean%20minimalist%20background%20showcasing%20futuristic%20design%20and%20authentic%20certification%20hologram&width=400&height=300&seq=mybid1&orientation=landscape'
    },
    {
      id: 2,
      itemName: 'Nike SB Dunk Low "Paris"',
      itemNameJa: 'ナイキ SB ダンク ロー "パリ"',
      bidAmount: 95000,
      status: 'outbid',
      statusJa: '上回られました',
      timeLeft: '1日 8時間',
      image: 'https://readdy.ai/api/search-image?query=Extremely%20rare%20Nike%20SB%20Dunk%20Low%20Paris%20edition%20sneakers%20with%20artistic%20painted%20canvas%20upper%20featuring%20Eiffel%20Tower%20motifs%20displayed%20on%20elegant%20white%20marble%20pedestal%20with%20soft%20professional%20lighting%20and%20pristine%20white%20background%20highlighting%20unique%20artwork%20and%20premium%20craftsmanship&width=400&height=300&seq=mybid2&orientation=landscape'
    },
    {
      id: 3,
      itemName: 'Nike Air Yeezy 2 "Red October"',
      itemNameJa: 'ナイキ エアイージー2 "レッドオクトーバー"',
      bidAmount: 87500,
      status: 'ended',
      statusJa: '終了',
      timeLeft: '終了済み',
      image: 'https://readdy.ai/api/search-image?query=Legendary%20Nike%20Air%20Yeezy%202%20Red%20October%20sneakers%20in%20vibrant%20all-red%20colorway%20with%20distinctive%20pyramid%20texture%20and%20gold%20aglets%20displayed%20on%20sleek%20black%20acrylic%20stand%20with%20dramatic%20spotlighting%20and%20clean%20gradient%20background%20emphasizing%20iconic%20silhouette%20and%20museum-quality%20presentation&width=400&height=300&seq=mybid3&orientation=landscape'
    }
  ];

  const favorites = [
    {
      id: 4,
      itemName: 'Nike Dunk SB "What The Dunk"',
      itemNameJa: 'ナイキ ダンク SB "ホワット・ザ・ダンク"',
      currentBid: 156000,
      timeLeft: '3日 22時間',
      image: 'https://readdy.ai/api/search-image?query=Iconic%20Nike%20SB%20Dunk%20What%20The%20Dunk%20sneakers%20featuring%20patchwork%20design%20with%20multiple%20colorways%20and%20textures%20displayed%20on%20premium%20glass%20platform%20with%20professional%20studio%20lighting%20and%20clean%20white%20background%20showcasing%20unique%20artistic%20collaboration%20and%20collector%20value&width=400&height=300&seq=fav1&orientation=landscape'
    },
    {
      id: 5,
      itemName: 'Nike Air Jordan 1 "Chicago" 1985',
      itemNameJa: 'ナイキ エアジョーダン1 "シカゴ" 1985年',
      currentBid: 234000,
      timeLeft: '5日 16時間',
      image: 'https://readdy.ai/api/search-image?query=Vintage%201985%20Nike%20Air%20Jordan%201%20Chicago%20original%20sneakers%20in%20pristine%20condition%20with%20authentic%20aged%20leather%20and%20classic%20red%20white%20black%20colorway%20displayed%20on%20luxury%20velvet%20pedestal%20with%20museum-quality%20lighting%20and%20neutral%20background%20highlighting%20historical%20significance%20and%20collector%20authenticity&width=400&height=300&seq=fav2&orientation=landscape'
    }
  ];

  const wonItems = [
    {
      id: 6,
      itemName: 'Nike Air Force 1 "Louis Vuitton"',
      itemNameJa: 'ナイキ エアフォース1 "ルイ・ヴィトン"',
      winningBid: 189000,
      wonDate: '2024年1月15日',
      status: 'delivered',
      statusJa: '配送完了',
      image: 'https://readdy.ai/api/search-image?query=Exclusive%20Nike%20Air%20Force%201%20Louis%20Vuitton%20collaboration%20sneakers%20with%20premium%20monogram%20canvas%20and%20leather%20construction%20displayed%20on%20luxury%20black%20velvet%20surface%20with%20elegant%20lighting%20and%20sophisticated%20background%20showcasing%20high-fashion%20streetwear%20fusion%20and%20authentic%20craftsmanship&width=400&height=300&seq=won1&orientation=landscape'
    }
  ];

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
              <button className="px-4 py-2 text-white/70 hover:text-red-500 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-logout-box-line mr-1"></i>
                Logout / ログアウト
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <i className="ri-user-fill text-white text-4xl"></i>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-white mb-2">
                    Welcome Back!
                  </h2>
                  <p className="text-white/90 text-lg">おかえりなさい、{profileData.fullName}さん</p>
                  <p className="text-white/70 text-sm">Member since January 2024</p>
                </div>
              </div>
              <button
                onClick={() => setShowEditProfile(true)}
                className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl hover:bg-white/30 transition-all whitespace-nowrap cursor-pointer"
              >
                <i className="ri-edit-fill mr-2"></i>
                Edit Profile / プロフィール編集
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Link to="/mypage/active-bids" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-auction-fill text-blue-600 text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-gray-900">5</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Active Bids</h3>
              <p className="text-gray-500 text-sm">アクティブな入札</p>
              <div className="mt-3 flex items-center text-blue-600">
                <span className="text-sm font-bold">詳細を見る</span>
                <i className="ri-arrow-right-line ml-1"></i>
              </div>
            </Link>

            <Link to="/mypage/won-auctions" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-trophy-fill text-green-600 text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-gray-900">12</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Won Auctions</h3>
              <p className="text-gray-500 text-sm">落札したオークション</p>
              <div className="mt-3 flex items-center text-green-600">
                <span className="text-sm font-bold">詳細を見る</span>
                <i className="ri-arrow-right-line ml-1"></i>
              </div>
            </Link>

            <Link to="/mypage/favorites" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-heart-fill text-red-600 text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-gray-900">8</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Favorites</h3>
              <p className="text-gray-500 text-sm">お気に入りアイテム</p>
              <div className="mt-3 flex items-center text-red-600">
                <span className="text-sm font-bold">詳細を見る</span>
                <i className="ri-arrow-right-line ml-1"></i>
              </div>
            </Link>

            <Link to="/mypage/total-spent" className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-yen-circle-fill text-purple-600 text-2xl"></i>
                </div>
                <span className="text-lg font-black text-gray-900">¥591,500</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Total Spent</h3>
              <p className="text-gray-500 text-sm">総支出額</p>
              <div className="mt-3 flex items-center text-purple-600">
                <span className="text-sm font-bold">詳細を見る</span>
                <i className="ri-arrow-right-line ml-1"></i>
              </div>
            </Link>
          </div>

          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-lg mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'dashboard', label: 'Dashboard / ダッシュボード', icon: 'ri-dashboard-fill' },
                  { id: 'bids', label: 'My Bids / 入札履歴', icon: 'ri-auction-fill' },
                  { id: 'favorites', label: 'Favorites / お気に入り', icon: 'ri-heart-fill' },
                  { id: 'won', label: 'Won Items / 落札商品', icon: 'ri-trophy-fill' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer transition-colors ${
                      activeTab === tab.id
                        ? 'border-red-500 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className={`${tab.icon} mr-2`}></i>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      Recent Activity / 最近のアクティビティ
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                          <i className="ri-auction-fill text-green-600 text-xl"></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-bold">You placed a bid on Nike Air Mag</p>
                          <p className="text-gray-500 text-sm">ナイキ エアマグに入札しました - ¥125,000</p>
                        </div>
                        <span className="text-gray-400 text-sm">2時間前</span>
                      </div>
                      
                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          <i className="ri-heart-fill text-red-600 text-xl"></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-bold">Added Nike Air Jordan 1 to favorites</p>
                          <p className="text-gray-500 text-sm">ナイキ エアジョーダン1をお気に入りに追加</p>
                        </div>
                        <span className="text-gray-400 text-sm">1日前</span>
                      </div>

                      <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <i className="ri-trophy-fill text-blue-600 text-xl"></i>
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900 font-bold">Won Nike Air Force 1 Louis Vuitton</p>
                          <p className="text-gray-500 text-sm">ナイキ エアフォース1 ルイ・ヴィトンを落札</p>
                        </div>
                        <span className="text-gray-400 text-sm">3日前</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bids Tab */}
              {activeTab === 'bids' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    My Bids / 入札履歴
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {bidHistory.map((bid) => (
                      <div key={bid.id} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center space-x-6">
                          <img
                            src={bid.image}
                            alt={bid.itemName}
                            className="w-24 h-24 object-cover object-top rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{bid.itemName}</h4>
                            <p className="text-gray-600 mb-2">{bid.itemNameJa}</p>
                            <div className="flex items-center space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">Your Bid / あなたの入札額</p>
                                <p className="text-lg font-bold text-gray-900">¥{bid.bidAmount.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Time Left / 残り時間</p>
                                <p className="text-lg font-bold text-gray-900">{bid.timeLeft}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${
                              bid.status === 'winning' ? 'bg-green-100 text-green-800' :
                              bid.status === 'outbid' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {bid.statusJa}
                            </div>
                            <button className="mt-3 px-4 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap cursor-pointer">
                              <i className="ri-add-line mr-1"></i>
                              Increase Bid / 入札額を上げる
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Favorites Tab */}
              {activeTab === 'favorites' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Favorites / お気に入り
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {favorites.map((item) => (
                      <div key={item.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.itemName}
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                          />
                          <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
                            <i className="ri-heart-fill text-red-600 text-xl"></i>
                          </button>
                        </div>
                        <div className="p-6">
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{item.itemName}</h4>
                          <p className="text-gray-600 mb-4">{item.itemNameJa}</p>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-500">Current Bid / 現在価格</p>
                              <p className="text-xl font-bold text-gray-900">¥{item.currentBid.toLocaleString()}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Time Left / 残り時間</p>
                              <p className="text-sm font-bold text-gray-900">{item.timeLeft}</p>
                            </div>
                          </div>
                          <button className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all whitespace-nowrap cursor-pointer">
                            Place Bid / 入札する
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Won Items Tab */}
              {activeTab === 'won' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Won Items / 落札商品
                  </h3>
                  <div className="grid grid-cols-1 gap-6">
                    {wonItems.map((item) => (
                      <div key={item.id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-center space-x-6">
                          <img
                            src={item.image}
                            alt={item.itemName}
                            className="w-24 h-24 object-cover object-top rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <i className="ri-trophy-fill text-green-600 text-xl"></i>
                              <span className="text-green-800 font-bold text-sm">CONGRATULATIONS! / おめでとうございます！</span>
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{item.itemName}</h4>
                            <p className="text-gray-600 mb-2">{item.itemNameJa}</p>
                            <div className="flex items-center space-x-4">
                              <div>
                                <p className="text-sm text-gray-500">Winning Bid / 落札価格</p>
                                <p className="text-lg font-bold text-gray-900">¥{item.winningBid.toLocaleString()}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Won Date / 落札日</p>
                                <p className="text-sm text-gray-900">{item.wonDate}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold mb-3">
                              <i className="ri-truck-fill mr-1"></i>
                              {item.statusJa}
                            </div>
                            <div className="space-y-2">
                              <button className="block w-full px-4 py-2 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer">
                                <i className="ri-file-text-line mr-1"></i>
                                View Invoice / 請求書を見る
                              </button>
                              <button className="block w-full px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                                <i className="ri-truck-line mr-1"></i>
                                Track Package / 配送状況
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-orange-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    EDIT PROFILE
                  </h3>
                  <p className="text-white/90">プロフィール編集</p>
                </div>
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleProfileSave} className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Full Name / 氏名 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleProfileChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Email / メールアドレス <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Phone Number / 電話番号 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Address / 住所 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleProfileChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">
                      City / 市区町村 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={profileData.city}
                      onChange={handleProfileChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-bold mb-2">
                      Postal Code / 郵便番号 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={profileData.postalCode}
                      onChange={handleProfileChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Country / 国 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={profileData.country}
                    onChange={handleProfileChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowEditProfile(false)}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel / キャンセル
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-save-fill mr-2"></i>
                    Save Changes / 変更を保存
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                  <i className="ri-vip-crown-fill text-white text-xl"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">RARE KICKS</h4>
                  <p className="text-white/60 text-xs">レアキックス</p>
                </div>
              </div>
              <p className="text-white/60 text-sm">
                The world's most exclusive sneaker auction platform.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link to="/auctions" className="text-white/60 hover:text-red-500 transition-colors text-sm cursor-pointer">Auctions / オークション</Link></li>
                <li><Link to="/about" className="text-white/60 hover:text-red-500 transition-colors text-sm cursor-pointer">About / 概要</Link></li>
                <li><Link to="/faq" className="text-white/60 hover:text-red-500 transition-colors text-sm cursor-pointer">FAQ / よくある質問</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-4">Legal</h5>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-white/60 hover:text-red-500 transition-colors text-sm cursor-pointer">Terms / 利用規約</Link></li>
                <li><Link to="/privacy" className="text-white/60 hover:text-red-500 transition-colors text-sm cursor-pointer">Privacy / プライバシー</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <i className="ri-instagram-fill text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <i className="ri-twitter-x-fill text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <i className="ri-facebook-fill text-white"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2024 RARE KICKS. All rights reserved. | 
              <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-red-500 transition-colors ml-1 cursor-pointer">
                Powered by Readdy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}