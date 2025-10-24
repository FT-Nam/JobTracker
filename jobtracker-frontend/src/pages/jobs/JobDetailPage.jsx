import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobById } from '../../store/jobsSlice';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loading } from '../../components/common/Loading';

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentJob, isLoading } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (id) {
      dispatch(fetchJobById(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!currentJob) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Job not found</h2>
        <Button onClick={() => navigate('/jobs')}>Back to Jobs</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{currentJob.title}</h1>
          <p className="text-gray-600">{currentJob.company?.name}</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">Edit</Button>
          <Button variant="outline" onClick={() => navigate('/jobs')}>
            Back to Jobs
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {currentJob.jobDescription || 'No description available'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {currentJob.requirements || 'No requirements specified'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {currentJob.benefits || 'No benefits specified'}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Status</label>
                <p className="text-sm text-gray-900">
                  {currentJob.status?.displayName || currentJob.status?.name}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Application Date</label>
                <p className="text-sm text-gray-900">
                  {new Date(currentJob.applicationDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Deadline</label>
                <p className="text-sm text-gray-900">
                  {currentJob.deadlineDate ? new Date(currentJob.deadlineDate).toLocaleDateString() : 'No deadline'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Location</label>
                <p className="text-sm text-gray-900">{currentJob.location || 'Not specified'}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Remote</label>
                <p className="text-sm text-gray-900">{currentJob.isRemote ? 'Yes' : 'No'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">
                {currentJob.notes || 'No notes added'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default JobDetailPage;
