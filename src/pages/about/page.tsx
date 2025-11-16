
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function About() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
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
              <Link to="/auctions" className="text-gray-600 hover:text-black transition-colors whitespace-nowrap cursor-pointer">
                Auctions / オークション
              </Link>
              <Link to="/about" className="text-black hover:text-gray-600 transition-colors whitespace-nowrap cursor-pointer">
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
                  <button className="hidden md:block px-6 py-2 text-gray-600 hover:text-black transition-colors whitespace-nowrap cursor-pointer">
                    Sign In / ログイン
                  </button>
                  <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-all whitespace-nowrap cursor-pointer">
                    Register / 登録
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-red-600/20 border border-red-500/30 rounded-full">
              <p className="text-red-400 text-sm font-semibold tracking-wide">
                <i className="ri-information-fill mr-2"></i>
                ABOUT US / 私たちについて
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
              RARE KICKS
              <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                STORY
              </span>
            </h1>
            <p className="text-3xl md:text-4xl font-bold text-white/90 mb-4">
              世界最高峰のスニーカーオークション
            </p>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              The world's most exclusive sneaker auction platform, connecting collectors with the rarest finds.
              <span className="block mt-2">世界最高峰のスニーカーオークションプラットフォーム</span>
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-black text-gray-900 mb-8">
                OUR STORY
                <span className="block text-red-600 text-3xl mt-2">私たちのストーリー</span>
              </h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  RARE KICKSは、2020年に設立された世界最高峰のスニーカーオークションプラットフォームです。
                  私たちは、世界中のスニーカーコレクターと希少なスニーカーを繋ぐ架け橋として誕生しました。
                </p>
                <p>
                  Founded in 2020, RARE KICKS emerged from a passion for connecting sneaker enthusiasts 
                  with the world's most coveted and rare footwear. Our platform was born out of the 
                  recognition that true sneaker culture deserves a premium, authenticated marketplace.
                </p>
                <p>
                  私たちのミッションは、スニーカー文化の価値を高め、コレクターが安心して
                  取引できる環境を提供することです。全ての商品は専門家による厳格な真贋鑑定を経て、
                  100%の真正性を保証しています。
                </p>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://readdy.ai/api/search-image?query=Modern%20luxury%20sneaker%20store%20interior%20with%20premium%20display%20cases%20showcasing%20rare%20limited%20edition%20sneakers%20under%20professional%20lighting%20with%20sleek%20black%20and%20white%20design%20elements%20and%20authentication%20certificates%20on%20elegant%20pedestals%20creating%20sophisticated%20retail%20atmosphere&width=800&height=1000&seq=story1&orientation=portrait"
                alt="Our Story"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black text-gray-900 mb-4">
              OUR VALUES
            </h3>
            <p className="text-2xl font-bold text-gray-600">
              私たちの価値観
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-shield-check-fill',
                title: 'Authenticity',
                titleJa: '真正性',
                desc: 'Every item is thoroughly authenticated by certified experts with official documentation.',
                descJa: '全ての商品は認定専門家による徹底的な真贋鑑定と公式文書付き。'
              },
              {
                icon: 'ri-vip-crown-fill',
                title: 'Exclusivity',
                titleJa: '希少性',
                desc: 'We curate only the rarest and most sought-after sneakers in the world.',
                descJa: '世界で最も希少で人気の高いスニーカーのみを厳選。'
              },
              {
                icon: 'ri-customer-service-2-fill',
                title: 'Trust',
                titleJa: '信頼',
                desc: 'Building lasting relationships through transparency and exceptional service.',
                descJa: '透明性と卓越したサービスで長期的な信頼関係を構築。'
              }
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <i className={`${value.icon} text-white text-3xl`}></i>
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2 text-center">{value.title}</h4>
                <p className="text-xl text-gray-600 mb-4 text-center">{value.titleJa}</p>
                <p className="text-gray-700 leading-relaxed text-center">{value.desc}</p>
                <p className="text-gray-600 text-sm mt-2 text-center">{value.descJa}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black text-white mb-4">
              OUR TEAM
            </h3>
            <p className="text-2xl font-bold text-white/90">
              私たちのチーム
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Takeshi Yamamoto',
                nameJa: '山本 武志',
                role: 'Founder & CEO',
                roleJa: '創設者・CEO',
                image: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20business%20executive%20in%20elegant%20black%20suit%20with%20confident%20smile%20standing%20in%20modern%20luxury%20office%20environment%20with%20premium%20sneaker%20collection%20displayed%20in%20background%20showcasing%20leadership%20and%20expertise%20in%20fashion%20industry&width=400&height=500&seq=team1&orientation=portrait'
              },
              {
                name: 'Sarah Chen',
                nameJa: 'サラ・チェン',
                role: 'Head of Authentication',
                roleJa: '真贋鑑定責任者',
                image: 'https://readdy.ai/api/search-image?query=Professional%20Asian%20female%20authentication%20expert%20examining%20luxury%20sneakers%20with%20magnifying%20glass%20in%20pristine%20white%20laboratory%20setting%20wearing%20white%20coat%20with%20authentication%20equipment%20and%20certificates%20visible%20in%20sophisticated%20workspace&width=400&height=500&seq=team2&orientation=portrait'
              },
              {
                name: 'Marcus Johnson',
                nameJa: 'マーカス・ジョンソン',
                role: 'Head of Operations',
                roleJa: '運営責任者',
                image: 'https://readdy.ai/api/search-image?query=Professional%20African%20American%20operations%20manager%20in%20smart%20business%20attire%20coordinating%20logistics%20in%20modern%20warehouse%20facility%20with%20premium%20sneaker%20inventory%20and%20shipping%20operations%20visible%20in%20organized%20professional%20environment&width=400&height=500&seq=team3&orientation=portrait'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-all duration-300">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h4 className="text-2xl font-bold text-white mb-1">{member.name}</h4>
                <p className="text-white/80 text-lg mb-2">{member.nameJa}</p>
                <p className="text-red-400 font-bold mb-1">{member.role}</p>
                <p className="text-white/60">{member.roleJa}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black text-gray-900 mb-4">
              BY THE NUMBERS
            </h3>
            <p className="text-2xl font-bold text-gray-600">
              数字で見るRARE KICKS
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-6"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: '50,000+',
                label: 'Registered Users',
                labelJa: '登録ユーザー数'
              },
              {
                number: '10,000+',
                label: 'Authenticated Items',
                labelJa: '鑑定済み商品数'
              },
              {
                number: '99.9%',
                label: 'Authentication Accuracy',
                labelJa: '鑑定精度'
              },
              {
                number: '150+',
                label: 'Countries Served',
                labelJa: 'サービス提供国'
              }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl mx-auto flex items-center justify-center mb-4">
                  <span className="text-3xl font-black text-white">{stat.number}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{stat.label}</h4>
                <p className="text-gray-600">{stat.labelJa}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-orange-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-5xl font-black text-white mb-6">
            JOIN OUR COMMUNITY
          </h3>
          <p className="text-2xl font-bold text-white/90 mb-4">
            コミュニティに参加しよう
          </p>
          <p className="text-xl text-white/80 mb-10">
            Become part of the world's most exclusive sneaker collecting community.
            <span className="block mt-2">世界最高峰のスニーカーコレクターコミュニティの一員になろう。</span>
          </p>
          <Link to="/auctions" className="inline-block px-12 py-4 bg-black text-white text-lg font-bold rounded-xl hover:bg-gray-900 transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer">
            <i className="ri-auction-fill mr-2"></i>
            Start Collecting / コレクションを始める
          </Link>
        </div>
      </section>

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
