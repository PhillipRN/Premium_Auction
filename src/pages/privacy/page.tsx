
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Privacy() {
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
              <Link to="/about" className="text-gray-600 hover:text-black transition-colors whitespace-nowrap cursor-pointer">
                About / 概要
              </Link>
              <Link to="/privacy" className="text-black hover:text-gray-600 transition-colors whitespace-nowrap cursor-pointer">
                Privacy / プライバシー
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
      <section className="relative pt-24 pb-20 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-600 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-red-600/20 border border-red-500/30 rounded-full">
              <p className="text-red-400 text-sm font-semibold tracking-wide">
                <i className="ri-shield-user-fill mr-2"></i>
                PRIVACY POLICY / プライバシーポリシー
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
              PRIVACY
              <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                POLICY
              </span>
            </h1>
            <p className="text-3xl md:text-4xl font-bold text-white/90 mb-4">
              プライバシーポリシー
            </p>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
              <span className="block mt-2">お客様のプライバシーを大切にしています。情報の収集・利用・保護について説明します。</span>
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-shield-check-fill text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">プライバシー保護への取り組み / Our Commitment to Privacy</h3>
                <p className="text-blue-800 leading-relaxed">
                  RARE KICKSは、お客様の個人情報の保護を最優先事項として取り組んでいます。このプライバシーポリシーでは、当社がどのような情報を収集し、どのように使用・保護するかを詳しく説明します。
                </p>
                <p className="text-blue-700 text-sm mt-2">
                  RARE KICKS prioritizes the protection of your personal information. This Privacy Policy explains what information we collect and how we use and protect it.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {/* Section 1 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">1</span>
                収集する情報 / Information We Collect
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1.1 個人識別情報 / Personal Identification Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-800 ml-4">
                    <li>氏名、メールアドレス、電話番号 / Name, email address, phone number</li>
                    <li>住所、郵便番号 / Address, postal code</li>
                    <li>生年月日、年齢 / Date of birth, age</li>
                    <li>本人確認書類の情報 / Identity verification document information</li>
                    <li>支払い情報（クレジットカード番号は暗号化して保存）/ Payment information (credit card numbers encrypted)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">1.2 利用情報 / Usage Information</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-800 ml-4">
                    <li>ウェブサイトの閲覧履歴 / Website browsing history</li>
                    <li>入札履歴、購入履歴 / Bidding history, purchase history</li>
                    <li>検索履歴、お気に入り商品 / Search history, favorite items</li>
                    <li>IPアドレス、デバイス情報 / IP address, device information</li>
                    <li>Cookieとトラッキング技術による情報 / Information from cookies and tracking technologies</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">2</span>
                情報の利用目的 / How We Use Your Information
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed mb-4">
                  収集した情報は、以下の目的で利用いたします：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-user-settings-fill text-red-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">アカウント管理</h3>
                    <p className="text-gray-700 text-sm">Account Management</p>
                    <p className="text-gray-600 text-sm mt-2">ユーザーアカウントの作成、維持、管理</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-auction-fill text-orange-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">オークションサービス</h3>
                    <p className="text-gray-700 text-sm">Auction Services</p>
                    <p className="text-gray-600 text-sm mt-2">入札、落札、決済処理の実行</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-customer-service-2-fill text-green-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">カスタマーサポート</h3>
                    <p className="text-gray-700 text-sm">Customer Support</p>
                    <p className="text-gray-600 text-sm mt-2">お問い合わせ対応、技術サポート</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border-2 border-gray-200">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-mail-send-fill text-purple-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">マーケティング</h3>
                    <p className="text-gray-700 text-sm">Marketing</p>
                    <p className="text-gray-600 text-sm mt-2">新商品情報、プロモーションの配信</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">3</span>
                情報の共有 / Information Sharing
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  当社は、以下の場合を除き、お客様の個人情報を第三者と共有することはありません：
                </p>
                <div className="space-y-4">
                  <div className="bg-white border-l-4 border-red-500 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      <i className="ri-truck-fill text-red-600 mr-2"></i>
                      サービス提供者 / Service Providers
                    </h3>
                    <p className="text-gray-700 text-sm">
                      配送業者、決済処理業者、真贋鑑定業者など、サービス提供に必要な第三者パートナー
                    </p>
                  </div>
                  <div className="bg-white border-l-4 border-orange-500 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      <i className="ri-scales-3-fill text-orange-600 mr-2"></i>
                      法的要求 / Legal Requirements
                    </h3>
                    <p className="text-gray-700 text-sm">
                      法律、規制、法的手続き、または政府機関からの有効な要求に応じる場合
                    </p>
                  </div>
                  <div className="bg-white border-l-4 border-green-500 rounded-lg p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      <i className="ri-user-heart-fill text-green-600 mr-2"></i>
                      お客様の同意 / Your Consent
                    </h3>
                    <p className="text-gray-700 text-sm">
                      お客様が明示的に同意された場合
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">4</span>
                データセキュリティ / Data Security
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-6">
                <p className="text-gray-800 leading-relaxed">
                  お客様の個人情報を保護するため、以下のセキュリティ対策を実施しています：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 border-2 border-blue-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-lock-fill text-blue-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">暗号化技術</h3>
                    <p className="text-gray-700 text-sm">Encryption Technology</p>
                    <p className="text-gray-600 text-sm mt-2">SSL/TLS暗号化による通信保護</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border-2 border-green-200">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-shield-check-fill text-green-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">アクセス制御</h3>
                    <p className="text-gray-700 text-sm">Access Control</p>
                    <p className="text-gray-600 text-sm mt-2">権限に基づく厳格なアクセス管理</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border-2 border-purple-200">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-eye-fill text-purple-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">監視システム</h3>
                    <p className="text-gray-700 text-sm">Monitoring System</p>
                    <p className="text-gray-600 text-sm mt-2">24時間365日のセキュリティ監視</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 border-2 border-red-200">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                      <i className="ri-database-2-fill text-red-600 text-2xl"></i>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">データバックアップ</h3>
                    <p className="text-gray-700 text-sm">Data Backup</p>
                    <p className="text-gray-600 text-sm mt-2">定期的なデータバックアップと復旧体制</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">5</span>
                Cookieの使用 / Cookie Usage
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  当社では、サービスの向上とユーザー体験の最適化のためにCookieを使用しています：
                </p>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">必須Cookie / Essential Cookies</h3>
                    <p className="text-gray-700 text-sm">
                      ウェブサイトの基本機能を提供するために必要なCookie（ログイン状態の維持など）
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">分析Cookie / Analytics Cookies</h3>
                    <p className="text-gray-700 text-sm">
                      ウェブサイトの使用状況を分析し、サービス改善に活用するためのCookie
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">マーケティングCookie / Marketing Cookies</h3>
                    <p className="text-gray-700 text-sm">
                      パーソナライズされた広告配信のためのCookie（お客様の同意に基づく）
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                  <p className="text-yellow-800 text-sm">
                    <i className="ri-settings-3-fill mr-2"></i>
                    ブラウザの設定でCookieを無効にすることができますが、一部の機能が正常に動作しない場合があります。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">6</span>
                お客様の権利 / Your Rights
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed mb-4">
                  お客様には、個人情報に関して以下の権利があります：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                      <i className="ri-eye-fill text-blue-600 mr-2"></i>
                      アクセス権 / Access Right
                    </h3>
                    <p className="text-gray-600 text-sm">保存されている個人情報の開示を求める権利</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                      <i className="ri-edit-fill text-green-600 mr-2"></i>
                      訂正権 / Correction Right
                    </h3>
                    <p className="text-gray-600 text-sm">不正確な個人情報の訂正を求める権利</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                      <i className="ri-delete-bin-fill text-red-600 mr-2"></i>
                      削除権 / Deletion Right
                    </h3>
                    <p className="text-gray-600 text-sm">個人情報の削除を求める権利</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                      <i className="ri-download-fill text-purple-600 mr-2"></i>
                      データポータビリティ権 / Data Portability Right
                    </h3>
                    <p className="text-gray-600 text-sm">個人情報の移行を求める権利</p>
                  </div>
                </div>
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mt-6">
                  <p className="text-blue-800 text-sm">
                    <i className="ri-mail-fill mr-2"></i>
                    これらの権利を行使される場合は、privacy@rarekicks.com までご連絡ください。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">7</span>
                データ保存期間 / Data Retention
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  個人情報は、収集目的を達成するために必要な期間のみ保存します：
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 bg-white rounded-lg p-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-user-fill text-blue-600"></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">アカウント情報 / Account Information</p>
                      <p className="text-gray-600 text-sm">アカウント削除まで / Until account deletion</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white rounded-lg p-4">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="ri-shopping-cart-fill text-green-600"></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">取引履歴 / Transaction History</p>
                      <p className="text-gray-600 text-sm">法的要求に基づき7年間 / 7 years as legally required</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 bg-white rounded-lg p-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="ri-line-chart-fill text-purple-600"></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">分析データ / Analytics Data</p>
                      <p className="text-gray-600 text-sm">収集から2年間 / 2 years from collection</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">8</span>
                国際的なデータ転送 / International Data Transfers
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  当社は、サービス提供のために一部の個人情報を日本国外に転送する場合があります。
                  この場合、適切なセキュリティ対策と法的保護措置を講じます。
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We may transfer some personal information outside Japan for service provision. 
                  In such cases, we implement appropriate security measures and legal protections.
                </p>
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <p className="text-green-800 text-sm">
                    <i className="ri-shield-check-fill mr-2"></i>
                    全ての国際データ転送は、日本の個人情報保護法および関連する国際的なデータ保護規制に準拠して行われます。
                  </p>
                </div>
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">9</span>
                ポリシーの変更 / Policy Changes
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  当社は、法的要求やサービスの変更に応じて、このプライバシーポリシーを更新する場合があります。
                  重要な変更については、事前にメールまたはウェブサイト上で通知いたします。
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We may update this Privacy Policy in response to legal requirements or service changes. 
                  Important changes will be notified via email or website announcement in advance.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">10</span>
                お問い合わせ / Contact Us
              </h2>
              <div className="bg-gray-50 rounded-xl p-8">
                <p className="text-gray-800 leading-relaxed mb-6">
                  プライバシーに関するご質問やご不明点がございましたら、以下の方法でお問い合わせください：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <i className="ri-mail-fill text-red-600 text-2xl"></i>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                    <p className="text-red-600 font-bold text-sm">privacy@rarekicks.com</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <i className="ri-phone-fill text-orange-600 text-2xl"></i>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
                    <p className="text-orange-600 font-bold text-sm">0120-123-456</p>
                  </div>
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <i className="ri-map-pin-fill text-green-600 text-2xl"></i>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                    <p className="text-green-600 font-bold text-sm">東京都渋谷区1-2-3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Last Updated */}
          <div className="mt-16 text-center">
            <div className="bg-gray-100 rounded-xl p-6">
              <p className="text-gray-600 font-bold">
                最終更新日：2024年1月1日 / Last Updated: January 1, 2024
              </p>
              <p className="text-gray-500 text-sm mt-2">
                このプライバシーポリシーは、RARE KICKSのサービス利用に適用されます。
              </p>
              <p className="text-gray-500 text-xs">
                This Privacy Policy applies to the use of RARE KICKS services.
              </p>
            </div>
          </div>
        </div>
      </section>

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
