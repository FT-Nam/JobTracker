import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchJobs } from '../../store/jobsSlice';
import { fetchNotifications } from '../../store/notificationsSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loading } from '../../components/common/Loading';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { jobs, isLoading: jobsLoading } = useSelector((state) => state.jobs);
  const { notifications } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchJobs({ limit: 5 }));
    dispatch(fetchNotifications({ limit: 5 }));
  }, [dispatch]);

  const recentJobs = jobs.slice(0, 5);
  const recentNotifications = notifications.slice(0, 5);

  const stats = {
    totalJobs: jobs.length,
    applied: jobs.filter(job => job.status?.name === 'APPLIED').length,
    interviews: jobs.filter(job => job.status?.name === 'INTERVIEW').length,
    offers: jobs.filter(job => job.status?.name === 'OFFER').length,
  };

  if (jobsLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-primary-foreground/80 mt-1">
          Here's what's happening with your job applications today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalJobs}</div>
            <p className="text-xs text-muted-foreground">
              All time applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applied</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.applied}</div>
            <p className="text-xs text-muted-foreground">
              Applications submitted
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interviews</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.interviews}</div>
            <p className="text-xs text-muted-foreground">
              Interview scheduled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offers</CardTitle>
            <div className="h-4 w-4 text-muted-foreground">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.offers}</div>
            <p className="text-xs text-muted-foreground">
              Job offers received
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Job Applications</CardTitle>
            <CardDescription>
              Your latest job applications and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentJobs.length > 0 ? (
                recentJobs.map((job) => (
                  <div key={job.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.company?.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        job.status?.name === 'APPLIED' ? 'bg-blue-100 text-blue-800' :
                        job.status?.name === 'INTERVIEW' ? 'bg-yellow-100 text-yellow-800' :
                        job.status?.name === 'OFFER' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status?.displayName || job.status?.name}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No job applications yet</p>
                  <Button asChild className="mt-2">
                    <Link to="/jobs/create">Add your first job</Link>
                  </Button>
                </div>
              )}
            </div>
            {recentJobs.length > 0 && (
              <div className="mt-4">
                <Button variant="outline" asChild className="w-full">
                  <Link to="/jobs">View all jobs</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              Latest updates and reminders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNotifications.length > 0 ? (
                recentNotifications.map((notification) => (
                  <div key={notification.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      notification.isRead ? 'bg-gray-300' : 'bg-primary'
                    }`} />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No notifications yet</p>
                </div>
              )}
            </div>
            {recentNotifications.length > 0 && (
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View all notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks to help you manage your job search
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-20 flex-col">
              <Link to="/jobs/create">
                <svg className="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Job
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-20 flex-col">
              <Link to="/resumes">
                <svg className="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Manage Resumes
              </Link>
            </Button>
            
            <Button variant="outline" asChild className="h-20 flex-col">
              <Link to="/interviews">
                <svg className="h-6 w-6 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                View Interviews
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
