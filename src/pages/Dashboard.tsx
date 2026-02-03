import { Car, Users, TrendingUp, Settings } from 'lucide-react';
import Button from '../components/common/Button';

const Dashboard = () => {
  const stats = [
    { label: 'Total Vehicles', value: '1,248', icon: Car, change: '+12%' },
    { label: 'Active Users', value: '543', icon: Users, change: '+8%' },
    { label: 'Revenue', value: '€245K', icon: TrendingUp, change: '+23%' },
    { label: 'Service Tasks', value: '89', icon: Settings, change: '-3%' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Renault Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your fleet today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <span className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
          <Button variant="primary">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-center">
            <Car className="w-5 h-5 mr-2" />
            Add New Vehicle
          </Button>
          <Button variant="outline" className="justify-center">
            <Users className="w-5 h-5 mr-2" />
            Manage Users
          </Button>
          <Button variant="outline" className="justify-center">
            <Settings className="w-5 h-5 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'Vehicle #REN-245 serviced', time: '2 hours ago', user: 'Service Team' },
            { action: 'New user registered', time: '4 hours ago', user: 'John Doe' },
            { action: 'Monthly report generated', time: '1 day ago', user: 'System' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">by {activity.user}</p>
              </div>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
