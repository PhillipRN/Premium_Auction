import { useState } from 'react';

export default function AdminDashboard() {
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showCreateAuctionModal, setShowCreateAuctionModal] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    description: '',
    price: '',
    size: '',
    category: 'sneakers',
    status: 'published',
    images: [] as File[]
  });
  const [auctionFormData, setAuctionFormData] = useState({
    productId: '',
    startingPrice: '',
    minimumBid: '',
    buyNowPrice: '',
    startDate: '',
    endDate: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProductForm(prev => ({
        ...prev,
        images: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 商品保存処理（実際の実装では API 呼び出し）
    console.log('新商品を保存:', productForm);
    alert('商品が正常に追加されました！');
    setShowAddProductModal(false);
    setProductForm({
      name: '',
      brand: '',
      description: '',
      price: '',
      size: '',
      category: 'sneakers',
      status: 'published',
      images: []
    });
  };

  const handleAuctionFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAuctionFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuctionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // オークション作成のシミュレーション
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      
      setTimeout(() => {
        setShowCreateAuctionModal(false);
        setSubmitStatus('idle');
        setAuctionFormData({
          productId: '',
          startingPrice: '',
          minimumBid: '',
          buyNowPrice: '',
          startDate: '',
          endDate: '',
          description: ''
        });
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 商品リスト（オークション作成用）
  const availableProducts = [
    { id: '1', name: 'Nike Air Mag "Back to the Future"', brand: 'Nike' },
    { id: '2', name: 'Nike SB Dunk Low "Paris"', brand: 'Nike' },
    { id: '3', name: 'Nike Air Yeezy 2 "Red October"', brand: 'Nike' },
    { id: '4', name: 'Off-White x Nike Air Jordan 1 "Chicago"', brand: 'Nike x Off-White' },
    { id: '5', name: 'Nike Dunk SB Low "Freddy Krueger"', brand: 'Nike SB' },
    { id: '6', name: 'Travis Scott x Nike Air Jordan 1 "Mocha"', brand: 'Nike x Travis Scott' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black">管理者ダッシュボード</h1>
              <p className="text-gray-600 mt-1">システム全体の概要と管理</p>
            </div>
            <a 
              href="/" 
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              サイトへ戻る
            </a>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            <a href="/admin" className="border-b-2 border-black text-black py-4 px-1 text-sm font-medium">
              ダッシュボード
            </a>
            <a href="/admin/products" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
              商品管理
            </a>
            <a href="/admin/auctions" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
              オークション管理
            </a>
            <a href="/admin/users" className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium">
              ユーザー管理
            </a>
          </div>
        </div>
      </nav>

      <main className="px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-black rounded-md">
                <i className="ri-shopping-bag-line text-white text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総商品数</p>
                <p className="text-2xl font-semibold text-gray-900">1,247</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-black rounded-md">
                <i className="ri-auction-line text-white text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">進行中オークション</p>
                <p className="text-2xl font-semibold text-gray-900">89</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-black rounded-md">
                <i className="ri-user-line text-white text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">総ユーザー数</p>
                <p className="text-2xl font-semibold text-gray-900">15,432</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-black rounded-md">
                <i className="ri-money-dollar-circle-line text-white text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">今月の売上</p>
                <p className="text-2xl font-semibold text-gray-900">¥2,847,320</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">クイックアクション</h2>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => setShowAddProductModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-add-line mr-2"></i>
              新商品追加
            </button>
            <button 
              onClick={() => setShowCreateAuctionModal(true)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap cursor-pointer"
            >
              <i className="ri-auction-line mr-2"></i>
              オークション作成
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap cursor-pointer">
              <i className="ri-mail-line mr-2"></i>
              一括メール送信
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap cursor-pointer">
              <i className="ri-file-download-line mr-2"></i>
              レポート出力
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">最近のアクティビティ</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-check-line text-green-600 text-sm"></i>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">田中太郎</span> が 
                  <span className="font-medium">Air Jordan 1 Retro High OG</span> を ¥45,000 で落札しました
                </p>
                <p className="text-sm text-gray-500">2分前</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <i className="ri-add-line text-blue-600 text-sm"></i>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  新商品 <span className="font-medium">Nike Dunk Low Panda</span> が追加されました
                </p>
                <p className="text-sm text-gray-500">15分前</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <i className="ri-auction-line text-yellow-600 text-sm"></i>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Yeezy Boost 350 V2</span> のオークションが開始されました
                </p>
                <p className="text-sm text-gray-500">1時間前</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <i className="ri-user-add-line text-purple-600 text-sm"></i>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  新規ユーザー <span className="font-medium">佐藤花子</span> が登録しました
                </p>
                <p className="text-sm text-gray-500">2時間前</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <i className="ri-time-line text-red-600 text-sm"></i>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Off-White x Nike Air Force 1</span> のオークションが終了しました
                </p>
                <p className="text-sm text-gray-500">3時間前</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">新商品追加</h2>
                <button
                  onClick={() => setShowAddProductModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      商品名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productForm.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="例: Air Jordan 1 Retro High OG"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ブランド <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={productForm.brand}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="例: Nike"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品説明
                  </label>
                  <textarea
                    name="description"
                    value={productForm.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="商品の詳細説明を入力してください..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      開始価格 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={productForm.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="10000"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      サイズ
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={productForm.size}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="例: 27.5cm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      カテゴリ
                    </label>
                    <select
                      name="category"
                      value={productForm.category}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      <option value="sneakers">スニーカー</option>
                      <option value="limited">限定品</option>
                      <option value="vintage">ヴィンテージ</option>
                      <option value="collaboration">コラボレーション</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    商品画像
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">複数の画像を選択できます（推奨: 1200x1200px以上）</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ステータス
                  </label>
                  <select
                    name="status"
                    value={productForm.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="published">公開中</option>
                    <option value="draft">下書き</option>
                    <option value="sold">売却済み</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setShowAddProductModal(false)}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 whitespace-nowrap"
                  >
                    商品を追加
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Auction Modal */}
      {showCreateAuctionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-black p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    CREATE AUCTION
                  </h3>
                  <p className="text-white/90">オークション作成</p>
                </div>
                <button
                  onClick={() => setShowCreateAuctionModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-white text-2xl"></i>
                </button>
              </div>
            </div>

            <form onSubmit={handleAuctionSubmit} className="p-8">
              <div className="space-y-6">
                {/* Product Selection */}
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    商品選択 <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="productId"
                    value={auctionFormData.productId}
                    onChange={handleAuctionFormChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-sm pr-8"
                  >
                    <option value="">商品を選択してください</option>
                    {availableProducts.map(product => (
                      <option key={product.id} value={product.id}>
                        {product.brand} - {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">
                      開始価格 <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">¥</span>
                      <input
                        type="number"
                        name="startingPrice"
                        value={auctionFormData.startingPrice}
                        onChange={handleAuctionFormChange}
                        required
                        min="1000"
                        step="1000"
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-sm"
                        placeholder="50000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-900 font-bold mb-2">
                      最低入札額 <span className="text-red-600">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">¥</span>
                      <input
                        type="number"
                        name="minimumBid"
                        value={auctionFormData.minimumBid}
                        onChange={handleAuctionFormChange}
                        required
                        min="1000"
                        step="1000"
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-sm"
                        placeholder="5000"
                      />
                    </div>
                  </div>
                </div>

                {/* Buy Now Price */}
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    即決価格（オプション）
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">¥</span>
                    <input
                      type="number"
                      name="buyNowPrice"
                      value={auctionFormData.buyNowPrice}
                      onChange={handleAuctionFormChange}
                      min="1000"
                      step="1000"
                      className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-sm"
                      placeholder="200000"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    設定すると、この価格で即座に落札できます
                  </p>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-900 font-bold mb-2">
                      開始日時 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="startDate"
                      value={auctionFormData.startDate}
                      onChange={handleAuctionFormChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-900 font-bold mb-2">
                      終了日時 <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="endDate"
                      value={auctionFormData.endDate}
                      onChange={handleAuctionFormChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-gray-900 font-bold mb-2">
                    オークション説明
                  </label>
                  <textarea
                    name="description"
                    value={auctionFormData.description}
                    onChange={handleAuctionFormChange}
                    rows={4}
                    maxLength={500}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:outline-none transition-colors text-sm resize-none"
                    placeholder="オークションの詳細説明を入力してください..."
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    {auctionFormData.description.length}/500文字
                  </p>
                </div>

                {/* Terms */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <div className="flex items-start space-x-2">
                    <i className="ri-information-fill text-yellow-600 text-xl mt-0.5"></i>
                    <div className="text-sm text-yellow-800 leading-relaxed">
                      <p className="font-bold mb-2">オークション作成時の注意事項</p>
                      <ul className="space-y-1 list-disc list-inside">
                        <li>開始後のオークション設定変更はできません</li>
                        <li>終了日時は開始日時より後に設定してください</li>
                        <li>即決価格は開始価格より高く設定してください</li>
                        <li>商品の真贋鑑定が完了していることを確認してください</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-green-50 border-2 border-green-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-checkbox-circle-fill text-green-600 text-2xl"></i>
                    <p className="text-green-800 font-bold">
                      オークションが正常に作成されました！
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-center space-x-3">
                    <i className="ri-error-warning-fill text-red-600 text-2xl"></i>
                    <p className="text-red-800 font-bold">
                      オークションの作成に失敗しました。もう一度お試しください。
                    </p>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateAuctionModal(false)}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer"
                  >
                    キャンセル
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line mr-2 animate-spin"></i>
                        作成中...
                      </>
                    ) : (
                      <>
                        <i className="ri-auction-fill mr-2"></i>
                        オークション作成
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
