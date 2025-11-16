
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showIncreaseBidModal, setShowIncreaseBidModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [increaseBidData, setIncreaseBidData] = useState({
    newBidAmount: '',
    maxBidAmount: '',
    autoIncrement: false
  });
  const [reminderData, setReminderData] = useState({
    reminderTime: 30,
    emailNotification: true,
    pushNotification: true,
    customMessage: ''
  });
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);
  const [bidSubmitStatus, setBidSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSubmittingReminder, setIsSubmittingReminder] = useState(false);
  const [reminderSubmitStatus, setReminderSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const favorites = [
    {
      id: 1,
      itemName: 'Nike Air Jordan 11 "Bred"',
      itemNameJa: 'ナイキ エアジョーダン11 "ブレッド"',
      currentBid: 145000,
      estimatedValue: 180000,
      status: 'active',
      statusJa: 'オークション中',
      timeLeft: '2日 8時間',
      timeLeftMinutes: 3200,
      bidders: 34,
      dateAdded: '2024-01-20',
      dateAddedJa: '2024年1月20日',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Jordan%2011%20Bred%20sneakers%20in%20classic%20black%20patent%20leather%20with%20red%20accents%20and%20white%20midsole%20displayed%20on%20premium%20glass%20pedestal%20with%20dramatic%20studio%20lighting%20and%20clean%20minimalist%20background%20showcasing%20iconic%20basketball%20heritage%20and%20luxury%20craftsmanship&width=400&height=300&seq=fav1&orientation=landscape'
    },
    {
      id: 2,
      itemName: 'Nike Dunk SB Low "Travis Scott"',
      itemNameJa: 'ナイキ ダンク SB ロー "トラヴィス・スコット"',
      currentBid: 89000,
      estimatedValue: 120000,
      status: 'active',
      statusJa: 'オークション中',
      timeLeft: '5時間 23分',
      timeLeftMinutes: 323,
      bidders: 28,
      dateAdded: '2024-01-18',
      dateAddedJa: '2024年1月18日',
      image: 'https://readdy.ai/api/search-image?query=Nike%20SB%20Dunk%20Low%20Travis%20Scott%20collaboration%20sneakers%20featuring%20brown%20suede%20upper%20with%20distinctive%20backwards%20swoosh%20and%20cactus%20jack%20branding%20displayed%20on%20luxury%20wooden%20display%20case%20with%20warm%20ambient%20lighting%20and%20sophisticated%20background%20highlighting%20exclusive%20streetwear%20design&width=400&height=300&seq=fav2&orientation=landscape'
    },
    {
      id: 3,
      itemName: 'Nike Air Max 90 "Off-White Desert Ore"',
      itemNameJa: 'ナイキ エアマックス90 "オフホワイト デザートオア"',
      currentBid: 0,
      estimatedValue: 95000,
      status: 'upcoming',
      statusJa: '開始予定',
      timeLeft: '明日 14:00開始',
      timeLeftMinutes: 1440,
      bidders: 0,
      dateAdded: '2024-01-15',
      dateAddedJa: '2024年1月15日',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Max%2090%20Off-White%20Desert%20Ore%20sneakers%20featuring%20deconstructed%20design%20with%20exposed%20foam%20and%20distinctive%20zip%20tie%20detail%20in%20neutral%20beige%20colorway%20displayed%20on%20modern%20acrylic%20stand%20with%20artistic%20lighting%20and%20minimalist%20background%20emphasizing%20avant-garde%20aesthetic&width=400&height=300&seq=fav3&orientation=landscape'
    },
    {
      id: 4,
      itemName: 'Nike Air Force 1 "Supreme Box Logo"',
      itemNameJa: 'ナイキ エアフォース1 "シュプリーム ボックスロゴ"',
      currentBid: 234000,
      estimatedValue: 280000,
      status: 'ended',
      statusJa: '終了',
      timeLeft: '終了済み',
      timeLeftMinutes: 0,
      bidders: 67,
      dateAdded: '2024-01-10',
      dateAddedJa: '2024年1月10日',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Force%201%20Supreme%20Box%20Logo%20collaboration%20sneakers%20in%20premium%20white%20leather%20with%20iconic%20red%20box%20logo%20branding%20displayed%20on%20elegant%20marble%20pedestal%20with%20professional%20studio%20lighting%20and%20clean%20white%20background%20showcasing%20luxury%20streetwear%20collaboration&width=400&height=300&seq=fav4&orientation=landscape'
    },
    {
      id: 5,
      itemName: 'Nike SB Dunk High "Strawberry Cough"',
      itemNameJa: 'ナイキ SB ダンク ハイ "ストロベリーコフ"',
      currentBid: 67500,
      estimatedValue: 85000,
      status: 'active',
      statusJa: 'オークション中',
      timeLeft: '1日 16時間',
      timeLeftMinutes: 2400,
      bidders: 19,
      dateAdded: '2024-01-08',
      dateAddedJa: '2024年1月8日',
      image: 'https://readdy.ai/api/search-image?query=Nike%20SB%20Dunk%20High%20Strawberry%20Cough%20sneakers%20in%20vibrant%20pink%20and%20green%20colorway%20with%20premium%20suede%20construction%20displayed%20on%20sleek%20black%20acrylic%20platform%20with%20dramatic%20spotlighting%20and%20gradient%20background%20emphasizing%20unique%20skateboarding%20heritage%20design&width=400&height=300&seq=fav5&orientation=landscape'
    },
    {
      id: 6,
      itemName: 'Nike Air Yeezy 1 "Zen Grey"',
      itemNameJa: 'ナイキ エアイージー1 "ゼングレー"',
      currentBid: 0,
      estimatedValue: 450000,
      status: 'upcoming',
      statusJa: '開始予定',
      timeLeft: '3日後 10:00開始',
      timeLeftMinutes: 4320,
      bidders: 0,
      dateAdded: '2024-01-05',
      dateAddedJa: '2024年1月5日',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Yeezy%201%20Zen%20Grey%20sneakers%20in%20sophisticated%20grey%20colorway%20with%20distinctive%20strap%20design%20and%20premium%20materials%20displayed%20on%20luxury%20glass%20platform%20with%20warm%20ambient%20lighting%20and%20sophisticated%20background%20highlighting%20legendary%20collaboration%20and%20collector%20value&width=400&height=300&seq=fav6&orientation=landscape'
    }
  ];

  const filteredFavorites = favorites.filter(item => {
    if (filterStatus === 'all') return true;
    return item.status === filterStatus;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'dateAdded':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'currentBid':
        return b.currentBid - a.currentBid;
      case 'estimatedValue':
        return b.estimatedValue - a.estimatedValue;
      case 'timeLeft':
        return a.timeLeftMinutes - b.timeLeftMinutes;
      default:
        return 0;
    }
  });

  const activeItems = favorites.filter(item => item.status === 'active').length;
  const upcomingItems = favorites.filter(item => item.status === 'upcoming').length;
  const endedItems = favorites.filter(item => item.status === 'ended').length;
  const totalValue = favorites.reduce((sum, item) => sum + item.estimatedValue, 0);

  const removeFavorite = (id: number) => {
    // お気に入りから削除する処理
    console.log('Remove favorite:', id);
  };

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setShowDetailModal(true);
  };

  const openIncreaseBidModal = (item: any) => {
    setSelectedItem(item);
    setShowIncreaseBidModal(true);
    const suggestedBid = (item.currentBid || 50000) + 5000;
    setIncreaseBidData(prev => ({
      ...prev,
      newBidAmount: suggestedBid.toLocaleString()
    }));
  };

  const openReminderModal = (item: any) => {
    setSelectedItem(item);
    setShowReminderModal(true);
  };

  const handleIncreaseBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setIncreaseBidData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleIncreaseBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newBidAmount = parseInt(increaseBidData.newBidAmount.replace(/,/g, ''));
    const currentHighest = selectedItem?.currentBid || 0;
    
    if (newBidAmount <= currentHighest) {
      setBidSubmitStatus('error');
      return;
    }

    setIsSubmittingBid(true);
    setBidSubmitStatus('idle');

    try {
      // シミュレートされた入札処理
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setBidSubmitStatus('success');
      
      setTimeout(() => {
        setShowIncreaseBidModal(false);
        setBidSubmitStatus('idle');
        setIncreaseBidData({
          newBidAmount: '',
          maxBidAmount: '',
          autoIncrement: false
        });
      }, 2000);
    } catch (error) {
      setBidSubmitStatus('error');
    } finally {
      setIsSubmittingBid(false);
    }
  };

  const handleReminderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setReminderData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleReminderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReminder(true);
    setReminderSubmitStatus('idle');

    try {
      // リマインダー設定のシミュレーション
      await new Promise(resolve => setTimeout(resolve, 1500));
      setReminderSubmitStatus('success');
      setTimeout(() => {
        setShowReminderModal(false);
        setReminderSubmitStatus('idle');
        setReminderData({
          reminderTime: 30,
          emailNotification: true,
          pushNotification: true,
          customMessage: ''
        });
      }, 2000);
    } catch (error) {
      setReminderSubmitStatus('error');
    } finally {
      setIsSubmittingReminder(false);
    }
  };

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
                <h2 className="text-3xl font-black text-gray-900">Favorites</h2>
              </div>
              <p className="text-gray-600">お気に入りアイテム - {sortedFavorites.length}件</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 font-bold text-sm">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-sm pr-8"
                >
                  <option value="dateAdded">Date Added / 追加日</option>
                  <option value="currentBid">Current Bid / 現在価格</option>
                  <option value="estimatedValue">Estimated Value / 推定価値</option>
                  <option value="timeLeft">Time Left / 残り時間</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 font-bold text-sm">Filter:</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-sm pr-8"
                >
                  <option value="all">All / すべて</option>
                  <option value="active">Active / オークション中</option>
                  <option value="upcoming">Upcoming / 開始予定</option>
                  <option value="ended">Ended / 終了</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-heart-fill text-red-600 text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-gray-900">{favorites.length}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Total Favorites</h3>
              <p className="text-gray-500 text-sm">総お気に入り数</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-auction-fill text-green-600 text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-gray-900">{activeItems}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Active</h3>
              <p className="text-gray-500 text-sm">オークション中</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-time-fill text-blue-600 text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-gray-900">{upcomingItems}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Upcoming</h3>
              <p className="text-gray-500 text-sm">開始予定</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-yen-circle-fill text-purple-600 text-2xl"></i>
                </div>
                <span className="text-lg font-black text-gray-900">¥{totalValue.toLocaleString()}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Total Value</h3>
              <p className="text-gray-500 text-sm">総推定価値</p>
            </div>
          </div>

          {/* Favorites List */}
          <div className="space-y-6">
            {sortedFavorites.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-6">
                  <img
                    src={item.image}
                    alt={item.itemName}
                    className="w-32 h-32 object-cover object-top rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        item.status === 'active' ? 'bg-green-100 text-green-800' :
                        item.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.statusJa}
                      </div>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-600 text-sm">{item.dateAddedJa}に追加</span>
                      {item.bidders > 0 && (
                        <>
                          <span className="text-gray-400 text-sm">•</span>
                          <span className="text-gray-600 text-sm">{item.bidders} bidders</span>
                        </>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{item.itemName}</h4>
                    <p className="text-gray-600 mb-4">{item.itemNameJa}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          {item.status === 'active' ? 'Current Bid / 現在価格' : 
                           item.status === 'upcoming' ? 'Starting Price / 開始価格' :
                           'Final Price / 最終価格'}
                        </p>
                        <p className={`text-lg font-bold ${item.currentBid > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                          {item.currentBid > 0 ? `¥${item.currentBid.toLocaleString()}` : '未設定'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estimated Value / 推定価値</p>
                        <p className="text-lg font-bold text-blue-600">¥{item.estimatedValue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {item.status === 'active' ? 'Time Left / 残り時間' :
                           item.status === 'upcoming' ? 'Starts / 開始時間' :
                           'Status / ステータス'}
                        </p>
                        <p className={`text-lg font-bold ${
                          item.status === 'active' && item.timeLeftMinutes < 360 ? 'text-red-600' : 'text-gray-900'
                        }`}>
                          {item.timeLeft}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-3">
                    {item.status === 'active' && (
                      <button 
                        onClick={() => openIncreaseBidModal(item)}
                        className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-auction-fill mr-1"></i>
                        Place Bid / 入札する
                      </button>
                    )}
                    {item.status === 'upcoming' && (
                      <button 
                        onClick={() => openReminderModal(item)}
                        className="block w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-notification-line mr-1"></i>
                        Set Reminder / リマインダー設定
                      </button>
                    )}
                    <button 
                      onClick={() => handleViewDetails(item)}
                      className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-eye-line mr-1"></i>
                      View Details / 詳細を見る
                    </button>
                    <button 
                      onClick={() => removeFavorite(item.id)}
                      className="block w-full px-6 py-3 bg-red-100 text-red-700 font-bold rounded-lg hover:bg-red-200 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-heart-line mr-1"></i>
                      Remove / 削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedFavorites.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-heart-line text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Favorites</h3>
              <p className="text-gray-600 mb-6">まだお気に入りアイテムがありません</p>
              <Link to="/auctions" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all whitespace-nowrap cursor-pointer">
                <i className="ri-heart-fill mr-2"></i>
                Find Items / アイテムを探す
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-orange-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    ITEM DETAILS
                  </h3>
                  <p className="text-white/90">アイテム詳細</p>
                </div>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Image */}
                <div>
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.itemName}
                    className="w-full rounded-2xl shadow-lg"
                  />
                  <div className="mt-4 grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <img
                        key={i}
                        src={selectedItem.image}
                        alt={`View ${i}`}
                        className="w-full aspect-square object-cover object-top rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                      />
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div>
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold mb-4 ${
                    selectedItem.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedItem.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedItem.statusJa}
                  </div>

                  <h2 className="text-3xl font-black text-gray-900 mb-2">
                    {selectedItem.itemName}
                  </h2>
                  <p className="text-xl text-gray-600 mb-6">
                    {selectedItem.itemNameJa}
                  </p>

                  <div className="bg-gray-50 rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          {selectedItem.status === 'active' ? 'Current Bid / 現在価格' : 
                           selectedItem.status === 'upcoming' ? 'Starting Price / 開始価格' :
                           'Final Price / 最終価格'}
                        </p>
                        <p className="text-2xl font-black text-gray-900">
                          {selectedItem.currentBid > 0 ? `¥${selectedItem.currentBid.toLocaleString()}` : '未設定'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Estimated Value / 推定価値</p>
                        <p className="text-2xl font-black text-blue-600">
                          ¥{selectedItem.estimatedValue.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          {selectedItem.status === 'active' ? 'Time Left / 残り時間' :
                           selectedItem.status === 'upcoming' ? 'Starts / 開始時間' :
                           'Status / ステータス'}
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {selectedItem.timeLeft}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total Bids / 総入札数</p>
                        <p className="text-lg font-bold text-gray-900">
                          {selectedItem.bidders}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <i className="ri-verified-badge-fill text-green-600 text-xl"></i>
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold">Certified Authentic</p>
                        <p className="text-gray-500 text-sm">公的機関認証済み</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i className="ri-shield-check-fill text-blue-600 text-xl"></i>
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold">Buyer Protection</p>
                        <p className="text-gray-500 text-sm">購入者保護プログラム</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <i className="ri-truck-fill text-purple-600 text-xl"></i>
                      </div>
                      <div>
                        <p className="text-gray-900 font-bold">Free Shipping</p>
                        <p className="text-gray-500 text-sm">送料無料</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {selectedItem.status === 'active' && (
                      <button 
                        onClick={() => {
                          setShowDetailModal(false);
                          openIncreaseBidModal(selectedItem);
                        }}
                        className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-lg font-bold rounded-xl hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-auction-fill mr-2"></i>
                        Place Bid / 入札する
                      </button>
                    )}
                    {selectedItem.status === 'upcoming' && (
                      <button 
                        onClick={() => {
                          setShowDetailModal(false);
                          openReminderModal(selectedItem);
                        }}
                        className="w-full py-4 bg-blue-600 text-white text-lg font-bold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-notification-line mr-2"></i>
                        Set Reminder / リマインダー設定
                      </button>
                    )}
                    <button 
                      onClick={() => removeFavorite(selectedItem.id)}
                      className="w-full py-4 bg-red-100 text-red-700 font-bold rounded-xl hover:bg-red-200 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-heart-line mr-2"></i>
                      Remove from Favorites / お気に入りから削除
                    </button>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Description / 商品説明
                </h3>
                <div className="prose max-w-none text-gray-600">
                  <p className="mb-4">
                    This is an extremely rare and highly sought-after sneaker from Nike's exclusive collection. 
                    Only a limited number were produced worldwide, making this one of the most valuable sneakers in existence.
                  </p>
                  <p className="mb-4">
                    これは、ナイキの限定コレクションから生まれた極めて希少で人気の高いスニーカーです。
                    世界中で限定生産されており、現存する最も価値のあるスニーカーの1つとなっています。
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>100% Authentic with official certification / 公式認証付き100%本物</li>
                    <li>Original packaging included / オリジナルパッケージ付属</li>
                    <li>Pristine condition / 極上のコンディション</li>
                    <li>Certificate of authenticity / 真贋証明書付き</li>
                    <li>Limited edition number: #{selectedItem.id}/100</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Increase Bid Modal */}
      {showIncreaseBidModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    PLACE BID
                  </h3>
                  <p className="text-white/90">入札する</p>
                </div>
                <button
                  onClick={() => setShowIncreaseBidModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Item Info */}
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.itemName}
                  className="w-16 h-16 object-cover object-top rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{selectedItem.itemName}</h4>
                  <p className="text-gray-600 text-sm">{selectedItem.itemNameJa}</p>
                </div>
              </div>

              {/* Current Bid Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-blue-600 mb-1">Current Highest</p>
                  <p className="text-sm text-blue-600 mb-1">現在の最高額</p>
                  <p className="text-xl font-black text-blue-900">
                    ¥{selectedItem.currentBid.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-600 mb-1">Estimated Value</p>
                  <p className="text-sm text-green-600 mb-1">推定価値</p>
                  <p className="text-xl font-black text-green-900">
                    ¥{selectedItem.estimatedValue.toLocaleString()}
                  </p>
                </div>
              </div>

              <form onSubmit={handleIncreaseBidSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Your Bid Amount / 入札額 <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">¥</span>
                    <input
                      type="text"
                      name="newBidAmount"
                      value={increaseBidData.newBidAmount}
                      onChange={handleIncreaseBidChange}
                      required
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-lg font-bold"
                      placeholder="150,000"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Minimum bid: ¥{(selectedItem.currentBid + 1000).toLocaleString()}
                    <span className="block">最低入札額: ¥{(selectedItem.currentBid + 1000).toLocaleString()}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Maximum Auto Bid (Optional) / 自動入札上限額（任意）
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">¥</span>
                    <input
                      type="text"
                      name="maxBidAmount"
                      value={increaseBidData.maxBidAmount}
                      onChange={handleIncreaseBidChange}
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-lg"
                      placeholder="200,000"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Set a maximum amount for automatic bidding
                    <span className="block">自動入札の上限額を設定</span>
                  </p>
                </div>

                <div className="flex items-start space-x-3 bg-yellow-50 p-4 rounded-xl">
                  <input
                    type="checkbox"
                    name="autoIncrement"
                    checked={increaseBidData.autoIncrement}
                    onChange={handleIncreaseBidChange}
                    className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                  />
                  <label className="text-gray-700 text-sm leading-relaxed cursor-pointer">
                    Enable automatic bid increments when outbid
                    <span className="block mt-1">上回られた時に自動で入札額を上げる</span>
                  </label>
                </div>

                {/* Quick Bid Buttons */}
                <div>
                  <p className="text-gray-900 font-bold mb-3">Quick Bid / クイック入札</p>
                  <div className="grid grid-cols-3 gap-3">
                    {[5000, 10000, 20000].map((increment) => {
                      const quickBidAmount = selectedItem.currentBid + increment;
                      return (
                        <button
                          key={increment}
                          type="button"
                          onClick={() => setIncreaseBidData(prev => ({
                            ...prev,
                            newBidAmount: quickBidAmount.toLocaleString()
                          }))}
                          className="px-4 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-lg hover:border-red-500 hover:text-red-600 transition-colors whitespace-nowrap cursor-pointer"
                        >
                          +¥{increment.toLocaleString()}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {bidSubmitStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-checkbox-circle-fill text-green-600 text-2xl"></i>
                    <p className="text-green-800 font-bold">
                      Bid placed successfully! / 入札が完了しました！
                    </p>
                  </div>
                )}

                {bidSubmitStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-error-warning-fill text-red-600 text-2xl"></i>
                    <p className="text-red-800 font-bold">
                      Bid amount must be higher than current highest bid. / 入札額は現在の最高額より高く設定してください。
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowIncreaseBidModal(false)}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel / キャンセル
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingBid}
                    className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    {isSubmittingBid ? (
                      <>
                        <i className="ri-loader-4-line mr-2 animate-spin"></i>
                        Placing Bid... / 入札中...
                      </>
                    ) : (
                      <>
                        <i className="ri-auction-fill mr-2"></i>
                        Place Bid / 入札する
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      {showReminderModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    SET REMINDER
                  </h3>
                  <p className="text-white/90">リマインダー設定</p>
                </div>
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Item Info */}
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.itemName}
                  className="w-16 h-16 object-cover object-top rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-900 mb-1">{selectedItem.itemName}</h4>
                  <p className="text-gray-600 text-sm">{selectedItem.itemNameJa}</p>
                  <p className="text-blue-600 text-sm font-bold">{selectedItem.timeLeft}</p>
                </div>
              </div>

              <form onSubmit={handleReminderSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Reminder Time / リマインダー時間
                  </label>
                  <select
                    name="reminderTime"
                    value={reminderData.reminderTime}
                    onChange={handleReminderChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm pr-8"
                  >
                    <option value={5}>5分前</option>
                    <option value={15}>15分前</option>
                    <option value={30}>30分前</option>
                    <option value={60}>1時間前</option>
                    <option value={180}>3時間前</option>
                    <option value={1440}>1日前</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-4">
                    Notification Methods / 通知方法
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="emailNotification"
                        checked={reminderData.emailNotification}
                        onChange={handleReminderChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <i className="ri-mail-line text-blue-600"></i>
                        <span className="text-gray-700">Email Notification / メール通知</span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="pushNotification"
                        checked={reminderData.pushNotification}
                        onChange={handleReminderChange}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center space-x-2">
                        <i className="ri-smartphone-line text-blue-600"></i>
                        <span className="text-gray-700">Push Notification / プッシュ通知</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Custom Message (Optional) / カスタムメッセージ（任意）
                  </label>
                  <textarea
                    name="customMessage"
                    value={reminderData.customMessage}
                    onChange={handleReminderChange}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm resize-none"
                    placeholder="例: このアイテムの入札を忘れずに！"
                    maxLength={200}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {reminderData.customMessage.length}/200文字
                  </p>
                </div>

                {/* Preview */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h5 className="font-bold text-blue-900 mb-3">
                    <i className="ri-eye-line mr-2"></i>
                    Preview / プレビュー
                  </h5>
                  <div className="bg-white rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <i className="ri-notification-fill text-blue-600"></i>
                      <span className="font-bold text-gray-900">オークション開始リマインダー</span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      {selectedItem.itemName} のオークションが{reminderData.reminderTime}分後に開始されます。
                    </p>
                    {reminderData.customMessage && (
                      <p className="text-sm text-blue-700 italic">
                        "{reminderData.customMessage}"
                      </p>
                    )}
                  </div>
                </div>

                {reminderSubmitStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-checkbox-circle-fill text-green-600 text-2xl"></i>
                    <p className="text-green-800 font-bold">
                      Reminder set successfully! / リマインダーが設定されました！
                    </p>
                  </div>
                )}

                {reminderSubmitStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-error-warning-fill text-red-600 text-2xl"></i>
                    <p className="text-red-800 font-bold">
                      Failed to set reminder. Please try again. / リマインダーの設定に失敗しました。もう一度お試しください。
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowReminderModal(false)}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel / キャンセル
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingReminder}
                    className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    {isSubmittingReminder ? (
                      <>
                        <i className="ri-loader-4-line mr-2 animate-spin"></i>
                        Setting... / 設定中...
                      </>
                    ) : (
                      <>
                        <i className="ri-notification-fill mr-2"></i>
                        Set Reminder / リマインダー設定
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}