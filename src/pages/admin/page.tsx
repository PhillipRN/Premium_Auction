
import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats] = useState({
    totalProducts: 1247,
    activeAuctions: 89,
    totalUsers: 15623,
    totalRevenue: 2847500,
    todayBids: 234,
    pendingApprovals: 12
  });

  const [recentActivities] = useState([
    { id: 1, type: 'bid', user: '田中太郎', item: 'Air Jordan 1 Retro High', amount: 85000, time: '5分前' },
    { id: 2, type: 'sale', user: '佐藤花子', item: 'Nike Dunk Low', amount: 45000, time: '12分前' },
    { id: 3, type: 'registration', user: '山田次郎', item: 'ユーザー登録', amount: 0, time: '18分前' },
    { id: 4, type: 'bid', user: '鈴木一郎', item: 'Yeezy Boost 350', amount: 120000, time: '25分前' },
    { id: 5, type: 'approval', user: '管理者', item: 'Air Max 90 承認', amount: 0, time: '32分前' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">管理者ダッシュボード</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                サイトに戻る
              </Link>
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <i className="ri-user-line text-white text-sm"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <Link 
              to="/admin" 
              className="border-b-2 border-black text-black py-4 px-1 text-sm font-medium"
            >
              ダッシュボード
            </Link>
            <Link 
              to="/admin/products" 
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              商品管理
            </Link>
            <Link 
              to="/admin/auctions" 
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              オークション管理
            </Link>
            <Link 
              to="/admin/users" 
              className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 py-4 px-1 text-sm font-medium"
            >
              ユーザー管理
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <i className="ri-shopping-bag-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">総商品数</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalProducts.toLocaleString()}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <i className="ri-auction-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">進行中オークション</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.activeAuctions}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <i className="ri-user-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">総ユーザー数</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.totalUsers.toLocaleString()}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <i className="ri-money-yen-circle-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">総売上高</dt>
                    <dd className="text-lg font-medium text-gray-900">¥{stats.totalRevenue.toLocaleString()}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <i className="ri-hand-heart-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">今日の入札数</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.todayBids}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                    <i className="ri-time-line text-white text-sm"></i>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">承認待ち</dt>
                    <dd className="text-lg font-medium text-gray-900">{stats.pendingApprovals}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">クイックアクション</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 whitespace-nowrap">
                <i className="ri-add-line mr-2"></i>
                新商品追加
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
                <i className="ri-auction-line mr-2"></i>
                オークション作成
              </button>
              <Link 
                to="/admin/users"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap"
              >
                <i className="ri-user-settings-line mr-2"></i>
                ユーザー管理
              </Link>
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
                <i className="ri-bar-chart-line mr-2"></i>
                レポート表示
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">最近のアクティビティ</h3>
            <div className="flow-root">
              <ul className="-mb-8">
                {recentActivities.map((activity, index) => (
                  <li key={activity.id}>
                    <div className="relative pb-8">
                      {index !== recentActivities.length - 1 && (
                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" />
                      )}
                      <div className="relative flex space-x-3">
                        <div>
                          <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                            activity.type === 'bid' ? 'bg-green-500' :
                            activity.type === 'sale' ? 'bg-blue-500' :
                            activity.type === 'registration' ? 'bg-purple-500' :
                            'bg-gray-500'
                          }`}>
                            <i className={`text-white text-sm ${
                              activity.type === 'bid' ? 'ri-hand-heart-line' :
                              activity.type === 'sale' ? 'ri-money-yen-circle-line' :
                              activity.type === 'registration' ? 'ri-user-add-line' :
                              'ri-check-line'
                            }`}></i>
                          </span>
                        </div>
                        <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              <span className="font-medium text-gray-900">{activity.user}</span>
                              {activity.type === 'bid' && ` が ${activity.item} に入札しました`}
                              {activity.type === 'sale' && ` が ${activity.item} を落札しました`}
                              {activity.type === 'registration' && ` が新規登録しました`}
                              {activity.type === 'approval' && ` が ${activity.item} しました`}
                              {activity.amount > 0 && (
                                <span className="font-medium text-gray-900"> (¥{activity.amount.toLocaleString()})</span>
                              )}
                            </p>
                          </div>
                          <div className="text-right text-sm whitespace-nowrap text-gray-500">
                            {activity.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
