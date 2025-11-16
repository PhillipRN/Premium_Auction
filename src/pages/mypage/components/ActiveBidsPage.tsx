import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ActiveBidsPage() {
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('timeLeft');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showIncreaseBidModal, setShowIncreaseBidModal] = useState(false);
  const [increaseBidData, setIncreaseBidData] = useState({
    newBidAmount: '',
    maxBidAmount: '',
    autoIncrement: false
  });
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);
  const [bidSubmitStatus, setBidSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showAlertSettings, setShowAlertSettings] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    outbidAlert: true,
    timeAlert: true,
    timeAlertMinutes: 30,
    priceAlert: true,
    priceAlertThreshold: 10000,
    emailNotifications: true,
    pushNotifications: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const activeBids = [
    {
      id: 1,
      itemName: 'Nike Air Mag "Back to the Future"',
      itemNameJa: 'ナイキ エアマグ "バック・トゥ・ザ・フューチャー"',
      bidAmount: 125000,
      currentHighest: 125000,
      status: 'winning',
      statusJa: '最高入札中',
      timeLeft: '2日 14時間',
      timeLeftMinutes: 3840,
      bidders: 23,
      image: 'https://readdy.ai/api/search-image?query=Ultra%20rare%20Nike%20Air%20Mag%20Back%20to%20the%20Future%20self-lacing%20sneakers%20with%20glowing%20LED%20panels%20and%20metallic%20silver%20finish%20displayed%20on%20premium%20white%20pedestal%20with%20dramatic%20studio%20lighting%20and%20clean%20minimalist%20background%20showcasing%20futuristic%20design%20and%20authentic%20certification%20hologram&width=400&height=300&seq=activebid1&orientation=landscape'
    },
    {
      id: 2,
      itemName: 'Nike SB Dunk Low "Paris"',
      itemNameJa: 'ナイキ SB ダンク ロー "パリ"',
      bidAmount: 95000,
      currentHighest: 98000,
      status: 'outbid',
      statusJa: '上回られました',
      timeLeft: '1日 8時間',
      timeLeftMinutes: 1920,
      bidders: 18,
      image: 'https://readdy.ai/api/search-image?query=Extremely%20rare%20Nike%20SB%20Dunk%20Low%20Paris%20edition%20sneakers%20with%20artistic%20painted%20canvas%20upper%20featuring%20Eiffel%20Tower%20motifs%20displayed%20on%20elegant%20white%20marble%20pedestal%20with%20soft%20professional%20lighting%20and%20pristine%20white%20background%20highlighting%20unique%20artwork%20and%20premium%20craftsmanship&width=400&height=300&seq=activebid2&orientation=landscape'
    },
    {
      id: 3,
      itemName: 'Nike Air Yeezy 2 "Red October"',
      itemNameJa: 'ナイキ エアイージー2 "レッドオクトーバー"',
      bidAmount: 87500,
      currentHighest: 89000,
      status: 'outbid',
      statusJa: '上回られました',
      timeLeft: '4時間 32分',
      timeLeftMinutes: 272,
      bidders: 31,
      image: 'https://readdy.ai/api/search-image?query=Legendary%20Nike%20Air%20Yeezy%202%20Red%20October%20sneakers%20in%20vibrant%20all-red%20colorway%20with%20distinctive%20pyramid%20texture%20and%20gold%20aglets%20displayed%20on%20sleek%20black%20acrylic%20stand%20with%20dramatic%20spotlighting%20and%20clean%20gradient%20background%20emphasizing%20iconic%20silhouette%20and%20museum-quality%20presentation&width=400&height=300&seq=activebid3&orientation=landscape'
    },
    {
      id: 4,
      itemName: 'Nike Dunk SB "What The Dunk"',
      itemNameJa: 'ナイキ ダンク SB "ホワット・ザ・ダンク"',
      bidAmount: 156000,
      currentHighest: 156000,
      status: 'winning',
      statusJa: '最高入札中',
      timeLeft: '3日 22時間',
      timeLeftMinutes: 5640,
      bidders: 15,
      image: 'https://readdy.ai/api/search-image?query=Iconic%20Nike%20SB%20Dunk%20What%20The%20Dunk%20sneakers%20featuring%20patchwork%20design%20with%20multiple%20colorways%20and%20textures%20displayed%20on%20premium%20glass%20platform%20with%20professional%20studio%20lighting%20and%20clean%20white%20background%20showcasing%20unique%20artistic%20collaboration%20and%20collector%20value&width=400&height=300&seq=activebid4&orientation=landscape'
    },
    {
      id: 5,
      itemName: 'Nike Air Jordan 4 "Travis Scott"',
      itemNameJa: 'ナイキ エアジョーダン4 "トラヴィス・スコット"',
      bidAmount: 78000,
      currentHighest: 82000,
      status: 'outbid',
      statusJa: '上回られました',
      timeLeft: '6時間 15分',
      timeLeftMinutes: 375,
      bidders: 27,
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Jordan%204%20Travis%20Scott%20collaboration%20sneakers%20in%20blue%20suede%20with%20distinctive%20backwards%20swoosh%20and%20cactus%20jack%20branding%20displayed%20on%20luxury%20wooden%20display%20case%20with%20warm%20ambient%20lighting%20and%20sophisticated%20background%20highlighting%20exclusive%20design%20details&width=400&height=300&seq=activebid5&orientation=landscape'
    }
  ];

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setShowDetailModal(true);
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
      
      // 入札データを更新
      const updatedBids = activeBids.map(bid => 
        bid.id === selectedItem.id 
          ? { ...bid, bidAmount: newBidAmount, status: 'winning', statusJa: '最高入札中' }
          : bid
      );
      
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

  const openIncreaseBidModal = (item: any) => {
    setSelectedItem(item);
    setShowIncreaseBidModal(true);
    const suggestedBid = (item.currentBid || item.bidAmount) + 5000;
    setIncreaseBidData(prev => ({
      ...prev,
      newBidAmount: suggestedBid.toLocaleString()
    }));
  };

  const filteredBids = activeBids.filter(bid => {
    if (filterStatus === 'all') return true;
    return bid.status === filterStatus;
  });

  const sortedBids = [...filteredBids].sort((a, b) => {
    switch (sortBy) {
      case 'timeLeft':
        return a.timeLeftMinutes - b.timeLeftMinutes;
      case 'bidAmount':
        return b.bidAmount - a.bidAmount;
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const handleAlertSettingsChange = (field: string, value: any) => {
    setAlertSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAlertSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // アラート設定保存のシミュレーション
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setTimeout(() => {
        setShowAlertSettings(false);
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
                <h2 className="text-3xl font-black text-gray-900">Active Bids</h2>
              </div>
              <p className="text-gray-600">アクティブな入札 - {sortedBids.length}件</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 font-bold text-sm">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-sm pr-8"
                >
                  <option value="timeLeft">Time Left / 残り時間</option>
                  <option value="bidAmount">Bid Amount / 入札額</option>
                  <option value="status">Status / ステータス</option>
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
                  <option value="winning">Winning / 最高入札中</option>
                  <option value="outbid">Outbid / 上回られました</option>
                </select>
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-trophy-fill text-green-600 text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-gray-900">2</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Winning</h3>
              <p className="text-gray-500 text-sm">最高入札中</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-arrow-up-fill text-red-600 text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-gray-900">3</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Outbid</h3>
              <p className="text-gray-500 text-sm">上回られました</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-yen-circle-fill text-blue-600 text-2xl"></i>
                </div>
                <span className="text-lg font-black text-gray-900">¥541,500</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Total Bids</h3>
              <p className="text-gray-500 text-sm">総入札額</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-time-fill text-orange-600 text-2xl"></i>
                </div>
                <span className="text-lg font-black text-gray-900">4h 32m</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Next Ending</h3>
              <p className="text-gray-500 text-sm">次の終了</p>
            </div>
          </div>

          {/* Bids List */}
          <div className="space-y-6">
            {sortedBids.map((bid) => (
              <div key={bid.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-6">
                  <img
                    src={bid.image}
                    alt={bid.itemName}
                    className="w-32 h-32 object-cover object-top rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        bid.status === 'winning' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {bid.statusJa}
                      </div>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-600 text-sm">{bid.bidders} bidders</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{bid.itemName}</h4>
                    <p className="text-gray-600 mb-4">{bid.itemNameJa}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Your Bid / あなたの入札額</p>
                        <p className="text-lg font-bold text-gray-900">¥{bid.bidAmount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Current Highest / 現在最高額</p>
                        <p className={`text-lg font-bold ${bid.status === 'winning' ? 'text-green-600' : 'text-red-600'}`}>
                          ¥{bid.currentHighest.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time Left / 残り時間</p>
                        <p className={`text-lg font-bold ${bid.timeLeftMinutes < 360 ? 'text-red-600' : 'text-gray-900'}`}>
                          {bid.timeLeft}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-3">
                    <button 
                      onClick={() => openIncreaseBidModal(bid)}
                      className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-add-line mr-1"></i>
                      Increase Bid / 入札額を上げる
                    </button>
                    <button 
                      onClick={() => handleViewDetails(bid)}
                      className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-eye-line mr-1"></i>
                      View Details / 詳細を見る
                    </button>

                    <button
                      onClick={() => setShowAlertSettings(true)}
                      className="block w-full px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-notification-line mr-1"></i>
                      Set Alert / アラート設定
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedBids.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-auction-line text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Bids</h3>
              <p className="text-gray-600 mb-6">アクティブな入札がありません</p>
              <Link to="/auctions" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all whitespace-nowrap cursor-pointer">
                <i className="ri-auction-fill mr-2"></i>
                Browse Auctions / オークションを見る
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
                    AUCTION DETAILS
                  </h3>
                  <p className="text-white/90">オークション詳細</p>
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
                    selectedItem.status === 'winning' ? 'bg-green-100 text-green-800' :
                    selectedItem.status === 'outbid' ? 'bg-red-100 text-red-800' :
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
                        <p className="text-sm text-gray-500 mb-1">Your Bid / あなたの入札額</p>
                        <p className="text-2xl font-black text-gray-900">
                          ¥{selectedItem.bidAmount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Current Highest / 現在の最高額</p>
                        <p className="text-2xl font-black text-gray-900">
                          ¥{selectedItem.currentHighest.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Time Left / 残り時間</p>
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
                    <button className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-lg font-bold rounded-xl hover:shadow-lg transition-all whitespace-nowrap cursor-pointer">
                      <i className="ri-add-line mr-2"></i>
                      Increase Bid / 入札額を上げる
                    </button>
                    <button className="w-full py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-notification-3-line mr-2"></i>
                      Set Alert / アラート設定
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
                    Only 10 pairs were ever produced worldwide, making this one of the most valuable sneakers in existence.
                  </p>
                  <p className="mb-4">
                    これは、ナイキの限定コレクションから生まれた極めて希少で人気の高いスニーカーです。
                    世界中でわずか10足しか生産されておらず、現存する最も価値のあるスニーカーの1つとなっています。
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-4">
                    <li>100% Authentic with official certification / 公式認証付き100%本物</li>
                    <li>Original packaging included / オリジナルパッケージ付属</li>
                    <li>Pristine condition / 極上のコンディション</li>
                    <li>Certificate of authenticity / 真贋証明書付き</li>
                    <li>Limited edition number: #{selectedItem.id}/10</li>
                  </ul>
                </div>
              </div>

              {/* Bid History */}
              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Bid History / 入札履歴
                </h3>
                <div className="space-y-3">
                  {[
                    { bidder: 'You / あなた', amount: selectedItem.bidAmount, time: '2時間前', isYou: true },
                    { bidder: 'User ***8234', amount: selectedItem.bidAmount - 5000, time: '5時間前', isYou: false },
                    { bidder: 'User ***9156', amount: selectedItem.bidAmount - 10000, time: '1日前', isYou: false },
                    { bidder: 'User ***4521', amount: selectedItem.bidAmount - 15000, time: '1日前', isYou: false },
                    { bidder: 'User ***7893', amount: selectedItem.bidAmount - 20000, time: '2日前', isYou: false }
                  ].map((bid, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
                      bid.isYou ? 'bg-green-50 border-2 border-green-200' : 'bg-gray-50'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          bid.isYou ? 'bg-green-600' : 'bg-gray-400'
                        }`}>
                          <i className="ri-user-fill text-white"></i>
                        </div>
                        <div>
                          <p className={`font-bold ${bid.isYou ? 'text-green-900' : 'text-gray-900'}`}>
                            {bid.bidder}
                          </p>
                          <p className="text-gray-500 text-sm">{bid.time}</p>
                        </div>
                      </div>
                      <p className={`text-xl font-black ${bid.isYou ? 'text-green-900' : 'text-gray-900'}`}>
                        ¥{bid.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
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
                    INCREASE BID
                  </h3>
                  <p className="text-white/90">入札額を上げる</p>
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
                  <p className="text-sm text-blue-600 mb-1">Your Current Bid</p>
                  <p className="text-sm text-blue-600 mb-1">あなたの現在の入札額</p>
                  <p className="text-xl font-black text-blue-900">
                    ¥{selectedItem.bidAmount.toLocaleString()}
                  </p>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-xl">
                  <p className="text-sm text-red-600 mb-1">Current Highest</p>
                  <p className="text-sm text-red-600 mb-1">現在の最高額</p>
                  <p className="text-xl font-black text-red-900">
                    ¥{(selectedItem.currentBid || selectedItem.bidAmount).toLocaleString()}
                  </p>
                </div>
              </div>

              <form onSubmit={handleIncreaseBidSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    New Bid Amount / 新しい入札額 <span className="text-red-600">*</span>
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
                      placeholder="130,000"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Minimum bid: ¥{((selectedItem.currentBid || selectedItem.bidAmount) + 1000).toLocaleString()}
                    <span className="block">最低入札額: ¥{((selectedItem.currentBid || selectedItem.bidAmount) + 1000).toLocaleString()}</span>
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
                      const quickBidAmount = (selectedItem.currentBid || selectedItem.bidAmount) + increment;
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

      {/* Alert Settings Modal */}
      {showAlertSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-orange-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    ALERT SETTINGS
                  </h3>
                  <p className="text-white/90">アラート設定</p>
                </div>
                <button
                  onClick={() => setShowAlertSettings(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveAlertSettings} className="p-8">
              <div className="space-y-8">
                {/* Notification Types */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <i className="ri-notification-fill text-red-600 mr-2"></i>
                    Notification Types / 通知タイプ
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h5 className="font-bold text-gray-900">Outbid Alert / 上回られた時の通知</h5>
                        <p className="text-sm text-gray-600">他の人があなたの入札額を上回った時に通知</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={alertSettings.outbidAlert}
                          onChange={(e) => handleAlertSettingsChange('outbidAlert', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h5 className="font-bold text-gray-900">Time Alert / 時間アラート</h5>
                        <p className="text-sm text-gray-600">オークション終了前の指定時間に通知</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={alertSettings.timeAlert}
                          onChange={(e) => handleAlertSettingsChange('timeAlert', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    {alertSettings.timeAlert && (
                      <div className="ml-4 p-4 bg-blue-50 rounded-xl">
                        <label className="block text-gray-900 font-bold mb-2">
                          Alert Time / アラート時間
                        </label>
                        <select
                          value={alertSettings.timeAlertMinutes}
                          onChange={(e) => handleAlertSettingsChange('timeAlertMinutes', parseInt(e.target.value))}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm pr-8"
                        >
                          <option value={5}>5分前</option>
                          <option value={15}>15分前</option>
                          <option value={30}>30分前</option>
                          <option value={60}>1時間前</option>
                          <option value={180}>3時間前</option>
                          <option value={1440}>1日前</option>
                        </select>
                      </div>
                    )}

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <h5 className="font-bold text-gray-900">Price Alert / 価格アラート</h5>
                        <p className="text-sm text-gray-600">指定した価格に達した時に通知</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={alertSettings.priceAlert}
                          onChange={(e) => handleAlertSettingsChange('priceAlert', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    {alertSettings.priceAlert && (
                      <div className="ml-4 p-4 bg-blue-50 rounded-xl">
                        <label className="block text-gray-900 font-bold mb-2">
                          Price Threshold / 価格しきい値
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">¥</span>
                          <input
                            type="number"
                            value={alertSettings.priceAlertThreshold}
                            onChange={(e) => handleAlertSettingsChange('priceAlertThreshold', parseInt(e.target.value))}
                            className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                            placeholder="150000"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-2">この価格に達したら通知します</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notification Methods */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <i className="ri-send-plane-fill text-red-600 mr-2"></i>
                    Notification Methods / 通知方法
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <i className="ri-mail-fill text-blue-600"></i>
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">Email Notifications</h5>
                          <p className="text-sm text-gray-600">メール通知</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={alertSettings.emailNotifications}
                          onChange={(e) => handleAlertSettingsChange('emailNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <i className="ri-smartphone-fill text-green-600"></i>
                        </div>
                        <div>
                          <h5 className="font-bold text-gray-900">Push Notifications</h5>
                          <p className="text-sm text-gray-600">プッシュ通知</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={alertSettings.pushNotifications}
                          onChange={(e) => handleAlertSettingsChange('pushNotifications', e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Preview */}
                <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                    <i className="ri-eye-fill text-red-600 mr-2"></i>
                    Preview / プレビュー
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                      <i className="ri-notification-fill text-red-600"></i>
                      <div>
                        <p className="font-bold text-gray-900">入札が上回られました</p>
                        <p className="text-sm text-gray-600">Nike Air Mag "Back to the Future" - 新しい最高額: ¥130,000</p>
                      </div>
                    </div>
                    {alertSettings.timeAlert && (
                      <div className="flex items-center space-x-3 p-3 bg-white rounded-lg">
                        <i className="ri-time-fill text-orange-600"></i>
                        <div>
                          <p className="font-bold text-gray-900">オークション終了まで{alertSettings.timeAlertMinutes}分</p>
                          <p className="text-sm text-gray-600">Nike Air Mag "Back to the Future" - 現在の最高額: ¥125,000</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-checkbox-circle-fill text-green-600 text-2xl"></i>
                    <p className="text-green-800 font-bold">
                      Alert settings saved successfully! / アラート設定が保存されました！
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-error-warning-fill text-red-600 text-2xl"></i>
                    <p className="text-red-800 font-bold">
                      Failed to save settings. Please try again. / 設定の保存に失敗しました。もう一度お試しください。
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowAlertSettings(false)}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel / キャンセル
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line mr-2 animate-spin"></i>
                        Saving... / 保存中...
                      </>
                    ) : (
                      <>
                        <i className="ri-save-fill mr-2"></i>
                        Save Settings / 設定を保存
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}