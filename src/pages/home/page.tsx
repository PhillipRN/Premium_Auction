import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 5,
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBidModal, setShowBidModal] = useState(false);
  const [selectedShoe, setSelectedShoe] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [autoBid, setAutoBid] = useState(false);
  const [maxAutoBid, setMaxAutoBid] = useState('');
  const [isBidSubmitting, setIsBidSubmitting] = useState(false);
  const [bidStatus, setBidStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add login state management
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    agreeTerms: false
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [loginStatus, setLoginStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginStatus('idle');

    // シミュレートされたログイン処理
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 簡単な検証（実際のプロジェクトでは適切な認証を使用）
      if (loginData.email && loginData.password) {
        setLoginStatus('success');
        setIsLoggedIn(true); // Set logged in state
        
        // Save login state to localStorage if remember me is checked
        if (loginData.rememberMe) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', loginData.email);
        }
        
        setTimeout(() => {
          setShowLoginModal(false);
          setLoginStatus('idle');
          setLoginData({ email: '', password: '', rememberMe: false });
        }, 2000);
      } else {
        setLoginStatus('error');
      }
    } catch (error) {
      setLoginStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check for saved login state on component mount
  useEffect(() => {
    const savedLoginState = localStorage.getItem('isLoggedIn');
    if (savedLoginState === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeTerms) {
      alert('利用規約に同意してください');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      formBody.append('fullName', formData.fullName);
      formBody.append('email', formData.email);
      formBody.append('phone', formData.phone);
      formBody.append('address', formData.address);
      formBody.append('city', formData.city);
      formBody.append('postalCode', formData.postalCode);
      formBody.append('country', formData.country);
      formBody.append('agreeTerms', formData.agreeTerms ? 'Yes' : 'No');

      const response = await fetch('https://readdy.ai/api/form/d4cqrfm820p5j87gagd0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          postalCode: '',
          country: '',
          agreeTerms: false
        });
        setTimeout(() => {
          setShowRegistrationModal(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBidClick = (shoe: any) => {
    // Check if user is logged in before showing bid modal
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    setSelectedShoe(shoe);
    setBidAmount((shoe.currentBid + 5000).toString());
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

    if (autoBid && maxAutoBid) {
      const maxBidValue = parseInt(maxAutoBid);
      if (maxBidValue < bidValue) {
        alert('最大自動入札額は現在の入札額以上である必要があります');
        return;
      }
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

  const shoes = [
    {
      id: 1,
      name: 'Nike Air Mag "Back to the Future"',
      nameJa: 'ナイキ エアマグ "バック・トゥ・ザ・フューチャー"',
      currentBid: 125000,
      image: 'https://readdy.ai/api/search-image?query=Ultra%20rare%20Nike%20Air%20Mag%20Back%20to%20the%20Future%20self-lacing%20sneakers%20with%20glowing%20LED%20panels%20and%20metallic%20silver%20finish%20displayed%20on%20premium%20white%20pedestal%20with%20dramatic%20studio%20lighting%20and%20clean%20minimalist%20background%20showcasing%20futuristic%20design%20and%20authentic%20certification%20hologram&width=800&height=600&seq=shoe1&orientation=landscape',
      certified: true,
      edition: '1/10'
    },
    {
      id: 2,
      name: 'Nike SB Dunk Low "Paris"',
      nameJa: 'ナイキ SB ダンク ロー "パリ"',
      currentBid: 98000,
      image: 'https://readdy.ai/api/search-image?query=Extremely%20rare%20Nike%20SB%20Dunk%20Low%20Paris%20edition%20sneakers%20with%20artistic%20painted%20canvas%20upper%20featuring%20Eiffel%20Tower%20motifs%20displayed%20on%20elegant%20white%20marble%20pedestal%20with%20soft%20professional%20lighting%20and%20pristine%20white%20background%20highlighting%20unique%20artwork%20and%20premium%20craftsmanship&width=800&height=600&seq=shoe2&orientation=landscape',
      certified: true,
      edition: '2/10'
    },
    {
      id: 3,
      name: 'Nike Air Yeezy 2 "Red October"',
      nameJa: 'ナイキ エアイージー2 "レッドオクトーバー"',
      currentBid: 87500,
      image: 'https://readdy.ai/api/search-image?query=Legendary%20Nike%20Air%20Yeezy%202%20Red%20October%20sneakers%20in%20vibrant%20all-red%20colorway%20with%20distinctive%20pyramid%20texture%20and%20gold%20aglets%20displayed%20on%20sleek%20black%20acrylic%20stand%20with%20dramatic%20spotlighting%20and%20clean%20gradient%20background%20emphasizing%20iconic%20silhouette%20and%20museum-quality%20presentation&width=800&height=600&seq=shoe3&orientation=landscape',
      certified: true,
      edition: '3/10'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                <i className="ri-vip-crown-fill text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-black font-bold text-xl tracking-tight">RARE KICKS</h1>
                <p className="text-gray-500 text-xs">レアキックス</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-black hover:text-gray-600 transition-colors whitespace-nowrap cursor-pointer">
                Home / ホーム
              </Link>
              <Link to="/auctions" className="text-gray-600 hover:text-black transition-colors whitespace-nowrap cursor-pointer">
                Auctions / オークション
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-black transition-colors whitespace-nowrap cursor-pointer">
                About / 概要
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link to="/mypage" className="hidden md:block px-6 py-2 text-gray-600 hover:text-black transition-colors whitespace-nowrap cursor-pointer">
                    My Page / マイページ
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded-lg transition-all whitespace-nowrap cursor-pointer"
                  >
                    Logout / ログアウト
                  </button>
                </div>
              ) : (
                <>
                  <button 
                    onClick={() => setShowLoginModal(true)}
                    className="hidden md:block px-6 py-2 text-gray-600 hover:text-black transition-colors whitespace-nowrap cursor-pointer"
                  >
                    Sign In / ログイン
                  </button>
                  <button 
                    onClick={() => setShowRegistrationModal(true)}
                    className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all whitespace-nowrap cursor-pointer"
                  >
                    Register / 登録
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-20 left-10 w-96 h-96 bg-black rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gray-900 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <div className="inline-block mb-6 px-6 py-2 bg-black/5 border border-black/10 rounded-full">
              <p className="text-black text-sm font-semibold tracking-wide">
                <i className="ri-shield-check-fill mr-2"></i>
                OFFICIALLY CERTIFIED / 公的機関認証済み
              </p>
            </div>
            <h2 className="text-6xl md:text-7xl font-black text-black mb-6 tracking-tight">
              WORLD'S RAREST
              <span className="block text-gray-600">
                NIKE COLLECTION
              </span>
            </h2>
            <p className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              世界最希少ナイキコレクション
            </p>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Only 10 pairs exist worldwide. 3 available here with official authentication.
              <span className="block mt-2">世界に10足のみ。公的機関による真贋鑑定付き3足を出品。</span>
            </p>
            
            {/* Countdown Timer */}
            <div className="flex justify-center items-center space-x-6 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 bg-black rounded-xl flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-white">{timeLeft.days}</span>
                </div>
                <p className="text-gray-600 text-sm">Days / 日</p>
              </div>
              <span className="text-gray-400 text-3xl">:</span>
              <div className="text-center">
                <div className="w-20 h-20 bg-black rounded-xl flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-white">{timeLeft.hours}</span>
                </div>
                <p className="text-gray-600 text-sm">Hours / 時</p>
              </div>
              <span className="text-gray-400 text-3xl">:</span>
              <div className="text-center">
                <div className="w-20 h-20 bg-black rounded-xl flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-white">{timeLeft.minutes}</span>
                </div>
                <p className="text-gray-600 text-sm">Min / 分</p>
              </div>
              <span className="text-gray-400 text-3xl">:</span>
              <div className="text-center">
                <div className="w-20 h-20 bg-black rounded-xl flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-white">{timeLeft.seconds}</span>
                </div>
                <p className="text-gray-600 text-sm">Sec / 秒</p>
              </div>
            </div>

            <Link to="/auctions" className="inline-block px-10 py-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer">
              <i className="ri-auction-fill mr-2"></i>
              View Auction / オークションを見る
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black text-black mb-4">
              FEATURED COLLECTION
            </h3>
            <p className="text-2xl font-bold text-gray-600">
              注目のコレクション
            </p>
            <div className="w-24 h-1 bg-black mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {shoes.map((shoe) => (
              <div key={shoe.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer border border-gray-100">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <img 
                    src={shoe.image} 
                    alt={shoe.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-4 py-2 bg-black/90 backdrop-blur-sm rounded-lg">
                    <p className="text-white text-sm font-bold">Edition {shoe.edition}</p>
                  </div>
                  {shoe.certified && (
                    <div className="absolute top-4 right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <i className="ri-verified-badge-fill text-white text-2xl"></i>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-gray-900 mb-2">{shoe.name}</h4>
                  <p className="text-gray-600 mb-4">{shoe.nameJa}</p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Current Bid / 現在価格</p>
                      <p className="text-2xl font-black text-gray-900">
                        ¥{shoe.currentBid.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <i className="ri-fire-fill text-black text-xl"></i>
                    </div>
                  </div>

                  <button 
                    onClick={() => handleBidClick(shoe)}
                    className="w-full py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all whitespace-nowrap cursor-pointer"
                  >
                    Place Bid / 入札する
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-4xl font-black text-black mb-6">
                OFFICIAL AUTHENTICATION
                <span className="block text-gray-600 mt-2">公的機関による真贋鑑定</span>
              </h3>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                Every pair in our collection has been thoroughly authenticated by certified experts. 
                Each shoe comes with official documentation and holographic certification, 
                guaranteeing 100% authenticity.
              </p>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                当コレクションの全ての商品は、認定された専門家による徹底的な真贋鑑定を受けています。
                各シューズには公式文書とホログラム認証が付属し、100%の真正性を保証します。
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <i className="ri-shield-check-fill text-white text-2xl"></i>
                  </div>
                  <h4 className="text-black font-bold mb-2">Certified</h4>
                  <p className="text-gray-600 text-sm">認証済み</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mb-4">
                    <i className="ri-file-text-fill text-white text-2xl"></i>
                  </div>
                  <h4 className="text-black font-bold mb-2">Documented</h4>
                  <p className="text-gray-600 text-sm">文書付き</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20authentication%20certificate%20document%20with%20official%20holographic%20seal%20and%20verification%20stamps%20for%20rare%20luxury%20sneakers%20displayed%20on%20premium%20black%20surface%20with%20dramatic%20lighting%20and%20gold%20accents%20showing%20detailed%20inspection%20report%20and%20expert%20signatures%20in%20elegant%20presentation&width=800&height=1000&seq=cert1&orientation=portrait"
                alt="Authentication Certificate"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black text-black mb-4">
              HOW IT WORKS
            </h3>
            <p className="text-2xl font-bold text-gray-600">
              オークションの流れ
            </p>
            <div className="w-24 h-1 bg-black mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: '01',
                icon: 'ri-user-add-fill',
                title: 'Register',
                titleJa: 'アカウント登録',
                desc: 'Create your account',
                descJa: 'アカウントを作成'
              },
              {
                step: '02',
                icon: 'ri-search-eye-fill',
                title: 'Browse',
                titleJa: '商品を閲覧',
                desc: 'Explore rare collection',
                descJa: '希少コレクションを探索'
              },
              {
                step: '03',
                icon: 'ri-auction-fill',
                title: 'Bid',
                titleJa: '入札',
                desc: 'Place your bid',
                descJa: '入札を行う'
              },
              {
                step: '04',
                icon: 'ri-trophy-fill',
                title: 'Win',
                titleJa: '落札',
                desc: 'Secure your prize',
                descJa: '商品を獲得'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-24 h-24 bg-black rounded-2xl mx-auto flex items-center justify-center transform hover:scale-110 transition-transform">
                    <i className={`${item.icon} text-white text-4xl`}></i>
                  </div>
                  <div className="absolute -top-2 -right-2 w-12 h-12 bg-white border-2 border-black rounded-full flex items-center justify-center mx-auto" style={{ left: '50%', transform: 'translateX(calc(50% + 12px))' }}>
                    <span className="text-black font-black text-lg">{item.step}</span>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-lg text-gray-600 mb-1">{item.titleJa}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
                <p className="text-sm text-gray-500">{item.descJa}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-5xl font-black text-white mb-6">
            DON'T MISS OUT
          </h3>
          <p className="text-2xl font-bold text-white/90 mb-4">
            このチャンスを逃すな
          </p>
          <p className="text-xl text-white/80 mb-10">
            Join the exclusive auction for the world's rarest Nike collection.
            <span className="block mt-2">世界最希少のナイキコレクションの限定オークションに参加しよう。</span>
          </p>
          {!isLoggedIn && (
            <button 
              onClick={() => setShowRegistrationModal(true)}
              className="px-12 py-4 bg-white text-black text-lg font-bold rounded-xl hover:bg-gray-100 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-user-add-fill mr-2"></i>
              Register Now / 今すぐ登録
            </button>
          )}
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-600 to-orange-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    LOGIN REQUIRED
                  </h3>
                  <p className="text-white/90">入札にはログインが必要です</p>
                </div>
                <button
                  onClick={() => setShowLoginModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleLogin} className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Email / メールアドレス <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Password / パスワード <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                    placeholder="••••••••"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleLoginChange}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                    />
                    <span className="text-sm text-gray-600">Remember me / ログイン状態を保持</span>
                  </label>
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-700 transition-colors cursor-pointer"
                  >
                    Forgot password? / パスワードを忘れた方
                  </button>
                </div>

                {loginStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-checkbox-circle-fill text-green-600 text-2xl"></i>
                    <p className="text-green-800 font-bold">
                      Login successful! / ログインが完了しました！
                    </p>
                  </div>
                )}

                {loginStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-error-warning-fill text-red-600 text-2xl"></i>
                    <p className="text-red-800 font-bold">
                      Invalid credentials. Please try again. / 認証情報が正しくありません。もう一度お試しください。
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-lg font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line mr-2 animate-spin"></i>
                      Signing in... / ログイン中...
                    </>
                  ) : (
                    <>
                      <i className="ri-login-box-fill mr-2"></i>
                      Sign In / ログイン
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Don't have an account? / アカウントをお持ちでない方は{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setShowLoginModal(false);
                        setShowRegistrationModal(true);
                      }}
                      className="text-red-600 hover:text-red-700 font-bold transition-colors cursor-pointer"
                    >
                      Register here / こちらから登録
                    </button>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bid Modal - Only show if logged in */}
      {showBidModal && selectedShoe && isLoggedIn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-orange-500 p-6 rounded-t-2xl">
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

                {/* Terms */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-start space-x-2">
                    <i className="ri-information-fill text-blue-600 text-xl mt-0.5"></i>
                    <div className="text-sm text-gray-600 leading-relaxed">
                      <p className="font-bold text-gray-900 mb-1">Bidding Terms / 入札規約</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>All bids are binding and cannot be cancelled / 全ての入札は拘束力があり、キャンセルできません</li>
                        <li>Payment must be completed within 48 hours of winning / 落札後48時間以内に支払いを完了してください</li>
                        <li>Shipping fees are additional / 配送料は別途かかります</li>
                      </ul>
                    </div>
                  </div>
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
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-lg font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
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

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gradient-to-r from-red-600 to-orange-500 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl font-black text-white mb-2">
                    AUCTION REGISTRATION
                  </h3>
                  <p className="text-white/90 text-lg">オークション参加登録</p>
                </div>
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8" data-readdy-form id="auction-registration-form">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Full Name / 氏名 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Email / メールアドレス <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                    placeholder="example@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Phone Number / 電話番号 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                    placeholder="090-1234-5678"
                  />
                </div>

                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    Address / 住所 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                    placeholder="1-2-3 Shibuya"
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
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                      placeholder="Tokyo"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-bold mb-2">
                      Postal Code / 郵便番号 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                      placeholder="150-0001"
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
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors text-sm"
                    placeholder="Japan"
                  />
                </div>

                <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-xl">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    className="mt-1 w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                  />
                  <label className="text-gray-700 text-sm leading-relaxed cursor-pointer">
                    I agree to the terms and conditions and privacy policy of the auction.
                    <span className="block mt-1">オークションの利用規約とプライバシーポリシーに同意します。</span>
                  </label>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-checkbox-circle-fill text-green-600 text-2xl"></i>
                    <p className="text-green-800 font-bold">
                      Registration successful! / 登録が完了しました！
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-error-warning-fill text-red-600 text-2xl"></i>
                    <p className="text-red-800 font-bold">
                      Registration failed. Please try again. / 登録に失敗しました。もう一度お試しください。
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-lg font-bold rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <i className="ri-loader-4-line mr-2 animate-spin"></i>
                      Submitting... / 送信中...
                    </>
                  ) : (
                    <>
                      <i className="ri-send-plane-fill mr-2"></i>
                      Complete Registration / 登録を完了する
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
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                  <i className="ri-vip-crown-fill text-black text-xl"></i>
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
