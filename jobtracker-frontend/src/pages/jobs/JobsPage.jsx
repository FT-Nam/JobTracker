import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchJobs } from '../../store/jobsSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Loading } from '../../components/common/Loading';

const JobsPage = () => {
  const dispatch = useDispatch();
  const { jobs, isLoading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Applications</h1>
          <p className="text-gray-600">Manage and track your job applications</p>
        </div>
        <Button asChild>
          <Link to="/jobs/create">Add New Job</Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input placeholder="Search jobs..." />
            <select className="input">
              <option value="">All Status</option>
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
            </select>
            <select className="input">
              <option value="">All Companies</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Jobs List */}
      <div className="grid grid-cols-1 gap-4">
        {jobs.length > 0 ? (
          jobs.map((job) => (
            <Card key={job.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.company?.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Applied: {new Date(job.applicationDate).toLocaleDateString()}
                    </p>
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
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/jobs/${job.id}`}>View</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-4">Start by adding your first job application</p>
              <Button asChild>
                <Link to="/jobs/create">Add New Job</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
