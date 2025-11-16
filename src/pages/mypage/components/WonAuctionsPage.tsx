import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function WonAuctionsPage() {
  const [sortBy, setSortBy] = useState('date');
  const [filterBy, setFilterBy] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    productRating: 0,
    sellerRating: 0,
    shippingRating: 0,
    overallRating: 0,
    reviewTitle: '',
    reviewText: '',
    wouldRecommend: true,
    isAnonymous: false
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmitStatus, setReviewSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [paymentData, setPaymentData] = useState({
    paymentMethod: 'credit',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: '',
    billingCity: '',
    billingPostal: '',
    saveCard: false
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const wonAuctions = [
    {
      id: 1,
      itemName: 'Nike Air Jordan 1 "Chicago"',
      itemNameJa: 'ナイキ エアジョーダン1 "シカゴ"',
      winningBid: 89000,
      dateWon: '2024-01-15',
      dateWonJa: '2024年1月15日',
      totalBidders: 45,
      paymentStatus: 'paid',
      paymentStatusJa: '支払い済み',
      shippingStatus: 'delivered',
      shippingStatusJa: '配送完了',
      image: 'https://readdy.ai/api/search-image?query=Classic%20Nike%20Air%20Jordan%201%20Chicago%20sneakers%20in%20iconic%20white%20red%20and%20black%20colorway%20with%20premium%20leather%20construction%20displayed%20on%20elegant%20white%20marble%20pedestal%20with%20professional%20studio%20lighting%20and%20clean%20minimalist%20background%20showcasing%20authentic%20vintage%20design%20and%20collector%20quality&width=400&height=300&seq=wonauc1&orientation=landscape'
    },
    {
      id: 2,
      itemName: 'Nike Dunk Low "Panda"',
      itemNameJa: 'ナイキ ダンク ロー "パンダ"',
      winningBid: 45000,
      dateWon: '2024-01-10',
      dateWonJa: '2024年1月10日',
      totalBidders: 32,
      paymentStatus: 'paid',
      paymentStatusJa: '支払い済み',
      shippingStatus: 'shipped',
      shippingStatusJa: '配送中',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Dunk%20Low%20Panda%20sneakers%20in%20clean%20white%20and%20black%20colorway%20with%20classic%20basketball%20silhouette%20displayed%20on%20sleek%20black%20acrylic%20stand%20with%20dramatic%20spotlighting%20and%20gradient%20background%20emphasizing%20timeless%20design%20and%20premium%20quality%20construction&width=400&height=300&seq=wonauc2&orientation=landscape'
    },
    {
      id: 3,
      itemName: 'Nike Air Force 1 "Off-White"',
      itemNameJa: 'ナイキ エアフォース1 "オフホワイト"',
      winningBid: 156000,
      dateWon: '2024-01-05',
      dateWonJa: '2024年1月5日',
      totalBidders: 67,
      paymentStatus: 'paid',
      paymentStatusJa: '支払い済み',
      shippingStatus: 'delivered',
      shippingStatusJa: '配送完了',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Force%201%20Off-White%20collaboration%20sneakers%20featuring%20deconstructed%20design%20with%20exposed%20foam%20and%20distinctive%20zip%20tie%20detail%20displayed%20on%20luxury%20glass%20platform%20with%20warm%20ambient%20lighting%20and%20sophisticated%20background%20highlighting%20exclusive%20streetwear%20aesthetic&width=400&height=300&seq=wonauc3&orientation=landscape'
    },
    {
      id: 4,
      itemName: 'Nike SB Dunk High "Tiffany"',
      itemNameJa: 'ナイキ SB ダンク ハイ "ティファニー"',
      winningBid: 234000,
      dateWon: '2023-12-28',
      dateWonJa: '2023年12月28日',
      totalBidders: 89,
      paymentStatus: 'paid',
      paymentStatusJa: '支払い済み',
      shippingStatus: 'delivered',
      shippingStatusJa: '配送完了',
      image: 'https://readdy.ai/api/search-image?query=Rare%20Nike%20SB%20Dunk%20High%20Tiffany%20sneakers%20in%20distinctive%20aqua%20blue%20suede%20with%20premium%20silver%20accents%20and%20crocodile%20texture%20details%20displayed%20on%20premium%20wooden%20display%20case%20with%20soft%20professional%20lighting%20and%20clean%20white%20background%20showcasing%20luxury%20craftsmanship&width=400&height=300&seq=wonauc4&orientation=landscape'
    },
    {
      id: 5,
      itemName: 'Nike Air Max 1 "Patta Waves"',
      itemNameJa: 'ナイキ エアマックス1 "パッタ ウェーブス"',
      winningBid: 67500,
      dateWon: '2023-12-20',
      dateWonJa: '2023年12月20日',
      totalBidders: 28,
      paymentStatus: 'pending',
      paymentStatusJa: '支払い待ち',
      shippingStatus: 'pending',
      shippingStatusJa: '配送待ち',
      image: 'https://readdy.ai/api/search-image?query=Nike%20Air%20Max%201%20Patta%20Waves%20collaboration%20sneakers%20featuring%20unique%20wave%20pattern%20design%20with%20premium%20materials%20and%20distinctive%20colorway%20displayed%20on%20modern%20acrylic%20pedestal%20with%20artistic%20lighting%20and%20minimalist%20background%20emphasizing%20collaborative%20streetwear%20innovation&width=400&height=300&seq=wonauc5&orientation=landscape'
    }
  ];

  const filteredAuctions = wonAuctions.filter(auction => {
    if (filterBy === 'all') return true;
    const auctionDate = new Date(auction.dateWon);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - auctionDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    switch (filterBy) {
      case 'week':
        return diffDays <= 7;
      case 'month':
        return diffDays <= 30;
      case 'year':
        return diffDays <= 365;
      default:
        return true;
    }
  });

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sortBy) {
      case 'dateWon':
        return new Date(b.dateWon).getTime() - new Date(a.dateWon).getTime();
      case 'winningBid':
        return b.winningBid - a.winningBid;
      case 'itemName':
        return a.itemName.localeCompare(b.itemName);
      default:
        return 0;
    }
  });

  const totalSpent = wonAuctions.reduce((sum, auction) => sum + auction.winningBid, 0);
  const paidItems = wonAuctions.filter(auction => auction.paymentStatus === 'paid').length;
  const deliveredItems = wonAuctions.filter(auction => auction.shippingStatus === 'delivered').length;

  const handleViewDetails = (item: any) => {
    setSelectedItem(item);
    setShowDetailsModal(true);
  };

  const handleRatingChange = (category: string, value: number) => {
    setReviewData(prev => ({
      ...prev,
      [category]: value
    }));
    
    // Calculate overall rating
    const ratings = { ...reviewData, [category]: value };
    const avgRating = Math.round((ratings.productRating + ratings.sellerRating + ratings.shippingRating) / 3);
    setReviewData(prev => ({
      ...prev,
      [category]: value,
      overallRating: avgRating
    }));
  };

  const handleReviewInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setReviewData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingReview(true);
    setReviewSubmitStatus('idle');

    try {
      // Simulate review submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (reviewData.overallRating > 0 && reviewData.reviewText.trim()) {
        setReviewSubmitStatus('success');
        setTimeout(() => {
          setShowRatingModal(false);
          setReviewSubmitStatus('idle');
          setReviewData({
            productRating: 0,
            sellerRating: 0,
            shippingRating: 0,
            overallRating: 0,
            reviewTitle: '',
            reviewText: '',
            wouldRecommend: true,
            isAnonymous: false
          });
        }, 2000);
      } else {
        setReviewSubmitStatus('error');
      }
    } catch (error) {
      setReviewSubmitStatus('error');
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setPaymentData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);
    setPaymentStatus('idle');

    try {
      // 支払い処理のシミュレーション
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPaymentStatus('success');
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentStatus('idle');
        setPaymentData({
          paymentMethod: 'credit',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          cardName: '',
          billingAddress: '',
          billingCity: '',
          billingPostal: '',
          saveCard: false
        });
      }, 2000);
    } catch (error) {
      setPaymentStatus('error');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const openPaymentModal = (item: any) => {
    setSelectedItem(item);
    setShowPaymentModal(true);
  };

  const openRatingModal = (item: any) => {
    setSelectedItem(item);
    setShowRatingModal(true);
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
                <h2 className="text-3xl font-black text-gray-900">Won Auctions</h2>
              </div>
              <p className="text-gray-600">落札したオークション - {sortedAuctions.length}件</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 font-bold text-sm">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-sm pr-8"
                >
                  <option value="dateWon">Date Won / 落札日</option>
                  <option value="winningBid">Winning Bid / 落札額</option>
                  <option value="itemName">Item Name / 商品名</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-700 font-bold text-sm">Period:</label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-sm pr-8"
                >
                  <option value="all">All Time / すべて</option>
                  <option value="week">Last Week / 先週</option>
                  <option value="month">Last Month / 先月</option>
                  <option value="year">Last Year / 昨年</option>
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
                <span className="text-2xl font-black text-gray-900">{wonAuctions.length}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Total Won</h3>
              <p className="text-gray-500 text-sm">総落札数</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-money-yen-circle-fill text-blue-600 text-2xl"></i>
                </div>
                <span className="text-lg font-black text-gray-900">¥{totalSpent.toLocaleString()}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Total Spent</h3>
              <p className="text-gray-500 text-sm">総支払額</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i className="ri-bank-card-fill text-purple-600 text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-gray-900">{paidItems}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Paid Items</h3>
              <p className="text-gray-500 text-sm">支払い済み</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <i className="ri-truck-fill text-orange-600 text-2xl"></i>
                </div>
                <span className="text-2xl font-black text-gray-900">{deliveredItems}</span>
              </div>
              <h3 className="text-gray-900 font-bold mb-1">Delivered</h3>
              <p className="text-gray-500 text-sm">配送完了</p>
            </div>
          </div>

          {/* Won Auctions List */}
          <div className="space-y-6">
            {sortedAuctions.map((auction) => (
              <div key={auction.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center space-x-6">
                  <img
                    src={auction.image}
                    alt={auction.itemName}
                    className="w-32 h-32 object-cover object-top rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        auction.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {auction.paymentStatusJa}
                      </div>
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                        auction.shippingStatus === 'delivered' ? 'bg-blue-100 text-blue-800' :
                        auction.shippingStatus === 'shipped' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {auction.shippingStatusJa}
                      </div>
                      <span className="text-gray-400 text-sm">•</span>
                      <span className="text-gray-600 text-sm">{auction.totalBidders} bidders</span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{auction.itemName}</h4>
                    <p className="text-gray-600 mb-4">{auction.itemNameJa}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Winning Bid / 落札額</p>
                        <p className="text-lg font-bold text-green-600">¥{auction.winningBid.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date Won / 落札日</p>
                        <p className="text-lg font-bold text-gray-900">{auction.dateWonJa}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Bidders / 入札者数</p>
                        <p className="text-lg font-bold text-gray-900">{auction.totalBidders}人</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-3">
                    {auction.paymentStatus === 'pending' && (
                      <button 
                        onClick={() => openPaymentModal(auction)}
                        className="block w-full px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-bank-card-line mr-1"></i>
                        Pay Now / 今すぐ支払う
                      </button>
                    )}
                    <button
                      onClick={() => handleViewDetails(auction)}
                      className="block w-full px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-eye-line mr-1"></i>
                      View Details / 詳細を見る
                    </button>
                    {auction.shippingStatus === 'delivered' && (
                      <button
                        onClick={() => openRatingModal(auction)}
                        className="block w-full px-6 py-3 bg-blue-100 text-blue-700 font-bold rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <i className="ri-star-line mr-1"></i>
                        Rate & Review / 評価する
                      </button>
                    )}
                    {auction.shippingStatus === 'shipped' && (
                      <button className="block w-full px-6 py-3 bg-purple-100 text-purple-700 font-bold rounded-lg hover:bg-purple-200 transition-colors whitespace-nowrap cursor-pointer">
                        <i className="ri-truck-line mr-1"></i>
                        Track Package / 配送追跡
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {sortedAuctions.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-trophy-line text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Won Auctions</h3>
              <p className="text-gray-600 mb-6">まだ落札したオークションがありません</p>
              <Link to="/auctions" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-lg hover:shadow-lg transition-all whitespace-nowrap cursor-pointer">
                <i className="ri-auction-fill mr-2"></i>
                Browse Auctions / オークションを見る
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <i className="ri-trophy-fill text-white text-2xl"></i>
                    <span className="text-white font-bold">CONGRATULATIONS! / おめでとうございます！</span>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    {selectedItem.itemName}
                  </h3>
                  <p className="text-white/90">{selectedItem.itemNameJa}</p>
                </div>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Images */}
                <div>
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.itemName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={selectedItem.image}
                          alt={`${selectedItem.itemName} ${i}`}
                          className="w-full h-full object-cover object-top opacity-60"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                  {/* Winning Information */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-trophy-fill text-green-600 mr-2"></i>
                      Winning Information / 落札情報
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Winning Bid / 落札価格</p>
                        <p className="text-2xl font-black text-gray-900">
                          ¥{selectedItem.winningBid.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Won Date / 落札日時</p>
                        <p className="text-lg font-bold text-gray-900">
                          {selectedItem.wonDate}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Payment Status / 支払い状況</p>
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                          <i className="ri-checkbox-circle-fill mr-1"></i>
                          Paid / 支払い済み
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Transaction ID / 取引ID</p>
                        <p className="text-sm font-mono text-gray-900">TXN-{selectedItem.id}2024001</p>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-truck-fill text-blue-600 mr-2"></i>
                      Shipping Information / 配送情報
                    </h4>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Shipping Status / 配送状況</p>
                          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                            <i className="ri-truck-fill mr-1"></i>
                            {selectedItem.statusJa}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Tracking Number / 追跡番号</p>
                          <p className="text-sm font-mono text-gray-900">JP1234567890</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Shipping Address / 配送先住所</p>
                        <p className="text-sm text-gray-900">
                          〒150-0001<br />
                          東京都渋谷区神宮前1-2-3<br />
                          山田 太郎 様
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Estimated Delivery / 配送予定日</p>
                        <p className="text-sm font-bold text-gray-900">2024年1月20日 (土)</p>
                      </div>
                    </div>
                  </div>

                  {/* Authentication & Features */}
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                      <i className="ri-shield-check-fill text-gray-600 mr-2"></i>
                      Authentication & Features / 認証・特典
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <i className="ri-verified-badge-fill text-green-600"></i>
                        <span className="text-sm text-gray-900">Officially Certified / 公式認証済み</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-shield-check-fill text-blue-600"></i>
                        <span className="text-sm text-gray-900">Buyer Protection / 購入者保護</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-file-text-fill text-purple-600"></i>
                        <span className="text-sm text-gray-900">Certificate Included / 証明書付き</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-refresh-line text-orange-600"></i>
                        <span className="text-sm text-gray-900">30-Day Return / 30日間返品保証</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Description */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-3">
                      Product Description / 商品説明
                    </h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      This is an extremely rare Nike Air Force 1 collaboration with Louis Vuitton, 
                      featuring premium monogram canvas and leather construction. Only a limited number 
                      were produced, making this a highly sought-after collector's item.
                    </p>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      これは非常に希少なナイキ エアフォース1とルイ・ヴィトンのコラボレーションモデルで、
                      プレミアムなモノグラムキャンバスとレザーを使用しています。限定生産のため、
                      コレクターにとって非常に価値の高いアイテムです。
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <button className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-file-text-line mr-2"></i>
                      View Invoice / 請求書を表示
                    </button>
                    <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-truck-line mr-2"></i>
                      Track Package / 配送を追跡
                    </button>
                    <button className="px-6 py-3 bg-yellow-600 text-white font-bold rounded-xl hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-star-line mr-2"></i>
                      Write Review / レビューを書く
                    </button>
                    <button className="px-6 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer">
                      <i className="ri-download-line mr-2"></i>
                      Download Certificate / 証明書をダウンロード
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-orange-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    PAYMENT
                  </h3>
                  <p className="text-white/90">支払い処理</p>
                </div>
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">
                  Order Summary / 注文概要
                </h4>
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.itemName}
                    className="w-16 h-16 object-cover object-top rounded-lg"
                  />
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900">{selectedItem.itemName}</h5>
                    <p className="text-gray-600 text-sm">{selectedItem.itemNameJa}</p>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">落札価格</span>
                    <span className="font-bold">¥{selectedItem.winningBid.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">配送料</span>
                    <span className="font-bold">¥1,500</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">手数料</span>
                    <span className="font-bold">¥{Math.floor(selectedItem.winningBid * 0.05).toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">合計金額</span>
                      <span className="text-xl font-black text-red-600">
                        ¥{(selectedItem.winningBid + 1500 + Math.floor(selectedItem.winningBid * 0.05)).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                {/* Payment Method */}
                <div>
                  <label className="block text-gray-900 font-bold mb-4">
                    Payment Method / 支払い方法
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit"
                        checked={paymentData.paymentMethod === 'credit'}
                        onChange={handlePaymentChange}
                        className="w-4 h-4 text-red-600"
                      />
                      <div className="flex items-center space-x-2">
                        <i className="ri-bank-card-line text-2xl text-gray-600"></i>
                        <span className="font-bold text-gray-900">クレジットカード</span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={paymentData.paymentMethod === 'bank'}
                        onChange={handlePaymentChange}
                        className="w-4 h-4 text-red-600"
                      />
                      <div className="flex items-center space-x-2">
                        <i className="ri-bank-line text-2xl text-gray-600"></i>
                        <span className="font-bold text-gray-900">銀行振込</span>
                      </div>
                    </label>
                    <label className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-red-500 transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentData.paymentMethod === 'paypal'}
                        onChange={handlePaymentChange}
                        className="w-4 h-4 text-red-600"
                      />
                      <div className="flex items-center space-x-2">
                        <i className="ri-paypal-line text-2xl text-gray-600"></i>
                        <span className="font-bold text-gray-900">PayPal</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Credit Card Details */}
                {paymentData.paymentMethod === 'credit' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-900 font-bold mb-2">
                        Card Number / カード番号 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentData.cardNumber}
                        onChange={handlePaymentChange}
                        required
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-900 font-bold mb-2">
                          Expiry Date / 有効期限 <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentData.expiryDate}
                          onChange={handlePaymentChange}
                          required
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-bold mb-2">
                          CVV <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={paymentData.cvv}
                          onChange={handlePaymentChange}
                          required
                          placeholder="123"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-900 font-bold mb-2">
                        Cardholder Name / カード名義 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={paymentData.cardName}
                        onChange={handlePaymentChange}
                        required
                        placeholder="YAMADA TARO"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                      />
                    </div>
                  </div>
                )}

                {/* Bank Transfer Details */}
                {paymentData.paymentMethod === 'bank' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h5 className="font-bold text-blue-900 mb-4">
                      <i className="ri-information-line mr-2"></i>
                      Bank Transfer Information / 銀行振込情報
                    </h5>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-blue-700">銀行名:</span>
                        <span className="font-bold text-blue-900">みずほ銀行</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">支店名:</span>
                        <span className="font-bold text-blue-900">渋谷支店</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">口座種別:</span>
                        <span className="font-bold text-blue-900">普通預金</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">口座番号:</span>
                        <span className="font-bold text-blue-900">1234567</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">口座名義:</span>
                        <span className="font-bold text-blue-900">カ）レアキックス</span>
                      </div>
                    </div>
                    <p className="text-blue-700 text-xs mt-4">
                      ※ 振込手数料はお客様負担となります。振込確認後、商品を発送いたします。
                    </p>
                  </div>
                )}

                {/* PayPal Details */}
                {paymentData.paymentMethod === 'paypal' && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center">
                    <i className="ri-paypal-line text-6xl text-yellow-600 mb-4"></i>
                    <h5 className="font-bold text-yellow-900 mb-2">PayPal Payment</h5>
                    <p className="text-yellow-700 text-sm">
                      PayPalアカウントでの支払いを選択されました。
                      「支払いを完了する」ボタンをクリックすると、PayPalのページに移動します。
                    </p>
                  </div>
                )}

                {/* Billing Address */}
                {paymentData.paymentMethod === 'credit' && (
                  <div className="space-y-4">
                    <h5 className="text-lg font-bold text-gray-900">
                      Billing Address / 請求先住所
                    </h5>
                    <div>
                      <label className="block text-gray-900 font-bold mb-2">
                        Address / 住所 <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        name="billingAddress"
                        value={paymentData.billingAddress}
                        onChange={handlePaymentChange}
                        required
                        placeholder="1-2-3 Shibuya"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-900 font-bold mb-2">
                          City / 市区町村 <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="billingCity"
                          value={paymentData.billingCity}
                          onChange={handlePaymentChange}
                          required
                          placeholder="Tokyo"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-900 font-bold mb-2">
                          Postal Code / 郵便番号 <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="billingPostal"
                          value={paymentData.billingPostal}
                          onChange={handlePaymentChange}
                          required
                          placeholder="150-0001"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                        />
                      </div>
                    </div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="saveCard"
                        checked={paymentData.saveCard}
                        onChange={handlePaymentChange}
                        className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">
                        Save card information for future purchases / 今後の購入のためにカード情報を保存
                      </span>
                    </label>
                  </div>
                )}

                {/* Security Notice */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <i className="ri-shield-check-fill text-green-600 text-2xl"></i>
                    <div>
                      <h6 className="font-bold text-green-900">Secure Payment / セキュア決済</h6>
                      <p className="text-green-700 text-sm">
                        お客様の決済情報は256bit SSL暗号化により保護されています。
                      </p>
                    </div>
                  </div>
                </div>

                {/* Status Messages */}
                {paymentStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-checkbox-circle-fill text-green-600 text-2xl"></i>
                    <p className="text-green-800 font-bold">
                      Payment completed successfully! / 支払いが完了しました！
                    </p>
                  </div>
                )}

                {paymentStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-error-warning-fill text-red-600 text-2xl"></i>
                    <p className="text-red-800 font-bold">
                      Payment failed. Please try again. / 支払いに失敗しました。もう一度お試しください。
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowPaymentModal(false)}
                    className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Cancel / キャンセル
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="flex-1 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    {isProcessingPayment ? (
                      <>
                        <i className="ri-loader-4-line mr-2 animate-spin"></i>
                        Processing... / 処理中...
                      </>
                    ) : (
                      <>
                        <i className="ri-secure-payment-line mr-2"></i>
                        Complete Payment / 支払いを完了する
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Rating & Review Modal */}
      {showRatingModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    RATE & REVIEW
                  </h3>
                  <p className="text-white/90">評価・レビューを投稿</p>
                </div>
                <button
                  onClick={() => setShowRatingModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleReviewSubmit} className="p-8">
              {/* Product Info */}
              <div className="flex items-center space-x-4 mb-8 p-4 bg-gray-50 rounded-xl">
                <img
                  src={selectedItem.image}
                  alt={selectedItem.itemName}
                  className="w-16 h-16 object-cover object-top rounded-lg"
                />
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{selectedItem.itemName}</h4>
                  <p className="text-gray-600">{selectedItem.itemNameJa}</p>
                  <p className="text-sm text-gray-500">落札価格: ¥{selectedItem.winningBid.toLocaleString()}</p>
                </div>
              </div>

              {/* Rating Categories */}
              <div className="space-y-6 mb-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">
                  Rate Your Experience / 体験を評価してください
                </h4>

                {/* Product Rating */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h5 className="text-lg font-bold text-gray-900">Product Quality / 商品品質</h5>
                      <p className="text-sm text-gray-600">商品の状態や品質はいかがでしたか？</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange('productRating', star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="w-8 h-8 flex items-center justify-center cursor-pointer"
                        >
                          <i className={`ri-star-${
                            star <= (hoverRating || reviewData.productRating) ? 'fill' : 'line'
                          } text-2xl ${
                            star <= (hoverRating || reviewData.productRating) ? 'text-yellow-500' : 'text-gray-300'
                          }`}></i>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Seller Rating */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h5 className="text-lg font-bold text-gray-900">Seller Service / 出品者対応</h5>
                      <p className="text-sm text-gray-600">出品者の対応はいかがでしたか？</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange('sellerRating', star)}
                          className="w-8 h-8 flex items-center justify-center cursor-pointer"
                        >
                          <i className={`ri-star-${
                            star <= reviewData.sellerRating ? 'fill' : 'line'
                          } text-2xl ${
                            star <= reviewData.sellerRating ? 'text-yellow-500' : 'text-gray-300'
                          }`}></i>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Shipping Rating */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h5 className="text-lg font-bold text-gray-900">Shipping & Packaging / 配送・梱包</h5>
                      <p className="text-sm text-gray-600">配送や梱包はいかがでしたか？</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange('shippingRating', star)}
                          className="w-8 h-8 flex items-center justify-center cursor-pointer"
                        >
                          <i className={`ri-star-${
                            star <= reviewData.shippingRating ? 'fill' : 'line'
                          } text-2xl ${
                            star <= reviewData.shippingRating ? 'text-yellow-500' : 'text-gray-300'
                          }`}></i>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Overall Rating Display */}
                {reviewData.overallRating > 0 && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-lg font-bold text-gray-900">Overall Rating / 総合評価</h5>
                        <p className="text-sm text-gray-600">自動計算された総合評価</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <i
                              key={star}
                              className={`ri-star-${
                                star <= reviewData.overallRating ? 'fill' : 'line'
                              } text-2xl ${
                                star <= reviewData.overallRating ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            ></i>
                          ))}
                        </div>
                        <span className="text-2xl font-bold text-gray-900">
                          {reviewData.overallRating}/5
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Written Review */}
              <div className="space-y-6 mb-8">
                <h4 className="text-xl font-bold text-gray-900">
                  Write Your Review / レビューを書く
                </h4>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Review Title / レビュータイトル
                  </label>
                  <input
                    type="text"
                    name="reviewTitle"
                    value={reviewData.reviewTitle}
                    onChange={handleReviewInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm"
                    placeholder="例: 期待以上の素晴らしい商品でした"
                    maxLength={100}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {reviewData.reviewTitle.length}/100文字
                  </p>
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Detailed Review / 詳細レビュー <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    name="reviewText"
                    value={reviewData.reviewText}
                    onChange={handleReviewInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-sm resize-none"
                    placeholder="商品の状態、配送の速さ、梱包の丁寧さなど、詳細な感想をお聞かせください。他の購入者の参考になるような具体的なレビューをお願いします。"
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {reviewData.reviewText.length}/500文字
                  </p>
                </div>

                {/* Additional Options */}
                <div className="space-y-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="wouldRecommend"
                      checked={reviewData.wouldRecommend}
                      onChange={handleReviewInputChange}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">
                      <i className="ri-thumb-up-line mr-2 text-blue-600"></i>
                      Would recommend to others / 他の人におすすめしたい
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="isAnonymous"
                      checked={reviewData.isAnonymous}
                      onChange={handleReviewInputChange}
                      className="w-5 h-5 text-gray-600 border-gray-300 rounded focus:ring-gray-500"
                    />
                    <span className="text-gray-700">
                      <i className="ri-user-unfollow-line mr-2 text-gray-600"></i>
                      Post anonymously / 匿名で投稿する
                    </span>
                  </label>
                </div>
              </div>

              {/* Review Preview */}
              {reviewData.overallRating > 0 && reviewData.reviewText.trim() && (
                <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">
                    <i className="ri-eye-line mr-2"></i>
                    Preview / プレビュー
                  </h4>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <i className="ri-user-fill text-gray-600"></i>
                        </div>
                        <span className="font-bold text-gray-900">
                          {reviewData.isAnonymous ? '匿名ユーザー' : '山田 太郎'}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            className={`ri-star-${
                              star <= reviewData.overallRating ? 'fill' : 'line'
                            } text-lg ${
                              star <= reviewData.overallRating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    {reviewData.reviewTitle && (
                      <h5 className="font-bold text-gray-900 mb-2">{reviewData.reviewTitle}</h5>
                    )}
                    <p className="text-gray-700 text-sm leading-relaxed mb-3">
                      {reviewData.reviewText}
                    </p>
                    {reviewData.wouldRecommend && (
                      <div className="flex items-center text-green-600 text-sm">
                        <i className="ri-thumb-up-fill mr-1"></i>
                        <span>おすすめします</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Status Messages */}
              {reviewSubmitStatus === 'success' && (
                <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3 mb-6">
                  <i className="ri-checkbox-circle-fill text-green-600 text-2xl"></i>
                  <p className="text-green-800 font-bold">
                    Review submitted successfully! / レビューが投稿されました！
                  </p>
                </div>
              )}

              {reviewSubmitStatus === 'error' && (
                <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center space-x-3 mb-6">
                  <i className="ri-error-warning-fill text-red-600 text-2xl"></i>
                  <p className="text-red-800 font-bold">
                    Failed to submit review. Please try again. / レビューの投稿に失敗しました。もう一度お試しください。
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowRatingModal(false)}
                  className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Cancel / キャンセル
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReview || reviewData.overallRating === 0 || !reviewData.reviewText.trim()}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  {isSubmittingReview ? (
                    <>
                      <i className="ri-loader-4-line mr-2 animate-spin"></i>
                      Submitting... / 投稿中...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-fill mr-2"></i>
                      Submit Review / レビューを投稿
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}