import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Terms() {
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
              <Link to="/terms" className="text-black hover:text-gray-600 transition-colors whitespace-nowrap cursor-pointer">
                Terms / 利用規約
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
                <i className="ri-file-text-fill mr-2"></i>
                TERMS OF SERVICE / 利用規約
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
              TERMS OF
              <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                SERVICE
              </span>
            </h1>
            <p className="text-3xl md:text-4xl font-bold text-white/90 mb-4">
              利用規約
            </p>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Please read these terms carefully before using our auction platform.
              <span className="block mt-2">オークションプラットフォームをご利用前に、必ずお読みください。</span>
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <i className="ri-information-fill text-white text-2xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-red-900 mb-2">重要なお知らせ / Important Notice</h3>
                <p className="text-red-800 leading-relaxed">
                  この利用規約は、RARE KICKSのサービスをご利用いただく際の重要な法的文書です。サービスをご利用になる前に、必ず全文をお読みいただき、内容にご同意いただく必要があります。
                </p>
                <p className="text-red-700 text-sm mt-2">
                  These Terms of Service constitute an important legal document for using RARE KICKS services. You must read and agree to all terms before using our services.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-12">
            {/* Section 1 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">1</span>
                サービスの概要 / Service Overview
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  RARE KICKS（以下「当社」）は、希少なスニーカーのオンラインオークションプラットフォームを運営しています。当社のサービスには、商品の出品、入札、購入、真贋鑑定、配送などが含まれます。
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  RARE KICKS ("Company") operates an online auction platform for rare sneakers. Our services include item listing, bidding, purchasing, authentication, and shipping.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">2</span>
                アカウント登録 / Account Registration
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2.1 登録要件 / Registration Requirements</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-800 ml-4">
                    <li>18歳以上であること / Must be 18 years or older</li>
                    <li>正確な個人情報を提供すること / Provide accurate personal information</li>
                    <li>有効な本人確認書類を提出すること / Submit valid identity verification documents</li>
                    <li>利用規約に同意すること / Agree to these Terms of Service</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">2.2 アカウントの責任 / Account Responsibility</h3>
                  <p className="text-gray-800 leading-relaxed">
                    お客様は、アカウントのセキュリティを維持し、アカウントで行われる全ての活動に責任を負います。不正使用を発見した場合は、直ちに当社にご連絡ください。
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    You are responsible for maintaining account security and all activities under your account. Contact us immediately if you discover unauthorized use.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">3</span>
                オークション規則 / Auction Rules
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">3.1 入札規則 / Bidding Rules</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-800 ml-4">
                    <li>全ての入札は拘束力があり、キャンセルできません / All bids are binding and cannot be cancelled</li>
                    <li>最低入札額は現在価格より5,000円以上高い金額です / Minimum bid increment is ¥5,000 above current price</li>
                    <li>オークション終了時刻は日本標準時（JST）に基づきます / Auction end times are based on Japan Standard Time (JST)</li>
                    <li>自動入札機能を利用する場合は、最大入札額を設定してください / When using auto-bid, set your maximum bid amount</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">3.2 落札後の義務 / Post-Auction Obligations</h3>
                  <p className="text-gray-800 leading-relaxed">
                    落札者は、オークション終了後48時間以内に支払いを完了する義務があります。期限内に支払いが確認できない場合、落札が取り消される場合があります。
                  </p>
                  <p className="text-gray-700 text-sm mt-2">
                    Winning bidders must complete payment within 48 hours after auction end. Failure to pay may result in bid cancellation.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 4 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">4</span>
                真贋鑑定 / Authentication
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  当社では、認定された専門家による厳格な真贋鑑定を実施しています。鑑定に合格した商品のみがオークションに出品され、公式の鑑定証明書が発行されます。
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We conduct strict authentication by certified experts. Only items that pass authentication are listed for auction and receive official certificates.
                </p>
                <div className="bg-white border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-2 flex items-center">
                    <i className="ri-shield-check-fill text-green-600 text-xl mr-2"></i>
                    真正性保証 / Authenticity Guarantee
                  </h3>
                  <p className="text-green-800 text-sm">
                    当社の鑑定で真正品と認定された商品が万が一偽物だった場合、購入代金の全額返金に加え、完全補償を行います。
                  </p>
                  <p className="text-green-700 text-xs mt-1">
                    If an item authenticated by us proves to be fake, we provide full refund plus complete compensation.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 5 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">5</span>
                支払いと配送 / Payment & Shipping
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">5.1 支払い方法 / Payment Methods</h3>
                  <p className="text-gray-800 mb-2">以下の支払い方法をご利用いただけます：</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 ml-4">
                    <li>クレジットカード（Visa、MasterCard、JCB、American Express）</li>
                    <li>銀行振込 / Bank Transfer</li>
                    <li>PayPal、Apple Pay、Google Pay</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">5.2 配送料 / Shipping Fees</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 ml-4">
                    <li>国内配送：一律1,500円 / Domestic: ¥1,500 flat rate</li>
                    <li>海外配送：3,000円〜8,000円（地域により異なる）/ International: ¥3,000-8,000 (varies by region)</li>
                    <li>50万円以上の商品：配送料無料 / Items over ¥500,000: Free shipping</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 6 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">6</span>
                返品・交換 / Returns & Exchanges
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  商品到着後7日以内であれば、未使用・未開封の状態で返品を承ります。ただし、お客様都合による返品の場合は往復送料をご負担いただきます。
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Returns accepted within 7 days of delivery for unused, unopened items. Customer-initiated returns require payment of round-trip shipping costs.
                </p>
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
                  <p className="text-yellow-800 text-sm font-bold">
                    <i className="ri-alert-fill mr-2"></i>
                    注意：サイズ違いによる交換は承っておりません。
                  </p>
                  <p className="text-yellow-700 text-xs">
                    Note: Size exchanges are not available due to the unique nature of auction items.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 7 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">7</span>
                禁止事項 / Prohibited Activities
              </h2>
              <div className="bg-gray-50 rounded-xl p-8">
                <p className="text-gray-800 mb-4">以下の行為は禁止されています：</p>
                <ul className="list-disc list-inside space-y-2 text-gray-800 ml-4">
                  <li>虚偽の情報を提供すること / Providing false information</li>
                  <li>他のユーザーになりすますこと / Impersonating other users</li>
                  <li>システムの不正利用や妨害行為 / Unauthorized system use or interference</li>
                  <li>偽造品の出品や販売 / Listing or selling counterfeit items</li>
                  <li>価格操作や談合行為 / Price manipulation or collusion</li>
                  <li>当社の知的財産権の侵害 / Infringing our intellectual property rights</li>
                </ul>
              </div>
            </div>

            {/* Section 8 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">8</span>
                責任の制限 / Limitation of Liability
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  当社は、サービスの利用に関連して生じた直接的、間接的、偶発的、特別な損害について、法律で許可される最大限の範囲で責任を制限します。
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We limit liability for direct, indirect, incidental, and special damages arising from service use to the maximum extent permitted by law.
                </p>
              </div>
            </div>

            {/* Section 9 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">9</span>
                規約の変更 / Terms Modification
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  当社は、必要に応じて本規約を変更する権利を留保します。重要な変更については、事前にメールまたはウェブサイト上で通知いたします。
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  We reserve the right to modify these terms as necessary. Important changes will be notified via email or website announcement in advance.
                </p>
              </div>
            </div>

            {/* Section 10 */}
            <div>
              <h2 className="text-3xl font-black text-gray-900 mb-6 flex items-center">
                <span className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">10</span>
                準拠法・管轄裁判所 / Governing Law & Jurisdiction
              </h2>
              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  本規約は日本法に準拠し、本規約に関する一切の紛争については、東京地方裁判所を第一審の専属的合意管轄裁判所とします。
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  These terms are governed by Japanese law, and Tokyo District Court has exclusive jurisdiction for any disputes arising from these terms.
                </p>
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
                ご質問がございましたら、support@rarekicks.com までお問い合わせください。
              </p>
              <p className="text-gray-500 text-xs">
                For questions, please contact support@rarekicks.com
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
