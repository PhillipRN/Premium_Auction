
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'vip' | 'admin';
  status: 'active' | 'suspended';
  joinDate: string;
  totalBids: number;
  wonAuctions: number;
  totalSpent: number;
  avatar: string;
}

const AdminUsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // モックデータ
  const users: User[] = [
    {
      id: 1,
      name: '田中太郎',
      email: 'tanaka@example.com',
      role: 'vip',
      status: 'active',
      joinDate: '2024-01-15',
      totalBids: 45,
      wonAuctions: 12,
      totalSpent: 850000,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20businessman%20portrait%2C%20clean%20background%2C%20business%20attire%2C%20confident%20expression%2C%20high%20quality%20headshot%20photography%2C%20studio%20lighting&width=100&height=100&seq=user1&orientation=squarish'
    },
    {
      id: 2,
      name: '佐藤花子',
      email: 'sato@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-02-20',
      totalBids: 23,
      wonAuctions: 5,
      totalSpent: 320000,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20businesswoman%20portrait%2C%20clean%20background%2C%20business%20attire%2C%20friendly%20smile%2C%20high%20quality%20headshot%20photography%2C%20studio%20lighting&width=100&height=100&seq=user2&orientation=squarish'
    },
    {
      id: 3,
      name: '鈴木一郎',
      email: 'suzuki@example.com',
      role: 'admin',
      status: 'active',
      joinDate: '2023-12-01',
      totalBids: 78,
      wonAuctions: 25,
      totalSpent: 1200000,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20executive%20portrait%2C%20clean%20background%2C%20formal%20business%20suit%2C%20authoritative%20presence%2C%20high%20quality%20headshot%20photography%2C%20studio%20lighting&width=100&height=100&seq=user3&orientation=squarish'
    },
    {
      id: 4,
      name: '高橋美咲',
      email: 'takahashi@example.com',
      role: 'vip',
      status: 'active',
      joinDate: '2024-01-30',
      totalBids: 67,
      wonAuctions: 18,
      totalSpent: 950000,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20woman%20portrait%2C%20clean%20background%2C%20elegant%20business%20attire%2C%20sophisticated%20look%2C%20high%20quality%20headshot%20photography%2C%20studio%20lighting&width=100&height=100&seq=user4&orientation=squarish'
    },
    {
      id: 5,
      name: '山田健太',
      email: 'yamada@example.com',
      role: 'user',
      status: 'suspended',
      joinDate: '2024-03-10',
      totalBids: 12,
      wonAuctions: 2,
      totalSpent: 150000,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20young%20man%20portrait%2C%20clean%20background%2C%20casual%20business%20attire%2C%20neutral%20expression%2C%20high%20quality%20headshot%20photography%2C%20studio%20lighting&width=100&height=100&seq=user5&orientation=squarish'
    },
    {
      id: 6,
      name: '中村由美',
      email: 'nakamura@example.com',
      role: 'user',
      status: 'active',
      joinDate: '2024-02-05',
      totalBids: 34,
      wonAuctions: 8,
      totalSpent: 480000,
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Japanese%20woman%20portrait%2C%20clean%20background%2C%20modern%20business%20attire%2C%20warm%20smile%2C%20high%20quality%20headshot%20photography%2C%20studio%20lighting&width=100&height=100&seq=user6&orientation=squarish'
    }
  ];

  // フィルタリングとソート
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'joinDate':
          return new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime();
        case 'totalBids':
          return b.totalBids - a.totalBids;
        case 'totalSpent':
          return b.totalSpent - a.totalSpent;
        default:
          return 0;
      }
    });

  // 統計計算
  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    vip: users.filter(u => u.role === 'vip').length,
    suspended: users.filter(u => u.status === 'suspended').length
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'vip': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <div className="bg-black text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/admin" className="text-white hover:text-gray-300">
              <i className="ri-arrow-left-line text-xl"></i>
            </Link>
            <h1 className="text-xl font-bold">ユーザー管理</h1>
          </div>
          <Link to="/" className="text-white hover:text-gray-300 text-sm">
            サイトに戻る
          </Link>
        </div>
      </div>

      <div className="p-6">
        {/* 統計カード */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-black">{stats.total}</div>
            <div className="text-sm text-gray-600">総ユーザー数</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600">アクティブ</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-600">{stats.vip}</div>
            <div className="text-sm text-gray-600">VIPユーザー</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="text-2xl font-bold text-red-600">{stats.suspended}</div>
            <div className="text-sm text-gray-600">停止中</div>
          </div>
        </div>

        {/* 検索・フィルター */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <input
                type="text"
                placeholder="名前・メールで検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">すべての役割</option>
                <option value="user">一般ユーザー</option>
                <option value="vip">VIPユーザー</option>
                <option value="admin">管理者</option>
              </select>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="all">すべてのステータス</option>
                <option value="active">アクティブ</option>
                <option value="suspended">停止中</option>
              </select>
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="name">名前順</option>
                <option value="joinDate">登録日順</option>
                <option value="totalBids">入札数順</option>
                <option value="totalSpent">支出額順</option>
              </select>
            </div>
          </div>
        </div>

        {/* ユーザー一覧 */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ユーザー
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    役割
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ステータス
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    入札数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    落札数
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    総支出額
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(user.role)}`}>
                        {user.role === 'admin' ? '管理者' : user.role === 'vip' ? 'VIP' : '一般'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? 'アクティブ' : '停止中'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.totalBids}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.wonAuctions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ¥{user.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-black hover:text-gray-700 mr-3"
                      >
                        詳細
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ユーザー詳細モーダル */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">ユーザー詳細</h3>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-lg">{selectedUser.name}</h4>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500">役割</label>
                  <p className="font-medium">
                    {selectedUser.role === 'admin' ? '管理者' : selectedUser.role === 'vip' ? 'VIP' : '一般'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">ステータス</label>
                  <p className="font-medium">
                    {selectedUser.status === 'active' ? 'アクティブ' : '停止中'}
                  </p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">登録日</label>
                  <p className="font-medium">{selectedUser.joinDate}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">入札数</label>
                  <p className="font-medium">{selectedUser.totalBids}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">落札数</label>
                  <p className="font-medium">{selectedUser.wonAuctions}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">総支出額</label>
                  <p className="font-medium">¥{selectedUser.totalSpent.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-4">
                <button className="flex-1 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
                  メール送信
                </button>
                {selectedUser.role === 'user' && (
                  <button className="flex-1 bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">
                    VIPアップグレード
                  </button>
                )}
                <button className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600">
                  {selectedUser.status === 'active' ? 'アカウント停止' : 'アカウント復活'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;
