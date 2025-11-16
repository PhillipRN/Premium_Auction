import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function AuctionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('ending');
  const [viewMode, setViewMode] = useState('grid');
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [autoBid, setAutoBid] = useState(false);
  const [maxAutoBid, setMaxAutoBid] = useState('');
  const [isBidSubmitting, setIsBidSubmitting] = useState(false);
  const [bidStatus, setBidStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const categories = [
    { id: 'all', name: 'All Categories', nameJa: '全てのカテゴリー' },
    { id: 'sneakers', name: 'Sneakers', nameJa: 'スニーカー' },
    { id: 'limited', name: 'Limited Edition', nameJa: '限定品' },
    { id: 'vintage', name: 'Vintage', nameJa: 'ヴィンテージ' },
    { id: 'collab', name: 'Collaborations', nameJa: 'コラボレーション' },
    { id: 'new', name: 'New Arrivals', nameJa: '新着' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices', nameJa: '全ての価格帯' },
    { id: 'under50k', name: 'Under ¥50,000', nameJa: '5万円以下' },
    { id: '50k-100k', name: '¥50,000 - ¥100,000', nameJa: '5万円 - 10万円' },
    { id: '100k-200k', name: '¥100,000 - ¥200,000', nameJa: '10万円 - 20万円' },
    { id: 'over200k', name: 'Over ¥200,000', nameJa: '20万円以上' }
  ];

  const sortOptions = [
    { id: 'ending', name: 'Ending Soon', nameJa: '終了間近' },
    { id: 'newest', name: 'Newest', nameJa: '新着順' },
    { id: 'price-low', name: 'Price: Low to High', nameJa: '価格: 安い順' },
    { id: 'price-high', name: 'Price: High to Low', nameJa: '価格: 高い順' },
    { id: 'bids', name: 'Most Bids', nameJa: '入札数順' }
  ];

  const auctions = [
    {
      id: 1,
      name: 'Nike Air Mag "Back to the Future"',
      nameJa: 'ナイキ エアマグ "バック・トゥ・ザ・フューチャー"',
      currentBid: 125000,
      image: 'https://readdy.ai/api/search-image?query=Ultra%20rare%20Nike%20Air%20Mag%20Back%20to%20the%20Future%20self-lacing%20sneakers%20with%20glowing%20LED%20panels%20and%20metallic%20silver%20finish%20displayed%20on%20premium%20white%20pedestal%20with%20dramatic%20studio%20lighting%20and%20clean%20minimalist%20background%20showcasing%20futuristic%20design%20and%20authentic%20certification%20hologram&width=600&height=450&seq=auction1&orientation=landscape',
      certified: true,
      edition: '1/10',
      timeLeft: '2h 45m',
      bidCount: 23,
      category: 'limited'
    },
    {
      id: 2,
      name: 'Nike SB Dunk Low "Paris"',
      nameJa: 'ナイキ SB ダンク ロー "パリ"',
      currentBid: 98000,
      image: 'https://readdy.ai/api/search-image?query=Extremely%20rare%20Nike%20SB%20Dunk%20Low%20Paris%20edition%20sneakers%20with%20artistic%20painted%20canvas%20upper%20featuring%20Eiffel%20Tower%20motifs%20displayed%20on%20elegant%20white%20marble%20pedestal%20with%20soft%20professional%20lighting%20and%20pristine%20white%20background%20highlighting%20unique%20artwork%20and%20premium%20craftsmanship&width=600&height=450&seq=auction2&orientation=landscape',
      certified: true,
      edition: '2/10',
      timeLeft: '5h 12m',
      bidCount: 18,
      category: 'collab'
    },
    {
      id: 3,
      name: 'Nike Air Yeezy 2 "Red October"',
      nameJa: 'ナイキ エアイージー2 "レッドオクトーバー"',
      currentBid: 87500,
      image: 'https://readdy.ai/api/search-image?query=Legendary%20Nike%20Air%20Yeezy%202%20Red%20October%20sneakers%20in%20vibrant%20all-red%20colorway%20with%20distinctive%20pyramid%20texture%20and%20gold%20aglets%20displayed%20on%20sleek%20black%20acrylic%20stand%20with%20dramatic%20spotlighting%20and%20clean%20gradient%20background%20emphasizing%20iconic%20silhouette%20and%20museum-quality%20presentation&width=600&height=450&seq=auction3&orientation=landscape',
      certified: true,
      edition: '3/10',
      timeLeft: '1d 3h',
      bidCount: 31,
      category: 'limited'
    },
    {
      id: 4,
      name: 'Off-White x Nike Air Jordan 1 "Chicago"',
      nameJa: 'オフホワイト x ナイキ エアジョーダン1 "シカゴ"',
      currentBid: 156000,
      image: 'https://readdy.ai/api/search-image?query=Iconic%20Off-White%20x%20Nike%20Air%20Jordan%201%20Chicago%20collaboration%20sneakers%20with%20deconstructed%20design%20orange%20tab%20and%20zip-tie%20displayed%20on%20modern%20white%20pedestal%20with%20professional%20studio%20lighting%20and%20clean%20minimalist%20background%20highlighting%20signature%20Virgil%20Abloh%20design%20elements&width=600&height=450&seq=auction4&orientation=landscape',
      certified: true,
      edition: '4/10',
      timeLeft: '3h 28m',
      bidCount: 42,
      category: 'collab'
    },
    {
      id: 5,
      name: 'Nike Dunk SB Low "Freddy Krueger"',
      nameJa: 'ナイキ ダンク SB ロー "フレディクルーガー"',
      currentBid: 234000,
      image: 'https://readdy.ai/api/search-image?query=Ultra%20rare%20Nike%20SB%20Dunk%20Low%20Freddy%20Krueger%20with%20distinctive%20red%20and%20green%20striped%20upper%20and%20claw%20marks%20displayed%20on%20premium%20black%20velvet%20pedestal%20with%20dramatic%20horror-themed%20lighting%20and%20clean%20dark%20background%20emphasizing%20unique%20nightmare-inspired%20design%20elements&width=600&height=450&seq=auction5&orientation=landscape',
      certified: true,
      edition: '5/10',
      timeLeft: '6h 15m',
      bidCount: 67,
      category: 'limited'
    },
    {
      id: 6,
      name: 'Travis Scott x Nike Air Jordan 1 "Mocha"',
      nameJa: 'トラヴィス・スコット x ナイキ エアジョーダン1 "モカ"',
      currentBid: 78000,
      image: 'https://readdy.ai/api/search-image?query=Travis%20Scott%20x%20Nike%20Air%20Jordan%201%20Mocha%20collaboration%20sneakers%20with%20reversed%20swoosh%20and%20unique%20brown%20colorway%20displayed%20on%20modern%20concrete%20pedestal%20with%20urban%20studio%20lighting%20and%20clean%20industrial%20background%20highlighting%20signature%20Travis%20Scott%20design%20details&width=600&height=450&seq=auction6&orientation=landscape',
      certified: true,
      edition: '6/10',
      timeLeft: '2d 8h',
      bidCount: 29,
      category: 'collab'
    }
  ];

  const handleBidClick = (auction: any) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setSelectedShoe(auction);
    setBidAmount((auction.currentBid + 5000).toString());
    setShowBidModal(true);
  };

  const handleQuickBid = (amount: number) => {
    const newBid = parseInt(bidAmount || '0') + amount;
    setBidAmount(newBid.toString());
  };

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const bidValue = parseInt(bidAmount);
    const minBid = selectedShoe.currentBid + 5000;
    
    if (bidValue < minBid) {
      alert(`最低入札額は¥${minBid.toLocaleString()}です`);
      return;
    }

    setIsBidSubmitting(true);
    setBidStatus('idle');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setBidStatus('success');
      setTimeout(() => {
        setShowBidModal(false);
        setBidStatus('idle');
        setBidAmount('');
        setMaxAutoBid('');
        setAutoBid(false);
        setSelectedShoe(null);
      }, 2000);
    } catch (error) {
      setBidStatus('error');
    } finally {
      setIsBidSubmitting(false);
    }
  };

  const handleLogin = () => {
    // シミュレートされたログイン
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const filteredAuctions = auctions.filter(auction => {
    const matchesSearch = auction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         auction.nameJa.includes(searchQuery);
    const matchesCategory = selectedCategory === 'all' || auction.category === selectedCategory;
    
    let matchesPrice = true;
    if (priceRange !== 'all') {
      const price = auction.currentBid;
      switch (priceRange) {
        case 'under50k':
          matchesPrice = price < 50000;
          break;
        case '50k-100k':
          matchesPrice = price >= 50000 && price < 100000;
          break;
        case '100k-200k':
          matchesPrice = price >= 100000 && price < 200000;
          break;
        case 'over200k':
          matchesPrice = price >= 200000;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedAuctions = [...filteredAuctions].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.currentBid - b.currentBid;
      case 'price-high':
        return b.currentBid - a.currentBid;
      case 'bids':
        return b.bidCount - a.bidCount;
      case 'newest':
        return b.id - a.id;
      default:
        return a.id - b.id;
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <i className="ri-vip-crown-fill text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-black font-bold text-xl tracking-tight">RARE KICKS</h1>
                <p className="text-gray-500 text-xs">レアキックス</p>
              </div>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-black transition-colors whitespace-nowrap cursor-pointer">
                Home / ホーム
              </Link>
              <Link to="/auctions" className="text-black hover:text-gray-600 transition-colors whitespace-nowrap cursor-pointer">
                Auctions / オークション
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-black transition-colors whitespace-nowrap cursor-pointer">
                About / 概要
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <Link to="/mypage" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all whitespace-nowrap cursor-pointer">
                  My Page / マイページ
                </Link>
              ) : (
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all whitespace-nowrap cursor-pointer"
                >
                  Sign In / ログイン
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
              LIVE AUCTIONS
            </h2>
            <p className="text-2xl font-bold text-white/90 mb-8">
              ライブオークション
            </p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Bid on the world's rarest sneakers. All items are authenticated and certified.
              <span className="block mt-1">世界最希少のスニーカーに入札。全商品が認証・鑑定済み。</span>
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Search */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl"></i>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search auctions... / オークションを検索..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none px-4 py-3 pr-8 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none bg-white text-sm cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} / {category.nameJa}
                    </option>
                  ))}
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="appearance-none px-4 py-3 pr-8 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none bg-white text-sm cursor-pointer"
                >
                  {priceRanges.map(range => (
                    <option key={range.id} value={range.id}>
                      {range.name} / {range.nameJa}
                    </option>
                  ))}
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none px-4 py-3 pr-8 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none bg-white text-sm cursor-pointer"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name} / {option.nameJa}
                    </option>
                  ))}
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"></i>
              </div>

              {/* View Mode Toggle */}
              <div className="flex bg-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-4 py-2 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    viewMode === 'grid' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <i className="ri-grid-fill"></i>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-md transition-all whitespace-nowrap cursor-pointer ${
                    viewMode === 'list' 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <i className="ri-list-check"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4">
            <p className="text-gray-600 text-sm">
              Showing {sortedAuctions.length} of {auctions.length} auctions / 
              {auctions.length}件中{sortedAuctions.length}件を表示
            </p>
          </div>
        </div>
      </section>

      {/* Auction Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedAuctions.map((auction) => (
                <div key={auction.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img 
                      src={auction.image} 
                      alt={auction.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-lg">
                      <p className="text-white text-sm font-bold">{auction.edition}</p>
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-red-600/90 backdrop-blur-sm rounded-lg">
                      <p className="text-white text-sm font-bold">{auction.timeLeft}</p>
                    </div>
                    {auction.certified && (
                      <div className="absolute bottom-4 right-4 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <i className="ri-verified-badge-fill text-white text-xl"></i>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{auction.name}</h4>
                    <p className="text-gray-600 text-sm mb-4">{auction.nameJa}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Current Bid / 現在価格</p>
                        <p className="text-2xl font-black text-gray-900">
                          ¥{auction.currentBid.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Bids / 入札数</p>
                        <p className="text-lg font-bold text-gray-900">{auction.bidCount}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleBidClick(auction)}
                      className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all whitespace-nowrap cursor-pointer"
                    >
                      <i className="ri-auction-fill mr-2"></i>
                      Place Bid / 入札する
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {sortedAuctions.map((auction) => (
                <div key={auction.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer">
                  <div className="flex items-center p-6">
                    <div className="w-32 h-32 flex-shrink-0 mr-6">
                      <img 
                        src={auction.image} 
                        alt={auction.name}
                        className="w-full h-full object-cover object-top rounded-xl"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-2xl font-bold text-gray-900 mb-2">{auction.name}</h4>
                          <p className="text-gray-600">{auction.nameJa}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-bold text-gray-700">
                              {auction.edition}
                            </span>
                            {auction.certified && (
                              <span className="flex items-center text-green-600 text-sm font-bold">
                                <i className="ri-verified-badge-fill mr-1"></i>
                                Certified
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-500 mb-1">Time Left / 残り時間</p>
                          <p className="text-xl font-bold text-red-600">{auction.timeLeft}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Current Bid / 現在価格</p>
                            <p className="text-3xl font-black text-gray-900">
                              ¥{auction.currentBid.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Bids / 入札数</p>
                            <p className="text-xl font-bold text-gray-900">{auction.bidCount}</p>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => handleBidClick(auction)}
                          className="px-8 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all whitespace-nowrap cursor-pointer"
                        >
                          <i className="ri-auction-fill mr-2"></i>
                          Place Bid / 入札する
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sortedAuctions.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-search-line text-gray-400 text-4xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No auctions found</h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your search criteria or filters.
                <span className="block mt-1">検索条件やフィルターを調整してみてください。</span>
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
                className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all whitespace-nowrap cursor-pointer"
              >
                Clear Filters / フィルターをクリア
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="bg-black p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    LOGIN REQUIRED
                  </h3>
                  <p className="text-white/90">ログインが必要です</p>
                </div>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-user-line text-black text-4xl"></i>
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Please Sign In to Bid
              </h4>
              <p className="text-gray-600 mb-8">
                You need to be logged in to place bids on auctions.
                <span className="block mt-2">入札を行うにはログインが必要です。</span>
              </p>

              <div className="space-y-4">
                <button
                  onClick={handleLogin}
                  className="w-full py-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-800 transition-all whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-login-box-fill mr-2"></i>
                  Sign In / ログイン
                </button>
                
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Cancel / キャンセル
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bid Modal */}
      {showBidModal && selectedShoe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-black p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    PLACE YOUR BID
                  </h3>
                  <p className="text-white/90">入札する</p>
                </div>
                <button
                  onClick={() => {
                    setShowBidModal(false);
                    setBidAmount('');
                    setMaxAutoBid('');
                    setAutoBid(false);
                    setSelectedShoe(null);
                  }}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleBidSubmit} className="p-8">
              <div className="space-y-6">
                {/* Item Info */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                  <img
                    src={selectedShoe.image}
                    alt={selectedShoe.name}
                    className="w-20 h-20 object-cover object-top rounded-lg"
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900">{selectedShoe.name}</h4>
                    <p className="text-gray-600 text-sm">{selectedShoe.nameJa}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Current Bid: <span className="font-bold text-gray-900">¥{selectedShoe.currentBid.toLocaleString()}</span>
                    </p>
                  </div>
                </div>

                {/* Bid Amount */}
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Your Bid Amount / 入札額 <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">¥</span>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      required
                      min={selectedShoe.currentBid + 5000}
                      step="1000"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-lg font-bold"
                      placeholder={(selectedShoe.currentBid + 5000).toLocaleString()}
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Minimum bid: ¥{(selectedShoe.currentBid + 5000).toLocaleString()} / 最低入札額
                  </p>
                </div>

                {/* Quick Bid Buttons */}
                <div>
                  <p className="text-sm text-gray-700 font-bold mb-2">Quick Bid / クイック入札</p>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      type="button"
                      onClick={() => handleQuickBid(5000)}
                      className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      +¥5,000
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickBid(10000)}
                      className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      +¥10,000
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickBid(20000)}
                      className="py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                    >
                      +¥20,000
                    </button>
                  </div>
                </div>

                {/* Auto Bid */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoBid}
                      onChange={(e) => setAutoBid(e.target.checked)}
                      className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className="text-gray-900 font-bold">Enable Auto Bid / 自動入札を有効にする</p>
                      <p className="text-gray-600 text-sm">Automatically increase your bid when outbid / 上回られた時に自動で入札額を上げる</p>
                    </div>
                  </label>

                  {autoBid && (
                    <div className="mt-4">
                      <label className="block text-gray-900 font-bold mb-2">
                        Maximum Auto Bid / 最大自動入札額
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">¥</span>
                        <input
                          type="number"
                          value={maxAutoBid}
                          onChange={(e) => setMaxAutoBid(e.target.value)}
                          min={bidAmount}
                          step="1000"
                          className="w-full pl-8 pr-4 py-3 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors text-lg font-bold"
                          placeholder="Enter maximum amount"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {bidStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-checkbox-circle-fill text-green-600 text-2xl"></i>
                    <p className="text-green-800 font-bold">
                      Bid placed successfully! / 入札が完了しました！
                    </p>
                  </div>
                )}

                {bidStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-error-warning-fill text-red-600 text-2xl"></i>
                    <p className="text-red-800 font-bold">
                      Bid failed. Please try again. / 入札に失敗しました。もう一度お試しください。
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isBidSubmitting}
                  className="w-full py-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  {isBidSubmitting ? (
                    <>
                      <i className="ri-loader-4-line mr-2 animate-spin"></i>
                      Placing Bid... / 入札中...
                    </>
                  ) : (
                    <>
                      <i className="ri-auction-fill mr-2"></i>
                      Confirm Bid / 入札を確定する
                    </>
                  )}
                </button>
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
              <Link to="/" className="flex items-center space-x-2 mb-4 cursor-pointer">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <i className="ri-vip-crown-fill text-black text-xl"></i>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">RARE KICKS</h4>
                  <p className="text-white/60 text-xs">レアキックス</p>
                </div>
              </Link>
              <p className="text-white/60 text-sm">
                The world's most exclusive sneaker auction platform.
              </p>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li><Link to="/auctions" className="text-white/60 hover:text-white transition-colors text-sm cursor-pointer">Auctions / オークション</Link></li>
                <li><Link to="/about" className="text-white/60 hover:text-white transition-colors text-sm cursor-pointer">About / 概要</Link></li>
                <li><Link to="/faq" className="text-white/60 hover:text-white transition-colors text-sm cursor-pointer">FAQ / よくある質問</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-4">Legal</h5>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-white/60 hover:text-white transition-colors text-sm cursor-pointer">Terms / 利用規約</Link></li>
                <li><Link to="/privacy" className="text-white/60 hover:text-white transition-colors text-sm cursor-pointer">Privacy / プライバシー</Link></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white font-bold mb-4">Follow Us</h5>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <i className="ri-instagram-fill text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <i className="ri-twitter-x-fill text-white"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white hover:text-black transition-colors cursor-pointer">
                  <i className="ri-facebook-fill text-white"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2024 RARE KICKS. All rights reserved. | 
              <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors ml-1 cursor-pointer">
                Powered by Readdy
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}