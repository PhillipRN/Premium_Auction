import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function FAQ() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      category: 'オークションについて',
      categoryEn: 'About Auctions',
      questions: [
        {
          question: 'オークションに参加するにはどうすればよいですか？',
          questionEn: 'How can I participate in auctions?',
          answer: 'まず無料のアカウント登録を行い、本人確認を完了してください。その後、お好きなオークションで入札を開始できます。入札には最低入札額が設定されており、現在価格より5,000円以上高い金額で入札する必要があります。',
          answerEn: 'First, create a free account and complete identity verification. Then you can start bidding on any auction you like. Each auction has a minimum bid increment, typically ¥5,000 above the current price.'
        },
        {
          question: '入札後にキャンセルはできますか？',
          questionEn: 'Can I cancel my bid after placing it?',
          answer: '申し訳ございませんが、一度入札された金額はキャンセルできません。これはオークションの公平性を保つためです。入札前に商品詳細と金額を十分にご確認ください。',
          answerEn: 'Unfortunately, bids cannot be cancelled once placed to maintain auction fairness. Please carefully review the item details and amount before bidding.'
        },
        {
          question: '自動入札機能とは何ですか？',
          questionEn: 'What is the auto-bid feature?',
          answer: '自動入札機能を有効にすると、他の入札者に上回られた際に、設定した最大金額まで自動的に入札額を上げることができます。これにより、オークション終了まで常に監視する必要がなくなります。',
          answerEn: 'The auto-bid feature automatically increases your bid up to your maximum amount when outbid by others. This eliminates the need to constantly monitor the auction until it ends.'
        }
      ]
    },
    {
      category: '商品の真贋鑑定について',
      categoryEn: 'About Authentication',
      questions: [
        {
          question: '商品の真贋鑑定はどのように行われますか？',
          questionEn: 'How is product authentication conducted?',
          answer: '当社では認定された専門家チームが、最新の鑑定技術と豊富な経験を活用して真贋鑑定を行います。素材、縫製、ロゴ、シリアルナンバーなど、数十項目にわたる詳細な検査を実施し、100%の真正性を保証します。',
          answerEn: 'Our certified expert team conducts authentication using the latest techniques and extensive experience. We perform detailed inspections across dozens of criteria including materials, stitching, logos, and serial numbers, guaranteeing 100% authenticity.'
        },
        {
          question: '鑑定証明書は発行されますか？',
          questionEn: 'Will I receive an authentication certificate?',
          answer: 'はい、全ての商品には公式の鑑定証明書とホログラム認証シールが付属します。これらの文書は商品の真正性を証明する重要な資料となり、将来の転売時にも価値を保証します。',
          answerEn: 'Yes, all items come with an official authentication certificate and holographic seal. These documents serve as important proof of authenticity and help maintain value for future resale.'
        },
        {
          question: '万が一偽物だった場合の保証はありますか？',
          questionEn: 'What guarantee do you offer if an item turns out to be fake?',
          answer: '当社の鑑定で真正品と認定された商品が万が一偽物だった場合、購入代金の全額返金に加え、鑑定料も含めた完全補償を行います。これは当社の鑑定技術への絶対的な自信の表れです。',
          answerEn: 'If an item authenticated by us turns out to be fake, we provide full refund of the purchase price plus complete compensation including authentication fees. This reflects our absolute confidence in our authentication expertise.'
        }
      ]
    },
    {
      category: '支払いと配送について',
      categoryEn: 'About Payment & Shipping',
      questions: [
        {
          question: '支払い方法は何がありますか？',
          questionEn: 'What payment methods are available?',
          answer: 'クレジットカード（Visa、MasterCard、JCB、American Express）、銀行振込、PayPal、Apple Pay、Google Payをご利用いただけます。全ての決済は最高レベルのセキュリティで保護されています。',
          answerEn: 'We accept credit cards (Visa, MasterCard, JCB, American Express), bank transfers, PayPal, Apple Pay, and Google Pay. All transactions are protected with the highest level of security.'
        },
        {
          question: '落札後の支払い期限はいつまでですか？',
          questionEn: 'What is the payment deadline after winning an auction?',
          answer: 'オークション終了後48時間以内にお支払いを完了していただく必要があります。期限内にお支払いが確認できない場合、落札が取り消される場合がございますのでご注意ください。',
          answerEn: 'Payment must be completed within 48 hours after the auction ends. Please note that failure to pay within this timeframe may result in cancellation of your winning bid.'
        },
        {
          question: '配送料はいくらですか？',
          questionEn: 'How much is shipping?',
          answer: '国内配送は一律1,500円、海外配送は地域により3,000円〜8,000円となります。高額商品（50万円以上）は配送料無料となります。全ての商品は保険付きで配送され、追跡番号をお知らせします。',
          answerEn: 'Domestic shipping is ¥1,500 flat rate, international shipping ranges from ¥3,000-8,000 depending on region. Items over ¥500,000 qualify for free shipping. All items are shipped with insurance and tracking numbers provided.'
        }
      ]
    },
    {
      category: 'アカウントとセキュリティ',
      categoryEn: 'Account & Security',
      questions: [
        {
          question: 'アカウント登録に必要な情報は何ですか？',
          questionEn: 'What information is required for account registration?',
          answer: '基本情報（氏名、メールアドレス、電話番号、住所）と本人確認書類（運転免許証、パスポート、マイナンバーカードのいずれか）が必要です。これらの情報は厳重に管理され、第三者に開示されることはありません。',
          answerEn: 'Basic information (name, email, phone, address) and identity verification documents (driver\'s license, passport, or My Number card) are required. This information is strictly managed and never disclosed to third parties.'
        },
        {
          question: 'パスワードを忘れた場合はどうすればよいですか？',
          questionEn: 'What should I do if I forget my password?',
          answer: 'ログインページの「パスワードを忘れた方」リンクをクリックし、登録されたメールアドレスを入力してください。パスワードリセット用のリンクをお送りします。セキュリティのため、リンクは24時間で無効になります。',
          answerEn: 'Click the "Forgot Password" link on the login page and enter your registered email address. We\'ll send you a password reset link. For security, the link expires after 24 hours.'
        },
        {
          question: '二段階認証は利用できますか？',
          questionEn: 'Is two-factor authentication available?',
          answer: 'はい、アカウントのセキュリティを強化するため、SMS認証またはGoogle Authenticatorを使用した二段階認証をご利用いただけます。マイページの「セキュリティ設定」から有効にできます。',
          answerEn: 'Yes, we offer two-factor authentication via SMS or Google Authenticator to enhance account security. You can enable it from "Security Settings" in your account page.'
        }
      ]
    },
    {
      category: '返品・交換について',
      categoryEn: 'Returns & Exchanges',
      questions: [
        {
          question: '商品の返品は可能ですか？',
          questionEn: 'Can I return items?',
          answer: '商品到着後7日以内であれば、未使用・未開封の状態で返品を承ります。ただし、お客様都合による返品の場合は、往復送料をご負担いただきます。商品に問題がある場合は、当社負担で返品・交換いたします。',
          answerEn: 'Returns are accepted within 7 days of delivery for unused, unopened items. For returns due to customer preference, round-trip shipping costs apply. If there\'s a product issue, we handle returns/exchanges at our expense.'
        },
        {
          question: 'サイズが合わない場合の交換はできますか？',
          questionEn: 'Can I exchange items if the size doesn\'t fit?',
          answer: '申し訳ございませんが、サイズ違いによる交換は承っておりません。オークション商品の特性上、同じ商品の他のサイズをご用意することができないためです。入札前にサイズ表を十分にご確認ください。',
          answerEn: 'Unfortunately, size exchanges are not available due to the unique nature of auction items - we cannot guarantee availability of the same item in different sizes. Please carefully check size charts before bidding.'
        }
      ]
    }
  ];

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
              <Link to="/faq" className="text-black hover:text-gray-600 transition-colors whitespace-nowrap cursor-pointer">
                FAQ / よくある質問
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
                <i className="ri-question-answer-fill mr-2"></i>
                FAQ / よくある質問
              </p>
            </div>
            <h1 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
              FREQUENTLY
              <span className="block bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                ASKED QUESTIONS
              </span>
            </h1>
            <p className="text-3xl md:text-4xl font-bold text-white/90 mb-4">
              よくある質問
            </p>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Find answers to common questions about our auction platform and services.
              <span className="block mt-2">オークションプラットフォームとサービスに関するよくある質問</span>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-gray-900 mb-2">
                  {category.categoryEn}
                </h2>
                <p className="text-2xl font-bold text-red-600">
                  {category.category}
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-4"></div>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = categoryIndex * 100 + faqIndex;
                  const isOpen = openFAQ === globalIndex;
                  
                  return (
                    <div key={faqIndex} className="bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-red-200 transition-all duration-300">
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-900 mb-2">
                            {faq.questionEn}
                          </h3>
                          <p className="text-lg text-gray-700">
                            {faq.question}
                          </p>
                        </div>
                        <div className="ml-6">
                          <div className={`w-8 h-8 bg-gradient-to-br from-red-600 to-orange-500 rounded-lg flex items-center justify-center transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                            <i className="ri-arrow-down-s-line text-white text-xl"></i>
                          </div>
                        </div>
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-8 pb-6 border-t border-gray-100">
                          <div className="pt-6 space-y-4">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {faq.answerEn}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <i className="ri-customer-service-2-fill text-white text-4xl"></i>
            </div>
            <h3 className="text-4xl font-black text-gray-900 mb-4">
              STILL HAVE QUESTIONS?
            </h3>
            <p className="text-2xl font-bold text-gray-600 mb-6">
              まだ質問がありますか？
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Our customer support team is available 24/7 to help you with any questions or concerns.
              <span className="block mt-2">カスタマーサポートチームが24時間365日、ご質問やご不明点にお答えします。</span>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-mail-fill text-red-600 text-2xl"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Email Support</h4>
                <p className="text-gray-600 text-sm mb-2">メールサポート</p>
                <p className="text-red-600 font-bold">support@rarekicks.com</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-phone-fill text-red-600 text-2xl"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Phone Support</h4>
                <p className="text-gray-600 text-sm mb-2">電話サポート</p>
                <p className="text-red-600 font-bold">0120-123-456</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <i className="ri-chat-3-fill text-red-600 text-2xl"></i>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Live Chat</h4>
                <p className="text-gray-600 text-sm mb-2">ライブチャット</p>
                <p className="text-red-600 font-bold">Available 24/7</p>
              </div>
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
